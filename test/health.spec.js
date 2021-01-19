const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe('Health endpoint tests', () => {

    var server;

    beforeEach(async () => {
        server = await require('../app');
    });

    afterEach(async () => {
        delete await require.cache[require.resolve( '../app' )];
    })

    it('responds to / with 200 status', async () => {
        const res = await chai.request(server)
            .get('/');

        res.should.have.status(200);
    });

    it('reponds to everything else with 404 status', async () => {
        const res = await chai.request(server)
            .get('/foo');

        res.should.have.status(404);
    });
});