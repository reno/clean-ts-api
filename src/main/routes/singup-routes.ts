import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', async (request, response) => {
    return response.json({ ok: 'ok' })
  })
}
