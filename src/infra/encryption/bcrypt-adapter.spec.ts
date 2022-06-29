import * as bcrypt from 'bcryptjs';
import { BcryptAdapter } from './bcrypt-adapter';

const salt = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

jest.mock('bcryptjs', () => ({
  async hash(): Promise<string> {
    return new Promise(resolve => resolve('hashed_value'))
  }
}))

describe('BcryptAdapter', () => {

  test('Should call bcrypt with correct value', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hashed_value')
  })

  test('Should throw if Bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(
      () => {
        throw new Error()
      }
    )
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })

})