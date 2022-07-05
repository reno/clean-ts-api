import { stringify } from 'querystring'
import { AddAccountRepository } from '../../../../data/protocols/database/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/database/load-account-by-email-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { mongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const collection = await mongoHelper.getCollection('accounts')
    const result = await collection.insertOne(accountData)
    const account = await collection.findOne({ _id: result.insertedId })
    return mongoHelper.map(account)
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const collection = await mongoHelper.getCollection('accounts')
    const account = await collection.findOne({ email })
    if (!account) {
      return null
    }
    return mongoHelper.map(account)
  }

} 