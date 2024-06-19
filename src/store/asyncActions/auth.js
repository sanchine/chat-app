import base64 from 'base-64'
import { login } from "../reducers/auth";
import { logout } from "../reducers/auth";
import { PZRest } from "../../api/PZRest";
import { initialAPIRequestConfig } from "../../api/PZRest";
import { clearDialogs, dialogsCleared } from '../reducers/dialogs';
import { clearMessages, messagesCleared } from '../reducers/chat';

const pzRest = new PZRest('chat')

export const fetchAuth = (user = {}) => {
  return async dispatch => {

    const basicAuthToken = (Object.keys(user).length !== 0)
        ? base64.encode(`${user.name + ":" + user.pass}`)
        : null

    try {

      // dispatch(loadingFetchAuth)

      const config = {
        endpoint: 'ae_chat_api/get_user',
        method: 'GET',
        data: null,
        basicAuthToken
      }

      const res = await pzRest.call(config)

      if (!res) throw new Error('Auth failed')

      dispatch(login(res?.result?.user))
      

    } catch (e) {
      console.log(e)
    }
  }
}

export const fetchLogout = () => {
  return async dispatch => {
    try {

      const config = {
        ...initialAPIRequestConfig,
        endpoint: 'user/logout',
        method: 'GET',
      }
      
      const resLogout = await pzRest.call(config)

      if (resLogout) {
        dispatch(clearMessages())
        dispatch(clearDialogs())
        dispatch(logout())        
      }

    } catch (e) {
      console.log(e)
    }
  }
}
