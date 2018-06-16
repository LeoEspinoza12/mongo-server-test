const request = require('supertest');
const expect = require('expect');

var app = require('./server').app;

describe('#server test', () => {

  describe('#send hello world', () => {
    it('should send hello world', (done) => {
      request(app)
        .get('/')
        .expect(404)
        .expect((res) => {
          expect(res.body).toInclude({
            error: 'Page not found'
          })
        })
        .end(done)
    })
  })

  describe('#check user', () => {
    it('should check the user', (done) => {
      request(app)
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(res.body[0]).toInclude({
            name: 'manski'
          })
        })
        .end(done)
    })
  })
})







