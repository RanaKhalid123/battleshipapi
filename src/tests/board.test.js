/* global describe it after */
const mongoose = require('mongoose')
const request = require('supertest-as-promised')
const httpStatus = require('http-status')
const chai = require('chai')
const expect = require('chai').expect
const app = require('../../index')

chai.config.includeStack = true

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {}
  mongoose.modelSchemas = {}
  mongoose.connection.close()
  done()
})

describe('## Board APIs', () => {
  let board = null

  describe('# POST /api/boards', () => {
    it('should create a new board', (done) => {
      request(app)
        .post('/api/boards')
        .send(board)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.square_grid).to.equal(10)
          board = res.body
          done()
        })
        .catch(done)
    })
  })

  describe('# GET /api/boards/:boardId', () => {
    it('should get board details', (done) => {
      request(app)
        .get(`/api/boards/${board._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.square_grid).to.equal(10)
          done()
        })
        .catch(done)
    })

    it('should report error with message - Not found, when board does not exists', (done) => {
      request(app)
        .get('/api/boards/56c787ccc67fc16ccc1a5e92')
        .then((res) => {
          expect(res.body.message).to.equal('Not Found')
          done()
        })
        .catch(done)
    })
  })

  describe('# POST /api/boards/:boardId/_add_unit', () => {
    describe('# Battleship', () => {
      it('should add battleship into the board', (done) => {
        let battleship = {
          direction: 'vertical',
          type: 1,
          at: '10x7'
        }
        request(app)
          .post(`/api/boards/${board._id}/_add_unit`)
          .send(battleship)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.message).to.equal('legal')
            done()
          })
          .catch(done)
      })

      it('should add Cruiser into the board', (done) => {
        let cruiser = {
          direction: 'horizontal',
          type: 2,
          at: '2x2'
        }
        request(app)
          .post(`/api/boards/${board._id}/_add_unit`)
          .send(cruiser)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.message).to.equal('legal')
            done()
          })
          .catch(done)
      })

      it('should add Cruiser into the board', (done) => {
        let cruiser = {
          direction: 'horizontal',
          type: 2,
          at: '3x4'
        }
        request(app)
          .post(`/api/boards/${board._id}/_add_unit`)
          .send(cruiser)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.message).to.equal('legal')
            done()
          })
          .catch(done)
      })

      it('should add Destroyer into the board', (done) => {
        let destroyer = {
          direction: 'horizontal',
          type: 3,
          at: '2x6'
        }
        request(app)
          .post(`/api/boards/${board._id}/_add_unit`)
          .send(destroyer)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.message).to.equal('legal')
            done()
          })
          .catch(done)
      })

      it('should add Destroyer into the board', (done) => {
        let destroyer = {
          direction: 'vertical',
          type: 3,
          at: '7x2'
        }
        request(app)
          .post(`/api/boards/${board._id}/_add_unit`)
          .send(destroyer)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.message).to.equal('legal')
            done()
          })
          .catch(done)
      })

      it('should add Destroyer into the board', (done) => {
        let destroyer = {
          direction: 'vertical',
          type: 3,
          at: '10x3'
        }
        request(app)
          .post(`/api/boards/${board._id}/_add_unit`)
          .send(destroyer)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.message).to.equal('legal')
            done()
          })
          .catch(done)
      })

      it('should add Submarine into the board', (done) => {
        let submarine = {
          direction: 'vertical',
          type: 4,
          at: '1x4'
        }
        request(app)
          .post(`/api/boards/${board._id}/_add_unit`)
          .send(submarine)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.message).to.equal('legal')
            done()
          })
          .catch(done)
      })

      it('should add Submarine into the board', (done) => {
        let submarine = {
          direction: 'vertical',
          type: 4,
          at: '1x10'
        }
        request(app)
          .post(`/api/boards/${board._id}/_add_unit`)
          .send(submarine)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.message).to.equal('legal')
            done()
          })
          .catch(done)
      })

      it('should add Submarine into the board', (done) => {
        let submarine = {
          direction: 'vertical',
          type: 4,
          at: '5x6'
        }
        request(app)
          .post(`/api/boards/${board._id}/_add_unit`)
          .send(submarine)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.message).to.equal('legal')
            done()
          })
          .catch(done)
      })

      it('should illegal to place submarine', (done) => {
        let submarine = {
          direction: 'vertical',
          type: 4,
          at: '9x7'
        }
        request(app)
          .post(`/api/boards/${board._id}/_add_unit`)
          .send(submarine)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.error).to.equal(true)
            expect(res.body.message).to.equal('The ship is adjacent.')
            done()
          })
          .catch(done)
      })

      it('should illegal to place submarine', (done) => {
        let submarine = {
          direction: 'vertical',
          type: 4,
          at: '9x6'
        }
        request(app)
          .post(`/api/boards/${board._id}/_add_unit`)
          .send(submarine)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.error).to.equal(true)
            expect(res.body.message).to.equal('The ship is adjacent.')
            done()
          })
          .catch(done)
      })

      it('should illegal because over square grid', (done) => {
        let submarine = {
          direction: 'horizontal',
          type: 4,
          at: '10x12'
        }
        request(app)
          .post(`/api/boards/${board._id}/_add_unit`)
          .send(submarine)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.error).to.equal(true)
            expect(res.body.message).to.equal('ship position is over grid.')
            done()
          })
          .catch(done)
      })

      it('should add Submarine into the board', (done) => {
        let submarine = {
          direction: 'vertical',
          type: 4,
          at: '8x6'
        }
        request(app)
          .post(`/api/boards/${board._id}/_add_unit`)
          .send(submarine)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.message).to.equal('legal')
            done()
          })
          .catch(done)
      })

      it('should exceed because already place 4 submarine', (done) => {
        let submarine = {
          direction: 'horizontal',
          type: 4,
          at: '5x9'
        }
        request(app)
          .post(`/api/boards/${board._id}/_add_unit`)
          .send(submarine)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.error).to.equal(true)
            expect(res.body.message).to.equal('Game is Ready.')
            done()
          })
          .catch(done)
      })
    })
  })

  describe('# POST /api/boards/:boardId/_fire', () => {
    it('should get Error when fire wrong pattern', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          fire: 'xxx'
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).to.equal('Bad Request')
          done()
        })
        .catch(done)
    })

    it('should get *Miss* when fire missed', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          fire: '1x1'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('Miss')
          done()
        })
        .catch(done)
    })

    it('should get *Hit* when hit 2x2', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          fire: '2x2'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('Hit')
          done()
        })
        .catch(done)
    })

    it('should get *Hit* when hit 3x2', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          fire: '3x2'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('Hit')
          done()
        })
        .catch(done)
    })

    it('should get *You just sank the Cruiser* when sank the ship', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          fire: '4x2'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('You just sank the Cruiser')
          done()
        })
        .catch(done)
    })

    it('should get *Hit* when hit 3x4', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          fire: '3x4'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('Hit')
          done()
        })
        .catch(done)
    })

    it('should get *Hit* when hit 5x4', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          fire: '5x4'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('Hit')
          done()
        })
        .catch(done)
    })

    it('should get *You just sank the Cruiser* when sank the ship', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          fire: '4x4'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('You just sank the Cruiser')
          done()
        })
        .catch(done)
    })

    it('should get *Hit* when hit 10x7', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          fire: '10x7'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('Hit')
          done()
        })
        .catch(done)
    })

    it('should get *Hit* when hit 10x8', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          fire: '10x8'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('Hit')
          done()
        })
        .catch(done)
    })

    it('should get *Hit* when hit 10x10', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          fire: '10x10'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('Hit')
          done()
        })
        .catch(done)
    })

    it('should get *You just sank the Battleship* when sank the ship', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          fire: '10x9'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('You just sank the Battleship')
          done()
        })
        .catch(done)
    })

    it('should get *Hit* when hit 10x3', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          fire: '10x3'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('Hit')
          done()
        })
        .catch(done)
    })

    it('should get *You just sank the Destroyer* when sank the ship', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          fire: '10x4'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('You just sank the Destroyer')
          done()
        })
        .catch(done)
    })

    it('should get *Hit* when hit 7x2', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          fire: '7x2'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('Hit')
          done()
        })
        .catch(done)
    })

    it('should get *You just sank the Destroyer* when sank the ship', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          fire: '7x3'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('You just sank the Destroyer')
          done()
        })
        .catch(done)
    })

    it('should get *Hit* when hit 2x6', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          fire: '2x6'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('Hit')
          done()
        })
        .catch(done)
    })

    it('should get *You just sank the Destroyer* when sank the ship', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          fire: '3x6'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('You just sank the Destroyer')
          done()
        })
        .catch(done)
    })

    it('should get *You just sank the Submarine* when sank the ship', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          fire: '1x4'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('You just sank the Submarine')
          done()
        })
        .catch(done)
    })

    it('should get *You just sank the Submarine* when sank the ship', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          fire: '5x6'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('You just sank the Submarine')
          done()
        })
        .catch(done)
    })

    it('should get *You just sank the Submarine* when sank the ship', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          fire: '1x10'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('You just sank the Submarine')
          done()
        })
        .catch(done)
    })

    it('should get *Win ! You completed the game in 21 moves* when all ships down', (done) => {
      request(app)
        .post(`/api/boards/${board._id}/_fire`)
        .send({
          fire: '8x6'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal('Win ! You completed the game in 21 moves')
          done()
        })
        .catch(done)
    })
  })

  describe('# GET /api/boards/', () => {
    it('should get all boards', (done) => {
      request(app)
        .get('/api/boards')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array')
          done()
        })
        .catch(done)
    })

    it('should get all boards (with limit and skip)', (done) => {
      request(app)
        .get('/api/boards')
        .query({
          limit: 10,
          skip: 1
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array')
          done()
        })
        .catch(done)
    })
  })

  describe('# DELETE /api/boards/', () => {
    it('should delete board', (done) => {
      request(app)
        .delete(`/api/boards/${board._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.square_grid).to.equal(10)
          done()
        })
        .catch(done)
    })
  })
})
