import {
  dataSectionatorByAvatar,
  dataSectionatorByDate,
} from "../store/reducers/chat";
import { chatReducer } from "../store/reducers/chat";

const initialState = {
  allMessages: [],
  chatStatus: {},
};

const more_payload = [
  {
    id: "2199",
    author_uid: "5",
    text: "4",
    created: "2023-09-06 19:36:36",
    chat_id: "223",
    status: "3",
    author_message: {
      uid: "5",
      name: "stayhere",
      avatar_bgcolor: "#fd7e14",
      avatar:
        "http://chat.algusdev.ru/sites/default/files/2023-09/1679621152_phonoteka-org-p-mister-vait-oboi-instagram-38.jpg",
      avatar_letter: "S",
      last_online: "2023-09-29 14:11:53",
    },
    adv: {
      id: "11",
      title: "VW Polo 2023 ",
      img: "http://chat.algusdev.ru/sites/default/files/2023-06/90AAAgK7P2A-1920.jpg",
      author: {
        uid: "5",
        name: "stayhere",
        avatar_bgcolor: "#fd7e14",
        avatar:
          "http://chat.algusdev.ru/sites/default/files/2023-09/1679621152_phonoteka-org-p-mister-vait-oboi-instagram-38.jpg",
        avatar_letter: "S",
        last_online: "2023-09-29 14:11:53",
      },
    },
  },
  {
    id: "2200",
    author_uid: "4",
    text: "5",
    created: "2023-09-07 19:37:15",
    chat_id: "223",
    status: "3",
    author_message: {
      uid: "4",
      name: "stayhere",
      avatar_bgcolor: "#fd7e14",
      avatar:
        "http://chat.algusdev.ru/sites/default/files/2023-09/1679621152_phonoteka-org-p-mister-vait-oboi-instagram-38.jpg",
      avatar_letter: "S",
      last_online: "2023-09-29 14:11:53",
    },
    adv: {
      id: "11",
      title: "VW Polo 2023 ",
      img: "http://chat.algusdev.ru/sites/default/files/2023-06/90AAAgK7P2A-1920.jpg",
      author: {
        uid: "4",
        name: "stayhere",
        avatar_bgcolor: "#fd7e14",
        avatar:
          "http://chat.algusdev.ru/sites/default/files/2023-09/1679621152_phonoteka-org-p-mister-vait-oboi-instagram-38.jpg",
        avatar_letter: "S",
        last_online: "2023-09-29 14:11:53",
      },
    },
  },
];

const payload = [
  {
    id: "2201",
    author_uid: "4",
    text: "6",
    created: "2023-09-07 19:38:15",
    chat_id: "223",
    status: "3",
    author_message: {
      uid: "4",
      name: "stayhere",
      avatar_bgcolor: "#fd7e14",
      avatar:
        "http://chat.algusdev.ru/sites/default/files/2023-09/1679621152_phonoteka-org-p-mister-vait-oboi-instagram-38.jpg",
      avatar_letter: "S",
      last_online: "2023-09-29 14:11:53",
    },
    adv: {
      id: "11",
      title: "VW Polo 2023 ",
      img: "http://chat.algusdev.ru/sites/default/files/2023-06/90AAAgK7P2A-1920.jpg",
      author: {
        uid: "5",
        name: "stayhere",
        avatar_bgcolor: "#fd7e14",
        avatar:
          "http://chat.algusdev.ru/sites/default/files/2023-09/1679621152_phonoteka-org-p-mister-vait-oboi-instagram-38.jpg",
        avatar_letter: "S",
        last_online: "2023-09-29 14:11:53",
      },
    },
  },
  {
    id: "2202",
    author_uid: "5",
    text: "7",
    created: "2023-09-08 19:39:22",
    chat_id: "223",
    status: "3",
    author_message: {
      uid: "5",
      name: "stayhere",
      avatar_bgcolor: "#fd7e14",
      avatar:
        "http://chat.algusdev.ru/sites/default/files/2023-09/1679621152_phonoteka-org-p-mister-vait-oboi-instagram-38.jpg",
      avatar_letter: "S",
      last_online: "2023-09-29 14:11:53",
    },
    adv: {
      id: "11",
      title: "VW Polo 2023 ",
      img: "http://chat.algusdev.ru/sites/default/files/2023-06/90AAAgK7P2A-1920.jpg",
      author: {
        uid: "5",
        name: "stayhere",
        avatar_bgcolor: "#fd7e14",
        avatar:
          "http://chat.algusdev.ru/sites/default/files/2023-09/1679621152_phonoteka-org-p-mister-vait-oboi-instagram-38.jpg",
        avatar_letter: "S",
        last_online: "2023-09-29 14:11:53",
      },
    },
  },
];

test("LOAD_MESSAGES", () => {
  const state = chatReducer(initialState, { type: "LOAD_MESSAGES", payload });
  const new_messages = [
    {
      chat_id: payload[0].chat_id,
      messages: dataSectionatorByDate(payload),
    },
  ];
  const new_state = {
    allMessages: new_messages,
    chatStatus: {},
  };
  expect(state).toEqual(new_state);
});

test("LOAD_MORE_MESSAGES", () => {
  const first_state = chatReducer(initialState, {
    type: "LOAD_MESSAGES",
    payload,
  });

  expect(first_state.allMessages[0].messages.length).toEqual(2);

  const state = chatReducer(first_state, {
    type: "LOAD_MORE_MESSAGES",
    payload: more_payload,
  });

  console.log(JSON.stringify(state, null, 2));

  expect(state.allMessages[0].messages[1].data.length).toEqual(2);
});
