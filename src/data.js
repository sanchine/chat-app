// import ItemImage from '../assets/DialogsScreen/item_image.png'
// import ItemImage2 from '../assets/DialogsScreen/item_image2.png'

const ItemImage = require('../assets/DialogsScreen/item_image.png')
const ItemImage2 = require('../assets/DialogsScreen/item_image2.png')
const ItemImage3 = require('../assets/DialogsScreen/item_image3.png')
const AvatarImage = require('../assets/ChatScreen/chat_avatar.png')

export const DATA = [
    {
      id: '1',
      img: ItemImage,
      author: 'Сергей',
      date: new Date().toJSON(),
      checked: false,
      avatarImage: null,
      avatarColor: '#FF8F51',
      title: 'Шестерня ведущая привод...',
      message: 'Здравствуйте. Подскажите ...'
    },
    {
      id: '2',
      img: ItemImage2,
      author: 'Иван',
      date: new Date().toJSON(),
      checked: true,
      avatarImage: null,
      avatarColor: '#5EB0DE',
      title: 'Картер ЯМЗ-650.10 маховик...',
      message: 'Да, мы можем сделать так ...'
    },
    {
      id: '3',
      img: ItemImage3,
      author: 'Виктор',
      date: new Date().toJSON(),
      checked: true,
      avatarImage: AvatarImage,
      avatarColor: '#FF8F51',
      title: 'Крюк буксирного прибора УРАЛ (АО "АЗ "УРАЛ") - 53444',
      message: 'Исполнитель сообщил, что ...'
    },
    {
      id: '2',
      img: ItemImage2,
      author: 'Иван',
      date: new Date().toJSON(),
      checked: true,
      avatarColor: '#5EB0DE',
      title: 'Картер ЯМЗ-650.10 маховик...',
      message: 'Да, мы можем сделать так ...'
    },
    {
      id: '1',
      img: ItemImage,
      author: 'Сергей',
      date: new Date().toJSON(),
      checked: false,
      avatarColor: '#FF8F51',
      title: 'Шестерня ведущая привод...',
      message: 'Здравствуйте. Подскажите ...'
    },
    {
      id: '2',
      img: ItemImage2,
      author: 'Иван',
      date: new Date().toJSON(),
      checked: true,
      avatarColor: '#5EB0DE',
      title: 'Картер ЯМЗ-650.10 маховик...',
      message: 'Да, мы можем сделать так ...'
    },
    {
      id: '1',
      img: ItemImage,
      author: 'Сергей',
      date: new Date().toJSON(),
      checked: false,
      avatarColor: '#FF8F51',
      title: 'Шестерня ведущая привод...',
      message: 'Здравствуйте. Подскажите ...'
    },
  ]

// drupal & REST API
 export const MESSAGES = [
    {
      id: '1',
      from: 'Покупатель',
      to: 'Виктор',
      message: 'Здравствуйте. Подскажите, пожалуйста, есть ли в комплекте все необходимое для замены (в другом таком комплекте пришлось докупать фазовращатели)? '
    },
    {
      id: '2',
      from: 'Виктор',
      to: 'Покупатель',
      message: 'Добрый день!'
    }
    ,
    {
      id: '3',
      from: 'Виктор',
      to: 'Покупатель',
      message: 'Здравствуйте! Я хочу посмотреть этот товар'
    }
    ,
    {
      id: '4',
      from: 'Виктор',
      to: 'Покупатель',
      message: 'Здравствуйте! Я хочу посмотреть этот товар'
    }
    ,
    {
      id: '5',
      from: 'Покупатель',
      to: 'Виктор',
      message: 'Здравствуйте! Я хочу посмотреть этот товар'
    }
  ]