import * as bcrypt from 'bcryptjs';
import { BcryptAdapter } from './bcrypt-adapter';

const salt = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

jest.mock('bcryptjs', () => ({
  async hash(): Promise<string> {
    return new Promise(resolve => resolve('hashed_value'))
  },
  async compare(): Promise<boolean> {
    return new Promise(resolve => resolve(true))
  }
}))

describe('BcryptAdapter', () => {

  test('Should call encrypt with correct value', async () => {
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

  test('Should throw if encrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(
      () => {
        throw new Error()
      }
    )
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })

  test('Should call compare with correct value', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })

  test('Should return true when compare returns true', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(true)
  })

  test('Should return false when compare fails', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(
      () => false
    )
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(false)
  })

  test('Should throw if compare throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(
      () => {
        throw new Error()
      }
    )
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})