import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

export function useAuth() {
  const [config, setConfig] = useState({
    authToken: Cookies.get('TOKEN_LOGIN'),
    baseUrl: 'https://medexam1.amaderthikana.com/api',
    downloadBaseUrl: 'https://medexam1.amaderthikana.com/api'
  })

  const getHeaders = () => ({
    'TOKEN_MEMBER': config.authToken
  })
  const getEndpoint = (path) => `${config.baseUrl}/${path}`
  const getDownloadEndpoint = (path) => `${config.downloadBaseUrl}/${path}`

  return {
    config,
    getHeaders,
    getEndpoint,
    getDownloadEndpoint
  }
} 