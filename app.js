const express = require('express');
const app = express();

const port = process.env.PORT || process.argv[2] || 3000;

// Manual Users for now.

const users = [];
users['me'] = 'test';

// Global Variables

global.authority;

// Header Setup for Content Type

app.use((req, res, next) => {
    res.header({ 'Content-Type': 'text/plain' });
    next();
});

// Functions for Setting up

const getPrefix = () => {
    return "%u:aaauth:";
}

const getSuffix = () => {
    return authority;
}

const getMethods = () => {
    return {
        code: 200,
        value: 'METHODS md5, bmd5'
    }
}

const getParams = (data) => {
    if (data.method == 'md5') {
        return {
            code: 200,
            value: `PREFIX  ${getPrefix()}\nSUFFIX :${getSuffix()}`
        }
    }
    else if (data.method == 'bmd5') {
        return {
            code: 200,
            value: ''
        }
    }
    else {
        return {
            code: 404,
            value: 'UNKNOWN_METHOD'
        }
    }
}

const authUser = (data) => {
    if (!users[data.user]) {
        return {
            code: 404,
            value: `UNKNOWN_USER ${data.user}`
        }
    }
    else {
        // Add Password Checks here.
        return {
            code: 200,
            value: `PASSWORD_OK ${data.user}@${authority} \nFOO baz`
        }
    }
}

// Functions End

app.get('/armaauth/0.1', (req, res) => {
    let keys = [];
    authority = req.headers.host;
    let getAction = {
        "methods": getMethods,
        "params": getParams,
        "check": authUser
    };
    for (key in getAction)
        keys.push(key);

    if (keys.indexOf(req.query.query) != -1) {
        let exec = getAction[req.query.query](req.query);
        res.status(exec.code).send(exec.value);
    }
    else {
        res.status(404).send('UNKNOWN_QUERY');
    }
});

app.listen(port, () => {
    console.log('Server running on port ' + port + '.');
});

module.exports = app;