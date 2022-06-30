import { response } from 'express'
import request from 'supertest'
import app from '../config/app'

describe('Body parser middleware', () => {

  test('Should parse body as json', async () => {
    app.post('/test-body-parser', (request, response) => {
      response.send(request.body)
    })
    await request(app)
      .post('/test-body-parser')
      .send({ name: 'Teste' })
      .expect({ name: 'Teste' })
  })
})