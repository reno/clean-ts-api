import { SignUpController } from '../../../presentation/controlllers/signup/signup-controller'
import { EmailValidatorAdapter } from '../../adapters/validators/email-validator-adapter'
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/encryption/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/database/mongodb/account/account-repository'
import { LogMongoRepository } from '../../../infra/database/mongodb/log/log-repository'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}