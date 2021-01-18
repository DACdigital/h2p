const express = require('express')
const router = express.Router()

module.exports = function(cluster) {

    router.post('/print', async (req, res, next) => {
        try {
            if (typeof req.body.html !== 'string' || typeof req.body.title !== 'string') {
                res.status(400)
                    .send('Invalid Argument: HTML expected as type of string and received a value of a different type.' +
                        'Check your request body and request headers.');
                return;
            }

            const generatedPdf = await cluster.execute(req.body.html);

            res.status(200)
                .set({
                    'content-type': 'application/pdf; charset=utf-8',
                    'Content-Disposition': `attachment; filename="${req.body.title}"`
                })
                .send(generatedPdf)
        } catch (err) {
            next(err);
        }
    });

    return router;
};
