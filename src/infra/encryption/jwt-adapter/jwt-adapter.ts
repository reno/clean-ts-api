import jwt from 'jsonwebtoken';
import { Encrypter } from "../../../data/protocols/encryption/encrypter";
import { TokenGenerator } from '../../../data/protocols/encryption/token-generator';

export class JwtAdapter implements TokenGenerator {

  constructor(private readonly secret: string) { }

  async generate(value: string): Promise<string> {
    return await jwt.sign({ id: value }, this.secret)
  }
}