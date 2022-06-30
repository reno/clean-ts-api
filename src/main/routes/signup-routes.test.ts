import { response } from 'express'
import request from 'supertest'
import app from '../config/app'

describe('SignUp routes', () => {

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'any name',
        email: 'any@mail.com',
        password: 'anypassword',
        passwordConfirmation: 'anypassword'
      })
      .expect(200)
  })
})
