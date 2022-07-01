import { MissingParamError } from "../../errors";
import { badRequest } from "../../helpers/http-helper";
import { Controller } from "../../protocols";
import { HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {

  constructor() { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}