import { getFormattedDateForMessageList } from "./dateFormating";

const sectionateDataByAvatar = (data) => {
    let DATA = [];
    let author;
    let prevAuthor;
    let partMessages = [];
  
    data.map((value, index) => {
      author = value?.author_message?.uid;
      if (index === 0) {
        partMessages.push(value);
      } else {
        if (author === prevAuthor) {
          partMessages.push(value);
        } else {
          DATA.push({ title: prevAuthor, data: partMessages });
          partMessages = [];
          partMessages.push(value);
        }
      }
      prevAuthor = author;
  
      if (data.length - 1 === index) {
        DATA.push({ title: prevAuthor, data: partMessages });
      }
    });
    return DATA;
  };

export const sectionateDataByDate = (data) => {
    let DATA = [];
    let date;
    let prevDate;
    let partMessages = [];
  
    const pushToArray = (arr, _date) => {
      const sectionatedDataByAvatar = sectionateDataByAvatar(partMessages);
      arr.push({ title: _date, data: sectionatedDataByAvatar });
    };
  
    data.map((msg, i) => {
      date = getFormattedDateForMessageList(msg.created);
      if (i === 0) partMessages.push(msg);
      else {
        if (date === prevDate) {
          partMessages.push(msg);
        } else {
          pushToArray(DATA, prevDate);
          partMessages = [];
          partMessages.push(msg);
        }
      }
      prevDate = date;
  
      if (data.length - 1 === i) {
        pushToArray(DATA, prevDate);
      }
    });
  
    return [...DATA];
  };