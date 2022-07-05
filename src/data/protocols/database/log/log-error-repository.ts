export interface LogErrorRepository {

  async logError(stack: string): Promise<void> { }
}