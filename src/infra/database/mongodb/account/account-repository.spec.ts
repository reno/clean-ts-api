import { mongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-repository'

describe('AccountMongoRepository', () => {

  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  test('Should return an account on success', async () => {
    const sut = new AccountMongoRepository();
    const account = await sut.add({
      name: 'any_name',
      email: 'any@mail.com',
      password: 'anypassword'
    })
    expect(account).toBeTruthy();
    expect(account).toHaveProperty('id');
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any@mail.com')
    expect(account.password).toBe('anypassword');

  })
})