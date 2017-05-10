import moment from 'moment';

export default (time, flag) => {
  const y = parseInt(moment(time).format('YYYY'), 10);
  const m = parseInt(moment(time).format('MM'), 10);
  const d = parseInt(moment(time).format('DD'), 10);
  const h = parseInt(moment(time).format('HH'), 10);
  const mm = parseInt(moment(time).format('MM'), 10);
  const s = parseInt(moment(time).format('SS'), 10);
  return parseInt(moment(new Date()).format('YYYY'), 10) - y < 5 && !flag ?
  moment([y, m, d, h, mm, s]).fromNow() :
  moment(time).format('YYYY-MM-DD hh时');
};
