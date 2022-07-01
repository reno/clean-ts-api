import { MissingParamError } from "../../errors"
import { Validation } from "./validation"

export class RequiredFieldValidation implements Validation {

  constructor(
    private readonly fieldname: string
  ) { }

  validate(input: any): Error {
    if (!input[this.fieldname]) {
      return new MissingParamError(this.fieldname)
    }
  }
}