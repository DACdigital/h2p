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
        delete require.cache[require.resolve( '../app' )];
        done();
    })

    it('responds to / with 200 status', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('reponds to everything else with 404 status', (done) => {
        chai.request(server)
            .get('/foo')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});