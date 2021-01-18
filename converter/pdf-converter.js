const saveToPdf = async (page, html) => {
    await page.setContent(html);

    const pdf = await page.pdf({
        format: 'A4',
        margin: {
            top: '35px',
            right: '35px',
            left: '35px'
        }
    });

    return pdf;
};

module.exports = saveToPdf;
