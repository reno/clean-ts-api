import { LoadAccountByEmailRepository } from '../../protocols/database/load-account-by-email-repository'
import { AccountModel } from '../add-account/db-add-account-protocols'
import { DbAuthentication } from './db-authentication'

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepository {
    async load(email: string): Promise<AccountModel> {
      const account: AccountModel = {
        id: 'any_id',
        name: 'any_name',
        email: 'any@mail.com',
        password: 'any_password'
      }
      return new Promise(resolve => resolve(account))
    }
  }
  return new LoadAccountByEmailRepository()
}

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {

  test('Should call LoadAccountByEmailRepository with correct email ', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const spy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth({
      email: 'any@mail.com',
      password: 'any_password'
    })
    expect(spy).toHaveBeenCalledWith('any@mail.com')
  })

})