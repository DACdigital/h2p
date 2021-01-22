const saveToPdf = async (page, html, options) => {
    await page.setContent(html);

    printOpts = {
        format: 'A4',
        ...options
    }
    
    const pdf = await page.pdf(printOpts);

    return pdf;
};

module.exports = saveToPdf;
