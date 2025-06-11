const express = require('express');
const morgan = require('morgan');
const {Cluster} = require('puppeteer-cluster');
const bodyParser = require('body-parser');
const healthController = require('./routes/health');
const pdfGeneratorController = require('./routes/pdf')

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '50mb'}));

async function launch() {
    const puppeteerConfig = {
        headless: "new",
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu' 
        ]
    };

    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_BROWSER,
        maxConcurrency: 4,
        puppeteerOptions: puppeteerConfig
    });
    await cluster.task(async ({page, data: taskData}) => {
        await page.setDefaultNavigationTimeout(0);
        return await taskData.callback(page, taskData.html, taskData.options);
    });

    app.use(healthController);
    app.use(pdfGeneratorController(cluster));

    const server = app.listen(port);
    console.log(`PDF converter app listening on port ${port}!`);
    return server;
}

module.exports = launch();
