export interface LogErrorRepository {

  async log(stack: string): Promise<void> { }
}