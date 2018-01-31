const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ofs_test')
const tezaDb = mongoose.connection;

const collectionExists = queryName => {
	tezaDb.db.listCollections({
			name: queryName
		})
		.next((err, collInfo) => {
			if (collInfo) return true;
			if (err) throw new Error({ collectionExists: err });
			else return false;
		})
};

module.exports = collectionExists;