const mongoose = require('mongoose');
const schema = mongoose.Schema;

const user = new schema({
    id: String,
    password: String
});

module.exports = mongoose.model('User', user);