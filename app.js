const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// Header Setup for Content Type

app.use((req, res, next) => {
    res.header({ 'Content-Type': 'text/plain' });
    next();
});

// Functions for Setting up

const getMethods = () => {
    return {
        code: 200,
        value: 'METHODS md5, bmd5'
    }
}

const getParams = (data) => {
    if (data.query.method == 'md5') {
        return {
            code: 200,
            value: `PREFIX %u:aaauth: \nSUFFIX :${data.headers.host}`
        }
    }
    else if (data.query.method == 'bmd5') {
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
    console.log(data);
}

// Functions End

app.get('/armaauth/0.1', (req, res) => {
    let keys = [];
    let getAction = {
        "methods": getMethods,
        "params": getParams,
        "check": authUser
    };
    for (key in getAction)
        keys.push(key);

    if (keys.indexOf(req.query.query) != -1) {
        let exec = getAction[req.query.query](req);
        res.status(exec.code).send(exec.value);
    }
    else {
        res.status(404).send('UNKNOWN_QUERY');
    }
});

app.listen(port);

module.exports = app;