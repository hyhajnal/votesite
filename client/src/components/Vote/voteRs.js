import moment from 'moment';

export const createFormat = (values, edit) => {
  let voteform = {};
  const titles = [];
  const descs = [];
  const pics = [];
  const items = [];
  const votelist = [];
  let create_time;
  let end_time;

  for (const key in values) {
    if ((/title\d/).test(key)) {
      titles.push(values[key]);
    } else if ((/desc\d/).test(key)) {
      descs.push(values[key]);
    } else if ((/pic\d/).test(key)) {
      pics.push(values[key]);
    } else if ((/item\d/).test(key)) {
      items.push(values[key]);
    } else if ((/time/).test(key)) {
      create_time = new Date(values[key][0]);
      end_time = new Date(values[key][1]);
    } else if (!(/keys/).test(key)) {
      voteform = { ...voteform, [key]: values[key] };
    }
  }

  if (!edit) {
    titles.forEach((title, i) => {
      votelist.push({
        title, desc: descs[i], pic: pics[i], num: 0,
      });
    });
  } else {
    items.forEach((item, i) => {
      votelist.push({ ...item, title: titles[i], desc: descs[i], pic: pics[i] });
    });
  }
  voteform = { ...voteform, votelist, create_time, end_time };
  console.log(voteform);
  return voteform;
};

export const editFormat = (vote) => {
  const keys = [];
  let voteEdit = {
    title: { value: vote.title },
    desc: { value: vote.desc },
    tag: { value: vote.tag },
    multi: { value: vote.multi },
    time: { value: [moment(vote.create_time, 'YYYY-MM-DD'), moment(vote.end_time, 'YYYY-MM-DD')] },
  };
  vote.votelist.forEach((item, i) => {
    keys.push(i);
    voteEdit = { ...voteEdit,
      [`title${i}`]: { value: item.title },
      [`desc${i}`]: { value: item.desc },
      [`pic${i}`]: { value: item.pic },
      [`item${i}`]: { value: item } };
  });
  voteEdit = { ...voteEdit, keys: { value: keys } };
  console.log(voteEdit);
  return voteEdit;
};

