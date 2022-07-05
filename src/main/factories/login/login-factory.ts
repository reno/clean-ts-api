import env from '../../config/env'
import { Controller } from '../../../presentation/protocols/controller';
import { LoginController } from '../../../presentation/controlllers/login/login-controller';
import { LogControllerDecorator } from '../../decorators/log';
import { LogMongoRepository } from '../../../infra/database/mongodb/log/log-repository';
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { makeLoginValidation } from './login-validation'
import { AccountMongoRepository } from '../../../infra/database/mongodb/account/account-repository'
import { BcryptAdapter } from '../../../infra/encryption/bcrypt-adapter/bcrypt-adapter';
import { JwtAdapter } from '../../../infra/encryption/jwt-adapter/jwt-adapter';

export const makeLoginController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )
  const validation = makeLoginValidation()
  const loginController = new LoginController(dbAuthentication, validation)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)

}