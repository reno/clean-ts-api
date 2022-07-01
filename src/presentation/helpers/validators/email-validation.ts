import { InvalidParamError } from "../../errors"
import { EmailValidator } from "../../protocols/email-validator"
import { badRequest } from "../http-helper"
import { Validation } from "./validation"

export class EmailValidation implements Validation {

  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly fieldname: string
  ) { }

  validate(input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldname])
    if (!isValid) {
      return new InvalidParamError(this.fieldname)
    }
  }
}