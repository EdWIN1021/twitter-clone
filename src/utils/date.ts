import moment from "moment";

export const getDateRange = (date: Date) => {
  const duration: moment.Duration = moment.duration(
    moment().diff(moment(date)),
  );
  if (Number(duration.asSeconds().toFixed(0)) < 60) {
    return `${Number(duration.asSeconds().toFixed(0))}s`;
  } else if (Number(duration.asMinutes().toFixed(0)) < 60) {
    return `${Number(duration.asMinutes().toFixed(0))}m`;
  } else if (Number(duration.asHours().toFixed(0)) < 24) {
    return `${Number(duration.asHours().toFixed(0))}h`;
  } else if (Number(duration.asDays().toFixed(0)) < 30) {
    return `${Number(duration.asDays().toFixed(0))}d`;
  } else if (Number(duration.asMonths().toFixed(0)) < 12) {
    return `${Number(duration.asMonths().toFixed(0))}m`;
  } else {
    return `${Number(duration.asYears().toFixed(0))}y`;
  }
};
