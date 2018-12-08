const md5 = require('md5');

const userModel = require('../models/users');
const trackModel = require('../models/track');

const authUser = (req, res) => {
    let data = req.query;
    userModel.findOne({ "username": data.user }, (err, doc) => {
        if (err) {
            res.status(404).send(`SYSTEM_ERROR`);
        }
        else {
            if (!doc) {
                res.status(404).send(`UNKNOWN_USER ${data.user}`);
            }
            else {
                // Tracking Data for reference Inputs, remove after done.
                
                // let trackData = new trackModel({
                //     query: data.query,
                //     method: data.method,
                //     user: data.user,
                //     salt: data.salt,
                //     hash: data.hash
                // });
                // trackData.save((err) => {
                //     if (err) {
                //         res.status(404).send(`SYSTEM_ERROR`);
                //     }
                // });

                // Tracking data end.
                
                // Password Check Code to be added here.
                let password = md5(doc.password);
                res.send(password);
                // res.status(200).send(`PASSWORD_OK ${data.user}@${authority} \nFOO baz`);
            }
        }
    });
}

module.exports = authUser;