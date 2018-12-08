const md5 = require('md5');

const userModel = require('../models/users');
const trackModel = require('../models/track');

const authUser = (req, res) => {
    let data = req.query;

    const getPrefix = () => ("%u:aaauth:");
    const getSuffix = () => (":"+authority);

    userModel.findOne({ "username": data.user }, (err, doc) => {
        if (err) {
            res.status(404).send(`SYSTEM_ERROR`);
        }
        else {
            if (!doc) {
                res.status(404).send(`UNKNOWN_USER ${data.user}`);
            }
            else {
                // Password Check Code to be added here.
                let password = getPrefix().replace("%u", data.user) + doc.password + getSuffix();
                let passHash = md5(password);
                
                let hexSalt = new Buffer(data.salt, "hex");
                let hexHash = new Buffer(passHash, "hex");

                let hexArr = Buffer.concat([hexHash, hexSalt]);

                let finalPass = md5(hexArr);

                if (data.hash == finalPass) {
                    res.status(200).send(`PASSWORD_OK ${data.user}@${authority} \nFOO baz`);
                }
                else {
                    res.status(401).send('PASSWORD_FAIL');
                }
            }
        }
    });
}

module.exports = authUser;