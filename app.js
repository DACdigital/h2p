const express = require('express');
const morgan = require('morgan');
const {Cluster} = require('puppeteer-cluster');
const bodyParser = require('body-parser');
const healthController = require('./routes/health');
const pdfGeneratorController = require('./routes/pdf')

const convertToPdf = require('./converter/pdf-converter');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

async function launch() {
    const puppeteerConfig = {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    };

    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_BROWSER,
        maxConcurrency: 4,
        puppeteerOptions: puppeteerConfig
    });

    // Setup the function to be executed for each request while cluster.execute is called
    await cluster.task(async ({page, data: taskData}) => {
        await page.setDefaultNavigationTimeout(0);
        return await convertToPdf(page, taskData.html, taskData.options);
    });

    app.use(healthController);
    app.use(pdfGeneratorController(cluster));

    return await new Promise((resolve) => {
        const server = app.listen(port, () => resolve(server));
    }).then((server) => {
        console.log(`PDF converter app listening on port ${port}!`);
        return server;
    });
}

module.exports = launch();