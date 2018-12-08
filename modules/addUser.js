const userModel = require('../models/users');

const addUser = (req, res) => {
    if (req.body.username && req.body.password) {
        let newUser = new userModel({
            username: req.body.username,
            password: req.body.password
        });
        newUser.save((err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                })
            }
            else {
                res.json({
                    success: true,
                    msg: 'User Added.'
                })
            }
        });
    }
    else {
        res.json({
            success: false,
            msg: 'Please check the inputs.'
        })
    }
}

module.exports = addUser;