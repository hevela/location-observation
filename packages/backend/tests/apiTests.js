// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("API Tests", () => {
  describe("/locations/", () => {
    it("should get all locations records", (done) => {
      chai.request(app)
          .get('/locations/')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
    });
    it("should get a single location record", (done) => {
      const id = 1;
      chai.request(app)
          .get(`/locations/${id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
    });
    it("should not get a single location record", (done) => {
      const id = 500;
      chai.request(app)
          .get(`/locations/${id}/`)
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
    });
    it("should not allow update without token", (done) => {
      const id = 1;
      chai.request(app)
          .put(`/locations/${id}/`)
          .set('Content-Type', 'application/json')
          .send({ name: 'locationname', latitude: -90 })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            done();
          });
    });
    it("should not allow create a new location without token", (done) => {
      const id = 1;
      chai.request(app)
          .post(`/locations/`)
          .set('Content-Type', 'application/json')
          .send({ name: 'locationname', latitude: -90, longitude: 90, open: 0 })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            done();
          });
    });
    it("should not allow delete a location without token", (done) => {
      const id = 1;
      chai.request(app)
          .delete(`/locations/${id}/`)
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
    });
  });
  describe("/admin/", () => {
    it("should authenticate a user", (done) => {
      chai.request(app)
          .post('/auth/signin/')
          .set('Content-Type', 'application/json')
          .send({ password: 'Dog', username: 'Snoop' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
    });
    it("should not authenticate a user", (done) => {
      chai.request(app)
          .post('/auth/signin/')
          .set('Content-Type', 'application/json')
          .send({ password: 'test', username: 'test' })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
          });
    });
  });
});