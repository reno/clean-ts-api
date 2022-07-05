import { response } from 'express'
import request from 'supertest'
import { mongoHelper } from '../../infra/database/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('Auth routes', () => {

  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  beforeEach(async () => {
    const collection = await mongoHelper.getCollection('accounts')
    collection.deleteMany({})
  })

  describe('Login routes', () => {
    test('Should return 200 on signup', async () => {
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
  }
  
})
