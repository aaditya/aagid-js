const mongoose = require('mongoose');
const schema = mongoose.Schema;

const track = new schema({
    query: String,
    method: String,
    user: String,
    salt: String,
    hash: String
});

module.exports = mongoose.model('Track', track);