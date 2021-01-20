const saveToPdf = async (page, html, options) => {
    await page.setContent(html);

    /*
     For the options to pdf function please look at the docs
     https://devdocs.io/puppeteer/index#pagepdfoptions
    */
    printOpts = {
        format: 'A4',
        ...options
    }
    
    const pdf = await page.pdf(printOpts);

    return pdf;
};

module.exports = saveToPdf;
