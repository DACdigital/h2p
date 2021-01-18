const express = require('express');
const morgan = require('morgan');
const {Cluster} = require('puppeteer-cluster');
const bodyParser = require('body-parser');
const cors = require('cors');
const healthController = require('./routes/health');
const pdfGeneratorController = require('./routes/pdf')

const convertToPdf = require('./converter/pdf-converter');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

async function launch() {
    const puppeteerConfig = {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ]
    };

    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_BROWSER,
        maxConcurrency: 4,
        puppeteerOptions: puppeteerConfig
    });

    // Setup the function to be executed for each request while cluster.execute is called
    await cluster.task(async ({page, data: htmlToGenerate}) => {
        return await convertToPdf(page, htmlToGenerate);
    });

    app.use(healthController);
    app.use(pdfGeneratorController(cluster));

    return app.listen(port, () => console.log(`PDF converter app listening on port ${port}!`));
}

const server = launch();

module.exports = server;