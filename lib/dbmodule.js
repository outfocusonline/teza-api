// Global!
const models = global.models;

// Modules
const Fuse = require('@codefeathers/fuse');

// Utils
const λ = require('../utils');

// Config
const config = require('../config');

/**
 * Lowlevel mongoose abstraction, abstracted over by `db`.
 * If query object should be skipped, it should be `null`.
 * Same for update object if you want to define condition to enforce.
 * 
 * @param {String} collection 
 * @param {String} action 
 * @param {Array[(Object|Boolean)]} params
 * 
 * @param {(Object|null)} params[0] query object
 * @param {(Object|null)} params[1] update object
 * @param {Boolean} params[2] enforce condition
 */
const _db = (collection, action, ...params) => {

	const queryEnforce = {
		deleted: { $ne: true }
	};

	const enforceCondition = params[2]
		? Object.assign(queryEnforce, params[2])
		: queryEnforce;

	// Enforce query conditions
	const enforcedQuery = new Fuse(params[0])
		.on(λ.doesExist, x => ({ ...x, ...enforceCondition }))
		.on(λ.justTrue, λ.justObject)
		.resolve();

	const updateObject = new Fuse(params[1])
		.on(Array.isArray, x => x.map(y => ({ ...y, deleted: false })))
		.on(λ.justTrue, λ.identity)
		.resolve();

	// Filter only what's not `null`
	const enforcedParams = [
		enforcedQuery,
		updateObject
	].filter(Boolean);

	if(action === 'create' || action === 'insertMany') {
		return (
			models
			[collection]
			[action]
				(...enforcedParams)
		);
	} else {
		return (
			models
			[collection]
			[action]
				(...enforcedParams)
				.exec()
		);
	}

}

const db = {
	find(collection, query, one) {
		if (one) return _db(collection, 'findOne', query);
		return _db(collection, 'find', query);
	},
	insert(collection, items, one) {
		if (one || !(Array.isArray(items))) {
			return _db(collection, 'create', null, items)
		};
		return _db(collection, 'insertMany', null, items);
	},
	update(collection, query, obj, one) {
		if (one) return _db(collection, 'findOneAndUpdate', query, { $set: obj });
		return _db(collection, 'update', query, { $set: obj });
	},
	delete(collection, query, one) {
		const update = { deleted: true, deletedAt: new Date() };
		if (one) return _db(collection, 'findOneAndUpdate', query, update);
		return _db(collection, 'updateMany', query, update);
	},
	restore(collection, query, one) {
		const enforce = { deleted: true };
		const update = { $set: { deleted: false, deletedAt: null } };
		if (one) {
			return _db(collection, 'findOneAndUpdate', query, update, enforce);
		}
		return _db(collection, 'updateMany', query, update, enforce);
	},

	// Exposing internals, just in case
	lowlevel: _db
};

module.exports = db;
