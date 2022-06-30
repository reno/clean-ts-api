import { Collection, MongoClient } from 'mongodb'
import { disconnect } from 'process'
import { AccountModel } from '../../../../domain/models/account'

export const mongoHelper = {
  client: null as MongoClient,

  async connect(url: string): Promise<void> {
    this.client = await MongoClient.connect(url)
  },

  async disconnect(): Promise<void> {
    await this.client.close()
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name)
  },

  map(collection: any): any {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign(
      {},
      collectionWithoutId,
      { id: _id.toHexString() }
    )
  }
}