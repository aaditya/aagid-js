const trackModel = require('../models/track.js');

const tracks = (req, res) => {
    res.header({ 'Content-Type': 'text/html' });
    trackModel.find().exec((err, doc) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            })
        }
        else {
            let filtered = doc.map((d) => ({
                query: d.query,
                method: d.method,
                user: d.user,
                salt: d.salt,
                hash: d.hash
            }));
            res.render('track', { data: filtered });
        }
    });
}

module.exports = tracks;