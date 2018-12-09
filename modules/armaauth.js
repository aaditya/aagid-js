const md5 = require('md5');

const userModel = require('../models/users');

const auth = (req, res) => {
    authority = req.headers.host;

    const getPrefix = () => ("%u:aaauth:");
    const getSuffix = () => (":" + authority);

    const getMethods = () => {
        res.send('METHODS md5, bmd5');
    }

    const getParams = () => {
        if (req.query.method == 'md5') {
            res.send(`PREFIX ${getPrefix()}\nSUFFIX ${getSuffix()}`);
        }
        else if (req.query.method == 'bmd5') {
            res.send('');
        }
        else {
            res.status(404).send(`UNKNOWN_METHOD`);
        }
    }

    const execDef = () => {
        res.status(404).send(`UNKNOWN_QUERY`);
    }

    const authUser = () => {
        userModel.findOne({ "username": req.query.user }, (err, doc) => {
            if (err) {
                res.status(404).send(`SYSTEM_ERROR`);
            }
            else {
                if (!doc) {
                    res.status(404).send(`UNKNOWN_USER ${req.query.user}`);
                }
                else {
                    let password = getPrefix().replace("%u", req.query.user) + doc.password + getSuffix();
                    let passHash = md5(password);

                    let hexSalt = new Buffer(req.query.salt || "", "hex");
                    let hexHash = new Buffer(passHash || "", "hex");

                    let hexArr = Buffer.concat([hexHash, hexSalt]);

                    let finalPass = md5(hexArr);

                    if (finalPass.localeCompare(req.query.hash) == 0) {
                        res.status(200).send(`PASSWORD_OK ${req.query.user}@${authority}\nFOO baz`);
                    }
                    else {
                        res.status(401).send('PASSWORD_FAIL');
                    }
                }
            }
        });
    }

    let getAction = {
        "methods": getMethods,
        "params": getParams,
        "check": authUser,
        "default": execDef
    };
    getAction[req.query.query || 'default']();
}

module.exports = auth;