import { mongoHelper as sut } from './mongo-helper'

describe('Mongo helper', () => {

  beforeAll(async () => {
    await sut.connect(process.env.MONGODB_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('should reconnect if mongodb is down', async () => {
    let collection = await sut.getCollection('accounts')
    expect(collection).toBeTruthy()
    await sut.disconnect()
    collection = await sut.getCollection('accounts')
    expect(collection).toBeTruthy()
  })

})