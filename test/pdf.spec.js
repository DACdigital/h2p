const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();


describe('Pdf endpoint tests', () => {

    var server;

    beforeEach(async () => {
        server = await require('../app');
    });

    afterEach(async () => {
        delete await require.cache[require.resolve('../app')];
    })

    it('responds to /print with 200 and generated pdf', async () => {
        const res = await chai.request(server)
            .post('/print')
            .set('content-type', 'application/json')
            .send({
                "title": "Dummy title",
                "html": "<html><body><h1>My first Heading</h1><p>My first paragraph.</p></body></html>"
            });

        res.should.have.status(200);
        res.should.have.header('content-type', 'application/pdf');
        res.should.have.header('Content-Disposition', `attachment; filename="Dummy title.pdf"`);
    });

    it('responds to /print with 400 when html is not provided', async () => {
        const res = await chai.request(server)
            .post('/print')
            .set('content-type', 'application/json')
            .send({
                "title": "Dummy title"
            });

        res.should.have.status(400);
    });

    it('responds to /print with 200 and static file name when title is not provided', async () => {
        const res = await chai.request(server)
            .post('/print')
            .set('content-type', 'application/json')
            .send({
                "html": "<html><body><h1>My first Heading</h1><p>My first paragraph.</p></body></html>"
            });

        res.should.have.status(200);
        res.should.have.header('content-type', 'application/pdf');
        res.should.have.header('Content-Disposition', `attachment; filename="generatedFile.pdf"`);
    });

    it('responds to /print with 400 when no body is sent', async () => {
        const res = await chai.request(server)
            .post('/print')
            .set('content-type', 'application/json')
            .send()

        res.should.have.status(400);
    });

    it('responds to /print with 200 when print options are passed', async () => {
        const res = await chai.request(server)
            .post('/print')
            .set('content-type', 'application/json')
            .send({
                html: "<html><body><h1>My first Heading</h1><p>My first paragraph.</p></body></html>",
                options: {
                    margin:
                        {
                            top: "35px",
                            right: "35px",
                            left: "35px"
                        }
                }
            });

        res.should.have.status(200);
    });
});