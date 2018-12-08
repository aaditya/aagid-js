const mongoose = require('mongoose');
const schema = mongoose.Schema;

const user = new schema({
    username: String,
    password: String
});

module.exports = mongoose.model('User', user);