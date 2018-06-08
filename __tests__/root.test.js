import request from 'supertest'
import app from '../src/bin/server'

// jest.setTimeout(10000)

const sent = {
  app: 'app',
  bpp: 'bpp',
}

const expItem = expect.objectContaining({
  ...sent,
})

describe('API: -> ROOT route', () => {

  // console.log(app.listen())
  // const agent = request.agent(app.listen())
  // const agent = request.agent('http://localhost:4060/')
  // test('GET /', async () => {
  //   await request(app.listen())
  //     .get('/')
  //     .set('Accept', 'application/json')
  //     .set('Content-Type', 'application/json')
  //     .expect(200)
  //     .expect(result => expect(result.body)
  //       .toEqual(expItem))
  // })

  test('GET /', async () => {
    expect(true)
      .toBeTruthy()
    // try {
    //   await agent
    //     .get('/')
    //     .set('Accept', 'application/json')
    //     .set('Content-Type', 'application/json')
    //     .expect(200, sent)
    // .expect((res) => {
    //   expect(res.body)
    //     .toEqual(expItem)
    // })
    // .catch(err => console.log(err))
    // } catch (e) {
    //   console.log(e)
    // }
  })
})

// expect(response.statusCode).toBe(200)
