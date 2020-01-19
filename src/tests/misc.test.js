const request = require('supertest-as-promised')
const httpStatus = require('http-status')
const chai = require('chai')
const { expect } = require('chai')
const { describe, it } = require('mocha')
const app = require('../../index')

chai.config.includeStack = true

describe('## Misc', () => {
  describe('# GET /api/ping', () => {
    it('should return OK', (done) => {
      request(app)
        .get('/api/ping')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.text).to.equal('pong')
          done()
        })
        .catch(done)
    })
  })

  describe('# GET /api/404', () => {
    it('should return 404 status', (done) => {
      request(app)
        .get('/api/404')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found')
          done()
        })
        .catch(done)
    })
  })
})
