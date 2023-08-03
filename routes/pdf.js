const express = require('express');
const router = express.Router();
const pdfConverter = require('../converter/pdf-converter');

module.exports = (cluster) => {

    router.post('/print', async (req, res, next) => {
        try {
            if (!isString(req.body.html)) {
                res.status(400)
                    .send('Invalid Argument: HTML expected as type of string and received a value of a different type.' +
                        'Check your request body and request headers.');
                return;
            }

            const generatedPdf = await cluster.execute({ callback: pdfConverter.saveToPdf, html: req.body.html, options: req.body.options});
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

    router.post('/print-batch', async (req, res, next) => {
        try {
            if (!validArrayOfStrings(req.body.html)) {
                res.status(400)
                    .send('Invalid Argument: HTML expected as type of array of strings and received a value of a different type.' +
                        'Check your request body and request headers.');
                return;
            }

            const generatedPdf = await cluster.execute({ callback: pdfConverter.saveMultipleToPdf, html: req.body.html, options: req.body.options});
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

function validArrayOfStrings(html) {
    return Array.isArray(html) && html.length !== 0 && html.every( function(document) { return isString(document) } );
}

function isString(object) {
    return typeof object === 'string';
}
