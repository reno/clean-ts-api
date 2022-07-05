import { Controller } from '../../../presentation/protocols'
import { Request, Response, NextFunction } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 20) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
    else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}