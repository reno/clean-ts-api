import { LogErrorRepository } from '../../../../data/protocols/log-error-repository'
import { mongoHelper } from '../helpers/mongo-helper'

export class LogMongoRepository implements LogErrorRepository {

  async logError(stack: string): Promise<void> {
    const collection = await mongoHelper.getCollection('errors')
    await collection.insertOne({
      stack,
      data: new Date()
    })
  }
}