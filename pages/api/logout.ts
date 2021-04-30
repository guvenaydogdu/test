import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', serialize('token', '', { path: '/', expires: new Date(0) }))
  res.end()
}
