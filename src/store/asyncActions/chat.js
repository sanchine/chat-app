import { initialAPIRequestConfig } from "../../api/PZRest";
import { addDialogs } from "../reducers/dialogs";
import { addPreviousMessages, loadMessages, setStatus } from "../reducers/chat";
import { PZRest } from "../../api/PZRest";

const pzRest = new PZRest('chat')

export const fetchDialogs = () => {
    return async dispatch => {
      try {

        const config = {
          ...initialAPIRequestConfig,
          endpoint: 'ae_chat_api/get_chats',
          method: 'GET',
        }
  
        const res = await pzRest.call(config)
  
        if (!res) throw new Error('Dialogs fetching failed') 

        dispatch(addDialogs(res.result))

      } catch (e) {
        console.log("ERROR (fetchDialogs/dialog/asyncMessage):", e);
      }
    }
}

export const fetchMessengerStatus = () => {
  return async dispatch => {
      try {
          const config = {
            endpoint: 'http://chat.algusdev.ru/ae_chat_api/get_messenger_status',
            method: 'GET'
          }
          
          const res = await pzRest.call(config)

          if (!res) throw new Error('Messenger Status fetching failed')

          dispatch(statusLoaded(res.result))
        } catch (e) {
          console.log("ERROR (fetchMessengerStatus/dialog/asyncMessage):", e);
        }
  }
}

export const fetchMessages = (dialogId, firstMessageId = null) => {
    return async dispatch => {

      dispatch(setStatus('loading'))

      try {

          const config = {
            endpoint: `ae_chat_api/get_messages?chat_id=${dialogId}`,
            method: 'GET',
          }

          if (firstMessageId !== null) 
            config.endpoint += `&last_message_id=${firstMessageId}`

          const res = await pzRest.call(config)

          if (firstMessageId !== null) {
            console.log('messagesAdded')
            dispatch(addPreviousMessages(res.messages))
          } else {
            dispatch(loadMessages(res.result.messages))
            console.log('loaded')
          }
          dispatch(setStatus('succeeded'))
        } catch (e) {
          dispatch(setStatus('failed'))
        }
    }
}