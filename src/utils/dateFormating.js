const dateOptions = {
  day: "numeric",
  month: "short",
};
const timeOptions = {
  hour: "numeric",
  minute: "numeric",
};

function getWeekDay(date) {
  let days = ["Вc", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

  return days[date.getDay()];
}

export function getFormattedLastMessageDate(last_date) {
  const date = new Date(Date.parse(last_date));
  const nowDate = new Date();

  if (nowDate.getDate() === date.getDate()) {
    return date.toLocaleTimeString("ru", timeOptions);
  } else if (
    nowDate.getDate() - 1 === date.getDate()
  ) {
    return "Вчера"
  } else if (
    nowDate.getDate() - 7 < date.getDate()
  ) {
    return getWeekDay(date)
  } else {
    const tmp = date.toLocaleDateString("ru", dateOptions);
    return tmp.slice(0, tmp.length);
  }
}

export const getFormattedUserLastSeen = (last_online) => {
  const date = new Date(Date.parse(last_online));
  const nowDate = new Date(Date.now());

  if (nowDate.getDate() === date.getDate()) {
    return "сегодня в " + date.toLocaleTimeString("ru", timeOptions);
  } else if (
    nowDate.getDate() - 1 === date.getDate()
  ) {
    return "вчера в " + date.toLocaleTimeString("ru", timeOptions);
  } else {
    const tmp = date.toLocaleDateString("ru", dateOptions);
    return tmp.slice(0, tmp.length - 1);
  }
};

export const getFormattedDateForMessageList = (created) => {
  const options = {
    day: "numeric",
    month: "long",
  };
  return new Date(Date.parse(created)).toLocaleDateString("ru", options);
};

export const dateTest = () => {
  let last_message_date = getFormattedUserLastSeen("2023-08-22T12:01:00");
  console.log("TEST 1: сегодня в 12:01 =", last_message_date);

  last_message_date = getFormattedUserLastSeen("2023-08-21T12:52:00");
  console.log("TEST 2: вчера 12:52 =", last_message_date);

  last_message_date = getFormattedUserLastSeen("2023-08-09T11:01:00");
  console.log("TEST 3: 9 авг =", last_message_date);

  // let last_message_date = getFormattedLastMessageDate("2023-08-19T15:01:00");
  // console.log("TEST 1: Сб =", last_message_date);

  // last_message_date = getFormattedLastMessageDate("2023-08-21T11:59:00");
  // console.log("TEST 2: Вчера =", last_message_date);

  // last_message_date = getFormattedLastMessageDate("2023-08-22T15:59:00");
  // console.log("TEST 3: 15:59 =", last_message_date);

  // last_message_date = getFormattedLastMessageDate("2023-08-15T11:59:00");
  // console.log("TEST 4: 15 авг =", last_message_date);
};

