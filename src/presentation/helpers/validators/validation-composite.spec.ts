import { MissingParamError } from '../../errors'
import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'



const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return new MissingParamError('field')
    }
  }
  return new ValidationStub()
}

const makeSut = (validation: Validation): ValidationComposite => {
  return new ValidationComposite([validation])
}

describe('Validation Composite', () => {

  test('Should return an error if any validation fails', () => {
    const validationStub = makeValidationStub()
    const sut = makeSut(validationStub)
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })

})