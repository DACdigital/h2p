const express = require('express');
const router = express.Router();

module.exports = (cluster) => {

    router.post('/print', async (req, res, next) => {
        try {
            if (typeof req.body.html !== 'string') {
                res.status(400)
                    .send('Invalid Argument: HTML expected as type of string and received a value of a different type.' +
                        'Check your request body and request headers.');
                return;
            }

            const generatedPdf = await cluster.execute({html: req.body.html, options: req.body.options});
            const fileName = req.body.title ? req.body.title : 'generatedFile';

            res.status(200)
                .set({
                    'content-type': 'application/pdf',
                    'Content-Disposition': `attachment; filename="${fileName}.pdf"`
                })
                .send(generatedPdf);
        } catch (err) {
            next(err);
        }
    });

    return router;
};
