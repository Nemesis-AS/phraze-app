import moment from "moment";
function getReadableDate(timestamp) {
  var date = new Date();
  var currentDate = Number(date.getDate());
  var currentYear = Number(date.getFullYear());
  var currentMonth = Number(date.getMonth()) + 1;

  var currentHour = Number(date.getHours());
  var currentMinute = Number(date.getMinutes);

  var timestampMoment = moment(Math.round(timestamp / 1e6))
    .format()
    .split("T");
  var readableTimeStamp = moment(Math.round(timestamp / 1e6)).format(
    "DD-MM-YYYY h:mm:ss"
  );

  var timeStampDate = Number(timestampMoment[0].split("-")[2]);
  var timeStampMonth = Number(timestampMoment[0].split("-")[1]);
  var timeStampYear = Number(timestampMoment[0].split("-")[0]);

  var timeStampHour = Number(timestampMoment[1].split(":")[0]);
  var timeStampMinute = Number(timestampMoment[1].split(":")[1]);
  if (currentYear > timeStampYear) {
    return {
      readableTime: readableTimeStamp,
      timeDiff: `${currentYear - timeStampYear} year${
        currentYear - timeStampYear === 1 ? "" : "s"
      } ago`,
    };
  } else if (currentYear === timeStampYear) {
    if (currentMonth > timeStampMonth) {
      return {
        readableTime: readableTimeStamp,
        timeDiff: `${currentMonth - timeStampMonth} month${
          currentMonth - timeStampMonth === 1 ? "" : "s"
        } ago`,
      };
    } else if (currentMonth === timeStampMonth) {
      if (currentDate > timeStampDate) {
        if (currentDate - timeStampDate === 1) {
          var hourDifference = currentHour - timeStampHour;
          if (hourDifference < 0) {
            return {
              readableTime: readableTimeStamp,
              timeDiff: `${24 + hourDifference} hours ago`,
            };
          } else {
            return {
              readableTime: readableTimeStamp,
              timeDiff: `${currentDate - timeStampDate} day${
                currentDate - timeStampDate === 1 ? "" : "s"
              } ago`,
            };
          }
        }
      } else if (currentDate === timeStampDate) {
        if (currentHour > timeStampHour) {
          return {
            readableTime: readableTimeStamp,
            timeDiff: `${currentHour - timeStampHour} hour${
              currentHour - timeStampHour === 1 ? "" : "s"
            } ago`,
          };
        } else if (currentHour === timeStampHour) {
          if (currentMinute > timeStampMinute) {
            return {
              readableTime: readableTimeStamp,
              timeDiff: `${currentMinute - timeStampMinute} minute${
                currentMinute - timeStampMinute === 1 ? "" : "s"
              } ago`,
            };
          } else {
            return {
              readableTime: readableTimeStamp,
              timeDiff: `1 minute ago`,
            };
          }
        }
      }
    }
  }

  return {
    readableTime: readableTimeStamp,
    timeDiff: `null minute ago`,
  };
}

export default getReadableDate;
