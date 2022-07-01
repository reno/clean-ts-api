import { LoginController } from './login'
import { badRequest } from "../../helpers/http-helper";
import { MissingParamError } from '../../errors';

const makeHttpRequest = (): HttpRequest => (
  {
    body: {
      email: 'any@mail.com',
      password: 'any_password'
    }
  }
)


const makeSut = (): LoginController => {
  const sut = new LoginController()
  return sut
}


describe('Login Controller', () => {

  test('Should return 400 if no email is provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        email: 'any@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

})