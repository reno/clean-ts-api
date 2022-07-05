import { Collection } from 'mongodb'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { mongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-repository'

let accountCollection: Collection

const makeFakeAccountData = (): AddAccountModel => (
  {
    name: 'any name',
    email: 'any@mail.com',
    password: 'any_password'
  }
)

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}


describe('AccountMongoRepository', () => {

  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await mongoHelper.getCollection('accounts')
    accountCollection.deleteMany({})
  })

  test('Should return an account on add success', async () => {
    const sut = makeSut()
    const account = await sut.add(makeFakeAccountData())
    expect(account).toBeTruthy();
    expect(account).toHaveProperty('id');
    expect(account.name).toBe('any name')
    expect(account.email).toBe('any@mail.com')
    expect(account.password).toBe('any_password');
  })

  test('Should return an account on loadByEmail success', async () => {
    const sut = makeSut()
    await accountCollection.insertOne(makeFakeAccountData())
    const account = await sut.loadByEmail('any@mail.com')
    expect(account).toBeTruthy();
    expect(account).toHaveProperty('id');
    expect(account.name).toBe('any name')
    expect(account.email).toBe('any@mail.com')
    expect(account.password).toBe('any_password');
  })

})