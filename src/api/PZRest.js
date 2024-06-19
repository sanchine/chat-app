import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';


axios.defaults.credentials = false

export class PZRest {

  constructor(serviceName) { // (URL)
    this.apiUrl = ""
    this.selectBaseURLByServiceName(serviceName)
    this.tokens = {}
  }

  selectBaseURLByServiceName(serviceName) {
    switch (serviceName) {
      case 'chat': {
        this.apiUrl = 'http://chat.algusdev.ru'
        break
      }
      default: break;
    }

    axios.defaults.baseURL = this.apiUrl
  }

  async call({ endpoint, method, data = null, basicAuthToken = null }) {
    // await this.removeTokensFromStorage()

    // authorization request

    // TODO: make one try...catch by check validateStatus in conditions
    try {

      const tokens = await this.getTokensFromStorage()

      if (!tokens && !basicAuthToken) {
        throw new Error('Not tokents and credentials 403')

      } else if (basicAuthToken) {
        // console.warn('JWT is fetching...')

        const options = this.getOptions({
          endpoint: 'jwt/token',
          method: 'GET',
          data: null,
          basicAuthToken
        })

        const res = await axios(options)

        if (res.status !== 200) return false

        await this.updateTokens({...res.data})
      }


    } catch(e) {
      console.log('auth:', e)
      return
    }


    // main request
    try {

      this.tokens = await this.getTokensFromStorage()

      let config = {
        endpoint, method, data,
        basicAuthToken: null,
          accessToken: this.tokens.accessToken
      }
      
      let options = this.getOptions(config)

      // call axios
      let res = await axios(options)


      if (res.status === 403) {
        const isRefreshed = await this.refreshTokens(this.tokens.refreshToken)
        if (!isRefreshed) throw new Error('Tokens not refreshed')

        options = null
        options = this.getOptions({...config, accessToken: this.tokens.accessToken})

        res = null
        res = await axios(options)

        if (res.status !== 200) return false
      }


      if (endpoint === 'user/logout') {
        // console.warn('Logging out...')
        await this.removeTokensFromStorage()
      }
      return res.data


    } catch (e) {
      console.log(e)
    }

  }


  getOptions({endpoint, method, data, basicAuthToken = null, accessToken = null}) {
    
    // settings up
    const options = {
      url: `${endpoint}`,
      headers: {},
      method,
      validateStatus: (status) => {
        return status < 500
      }
    }

    if (data) {
      options.body = JSON.stringify(data) 
    }

    options.headers.Authorization = 
      (basicAuthToken)
                                  /// (isBasic, token)
        ? this.makeAuthorizationString(true, basicAuthToken)
        : this.makeAuthorizationString(false, accessToken)

    return {...options}
  }

  
  makeAuthorizationString(isBasic, token) {
    const type = isBasic ? 'Basic' : 'Bearer'
    return `${type} ${token}`
  }


  async refreshTokens(refreshToken) {
    try {
      // console.warn('Tokens are refreshing...')

      const options = {
        url: `/jwt/token/refresh`,
        params: {
          refresh_token: refreshToken
        },
        method: 'GET',
        validateStatus: (status) => {
          return status < 500
        }
      }
      
      const res = await axios(options)
  
      if (!res) return false
      if (res.status >= 400) return false
      
      // console.warn('Tokens has refreshed')
      await this.updateTokens({...res.data})
      
      return true

    } catch (e) {
      console.log('refreshTokens():', e)
    }
  }

  async updateTokens(tokens) {
    try {
      
      this.tokens = {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token
      }
  
      await this.setTokensToStorage({...this.tokens})
  
      // console.warn('Tokens updated')

    } catch (e) {
      console.log(e)
    }
  }

  async getTokensFromStorage() {
    try {
      
      // console.warn('Tokens is getting..')
      const tokens = await JSON.parse(await AsyncStorage.getItem('tokens'))
      
      if (tokens) return tokens

      throw new Error('Tokens has not getting')

    } catch (e) {
      console.log('getTokensFromStorage:', e)
    }
  }
  
  async removeTokensFromStorage() {
    try {
      
      // console.warn('Tokens is removing...')
      await AsyncStorage.removeItem('tokens')

    } catch (e) {
      console.log('RemoveTokensFromStorage failed:', e)
    }
  }
  
  async setTokensToStorage(tokens) {
    try {
      
      // console.warn('Tokens is setting...')
      await AsyncStorage.setItem('tokens', JSON.stringify(tokens))

    } catch (e) {
      console.log('Tokens has not getting:', e)
    }
  }

}

export const initialAPIRequestConfig = {
  endpoint: null,
  method: null,
  data: null,
  credentials: null
}