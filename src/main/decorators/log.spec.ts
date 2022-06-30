import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

const makeSut = () => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse = {
        statusCode: 200,
        body: {
          message: 'Test'
        }
      }
      return new Promise(resolve => resolve(httpResponse))
    }
  }
  const controllerStub = new ControllerStub()
  const sut = new LogControllerDecorator(controllerStub)
  return { sut, controllerStub }
}

describe('LogController decorator', () => {

  test('should log the request', async () => {
    const { sut, controllerStub } = makeSut()
    const spy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = {
      body: {
        name: 'any name',
        email: 'any@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(spy).toHaveBeenCalledWith(httpRequest)
  })
})