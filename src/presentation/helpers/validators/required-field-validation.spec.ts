import { MissingParamError } from "../../errors"
import { RequiredFieldValidation } from "./required-field-validation"

const makeSut = (field: string): RequiredFieldValidation => {
  return new RequiredFieldValidation(field)
}

describe('RequiredField Validation', () => {

  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return MissingParamError if validation succeeds', () => {
    const sut = makeSut('field')
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })

})