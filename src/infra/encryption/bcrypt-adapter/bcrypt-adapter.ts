import * as bcrypt from 'bcryptjs';
import { Encrypter } from '../../../data/protocols/encryption/encrypter'
import { HashComparer } from '../../../data/protocols/encryption/hash-comparer';

export class BcryptAdapter implements Encrypter, HashComparer {
  private readonly salt: number

  constructor(salt: number) {
    this.salt = salt
  }

  async encrypt(value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}