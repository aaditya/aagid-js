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
                user: d.user,
                supplied_salt: d.supplied_salt,
                supplied_hash: d.supplied_hash,
                expected_hash: d.expected_hash
            }));
            res.render('track', { data: filtered });
        }
    });
}

module.exports = tracks;