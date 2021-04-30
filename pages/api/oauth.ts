import { NextApiRequest, NextApiResponse } from 'next'
import { getURLWithQueryParams } from '../../utils/linkedin'

const Oauth = async (req: NextApiRequest, res: NextApiResponse) => {
  // Query to exchange our authorization code for an access token
  if (req?.cookies?.token) {
    res.redirect('/')
  }
  const LINKEDIN_URL = getURLWithQueryParams('https://www.linkedin.com/oauth/v2/accessToken', {
    grant_type: 'authorization_code',
    code: req.query.code,
    redirect_uri: process.env.LINKEDIN_REDIRECT,
    client_id: process.env.LINKEDIN_CLIENT_ID,
    client_secret: process.env.LINKEDIN_CLIENT_SECRET,
  })
  let tok
  const resp = await fetch(LINKEDIN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })

  if (resp.ok) {
    tok = await resp.json()
    console.log('tok', tok)
  }
  // request apiye çık  ardından  header set et ardından anasayfaya yönlendir
  const { access_token } = tok //expires_in
  console.log('access_token', access_token)
  // res.setHeader('Set-Cookie', serialize('token', access_token, { path: '/' }))
  res.redirect('/')
}

export default Oauth
