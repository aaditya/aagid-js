const mongoose = require('mongoose');
const schema = mongoose.Schema;

const track = new schema({
    user: String,
    supplied_salt: String,
    supplied_hash: String,
    expected_hash: String
});

module.exports = mongoose.model('Track', track);