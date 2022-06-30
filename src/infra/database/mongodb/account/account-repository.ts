import { stringify } from 'querystring'
import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { mongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const collection = await mongoHelper.getCollection('accounts')
    const result = await collection.insertOne(accountData)
    const account = await collection.findOne({ _id: result.insertedId })
    console.log(account)
    return {
      id: account._id.toHexString(),
      name: account.name,
      email: account.email,
      password: account.password,
    }
  }
} 