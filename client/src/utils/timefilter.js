import moment from 'moment';

export default (time, flag) => {
  const y = moment(time).format('YYYY');
  const m = moment(time).format('MM');
  const d = moment(time).format('DD');
  const h = moment(time).format('HH');
  const mm = moment(time).format('mm');
  const s = moment(time).format('ss');
  return parseInt(moment(new Date()).format('YYYY'), 10) - parseInt(y, 10) < 5 && !flag ?
  moment(`${y}${m}${d}${h}${mm}${s}`, 'YYYYMMDDHHmmss').fromNow() :
  moment(time).format('YYYY-MM-DD hh时');
};
