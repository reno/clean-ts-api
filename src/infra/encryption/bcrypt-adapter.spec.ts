import * as bcrypt from 'bcryptjs';
import { BcryptAdapter } from './bcrypt-adapter';

describe('BcryptAdapter', () => {

  test('Should call bcrypt with correct value', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

})