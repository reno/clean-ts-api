import { response } from 'express'
import { Collection } from 'mongodb'
import request from 'supertest'
import * as bcrypt from 'bcryptjs'
import { mongoHelper } from '../../infra/database/mongodb/helpers/mongo-helper'
import app from '../config/app'

let collection: Collection

describe('Auth routes', () => {

  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  beforeEach(async () => {
    collection = await mongoHelper.getCollection('accounts')
    collection.deleteMany({})
  })

  describe('SignUp routes', () => {
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
  })

  describe('Login routes', () => {
    test('Should return 200 on login', async () => {
      const password = await bcrypt.hash('any_password', 12)
      await collection.insertOne({
        name: 'any name',
        email: 'any@mail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'any@mail.com',
          password: 'any_password',
        })
        .expect(200)
    })
  })

})
