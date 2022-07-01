import { Collection } from 'mongodb'
import { mongoHelper } from '../helpers/mongo-helper'
import { LogMongoRepository } from './log-repository'

const makeSut = (): LogMongoRepository => {
  const sut = new LogMongoRepository()
  return sut
}

describe('Log Mongo Repository', () => {
  let collection: Collection

  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  beforeEach(async () => {
    collection = await mongoHelper.getCollection('errors')
    collection.deleteMany({})
  })


  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError('any_error')
    const count = await collection.countDocuments()
    expect(count).toBe(1)
  })

})