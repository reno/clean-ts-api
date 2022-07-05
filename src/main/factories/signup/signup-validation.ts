import { SignUpController } from '../../../presentation/controlllers/signup/signup-controller'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/encryption/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/database/mongodb/account/account-repository'
import { LogMongoRepository } from '../../../infra/database/mongodb/log/log-repository'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { ValidationComposite, RequiredFieldValidation, CompareFieldsValidation, EmailValidation } from '../../../presentation/helpers/validators'
import { Validation } from '../../../presentation/protocols/validation'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation(new EmailValidatorAdapter(), 'email'))
  return new ValidationComposite(validations)

}