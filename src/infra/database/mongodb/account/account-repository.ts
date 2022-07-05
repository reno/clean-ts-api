import { stringify } from 'querystring'
import { AddAccountRepository } from '../../../../data/protocols/database/account/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/database/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '../../../../data/protocols/database/account/update-access-token-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { mongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {

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

  async updateAccessToken(id: string, token: string): Promise<void> {
    const collection = await mongoHelper.getCollection('accounts')
    await collection.updateOne({ _id: id }, { $set: { accessToken: token } })
  }
} 