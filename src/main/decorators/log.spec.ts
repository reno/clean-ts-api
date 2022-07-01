import { ServerError } from '../../presentation/errors'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'
import { ok, serverError } from '../../presentation/helpers/http-helper'
import { LogErrorRepository } from '../../data/protocols/log-error-repository'
import { AccountModel } from '../../domain/models/account'


const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      return new Promise(resolve => resolve(ok(makeFakeAccount())))
    }
  }
  return new ControllerStub()
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError(stack: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new LogErrorRepositoryStub()
}

const makeFakeRequest = (): HttpRequest => (
  {
    body: {
      name: 'any name',
      email: 'any@mail.com',
      password: 'anypassword',
      passwordConfirmation: 'anypassword'
    }
  }
)

const makeFakeAccount = (): AccountModel => (
  {
    id: 'valid_id',
    name: 'valid name',
    email: 'valid@mail.com',
    password: 'validpassword'
  }
)

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return { sut, controllerStub, logErrorRepositoryStub }
}

describe('LogController decorator', () => {

  test('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const spy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(spy).toHaveBeenCalledWith(httpRequest)
  })

  test('should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })

  test('should call LogErrorRepository if controller returns a ServerError', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const error = makeFakeServerError()
    const spy = jest.spyOn(logErrorRepositoryStub, 'logError')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(
      new Promise(resolve => resolve(error))
    )
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(spy).toHaveBeenCalledWith('any_stack')
  })
})