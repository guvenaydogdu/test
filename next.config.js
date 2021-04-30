const { i18n } = require('./next-i18next.config')


module.exports = {
  i18n,
  env: {
    API_BASE_URL:process.env.API_BASE_URL,
    LINKEDIN_STATE: process.env.LINKEDIN_STATE,
    LINKEDIN_SCOPE: process.env.LINKEDIN_SCOPE,
    LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
    LINKEDIN_REDIRECT: process.env.LINKEDIN_REDIRECT,
    LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
    PORT:process.env.PORT,
    PROJECT_IMAGE_BASE_URL:process.env.PROJECT_IMAGE_BASE_URL
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    //mySecret: 'secret',
    //secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    //staticFolder: '/static',
  },
  images: {
    domains: ['azwetbmrstagloadingdata.blob.core.windows.net'],
  },

}


/**
 * 
 * 
 * 
 * const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
// Will only be available on the server-side
console.log(serverRuntimeConfig.mySecret)
// Will be available on both server-side and client-side
console.log(publicRuntimeConfig.staticFolder)
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */