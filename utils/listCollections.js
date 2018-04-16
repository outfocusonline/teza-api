const db = require('../lib/dbmodule');

module.exports = name => {
	db.find(name, {});
};
