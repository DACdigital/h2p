const PDFMerger = require('pdf-merger-js');

async function saveToPdf(page, html, options) {
    await page.setContent(html);

    printOpts = {
        format: 'A4',
        ...options
    }

    return await page.pdf(printOpts);
}

async function saveMultipleToPdf(page, documents, options) {
    const merger = new PDFMerger();
    for (const document of documents) {
        const generated = await saveToPdf(page, document, options);
        await merger.add(generated);
    }
    return await merger.saveAsBuffer();
}

module.exports.saveToPdf = saveToPdf;
module.exports.saveMultipleToPdf = saveMultipleToPdf;
