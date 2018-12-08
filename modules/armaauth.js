const authUser = require('./authUser');

const auth = (req, res) => {
    authority = req.headers.host;

    let data = req.query;

    const getPrefix = () => ("%u:aaauth:");
    const getSuffix = () => (":"+authority);

    const getMethods = () => {
        res.send('METHODS md5, bmd5');
    }

    const getParams = () => {
        if (data.method == 'md5') {
            res.send(`PREFIX  ${getPrefix()}\nSUFFIX :${getSuffix()}`);
        }
        else if (data.method == 'bmd5') {
            res.send('');
        }
        else {
            res.status(404).send(`UNKNOWN_METHOD`);
        }
    }

    const execDef = () => {
        res.status(404).send(`UNKNOWN_QUERY`);
    }

    let getAction = {
        "methods": getMethods,
        "params": getParams,
        "check": authUser,
        "default": execDef
    };
    getAction[req.query.query || 'default'](req, res);
}

module.exports = auth;