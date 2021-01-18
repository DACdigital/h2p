const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe('loading express', function () {

    var server;

    beforeEach(async function () {
        server = await require('../app');
    });

    afterEach((done) => {
        delete require.cache[require.resolve('../app')];
        done();
    })

    it('responds to /print with 200 and generated pdf', (done) => {
        chai.request(server)
            .post('/print')
            .set('content-type', 'application/json')
            .send({
                "title": "Dummy title",
                "html": "<html><body><h1>My first Heading</h1><p>My first paragraph.</p></body></html>"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.should.have.header('content-type', 'application/pdf; charset=utf-8');
                res.should.have.header('Content-Disposition', `attachment; filename="Dummy title"`);
                done();
            });
    });

    it('responds to /print with 400 when html is not provided', (done) => {
        chai.request(server)
            .post('/print')
            .set('content-type', 'application/json')
            .send({
                "title": "Dummy title"
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('responds to /print with 400 when pdf file title is not provided', (done) => {
        chai.request(server)
            .post('/print')
            .set('content-type', 'application/json')
            .send({
                "html": "<html><body><h1>My first Heading</h1><p>My first paragraph.</p></body></html>"
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('responds to /print with 400 when no body is sent', (done) => {
        chai.request(server)
            .post('/print')
            .set('content-type', 'application/json')
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});