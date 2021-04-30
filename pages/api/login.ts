import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req?.body?.token && typeof req?.body?.token == 'string') {
    res.setHeader('Set-Cookie', serialize('token', req?.body?.token, { path: '/' }))
    res.status(200).end('ok')
  } else {
    res.status(401).end()
  }
}
