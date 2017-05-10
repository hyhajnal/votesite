export default (values) => {
  let voteform = {};
  const titles = [];
  const descs = [];
  const pics = [];
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
    } else if ((/time/).test(key)) {
      create_time = new Date(values[key][0]);
      end_time = new Date(values[key][1]);
    } else if (!(/keys/).test(key)) {
      voteform = { ...voteform, [key]: values[key] };
    }
  }
  titles.forEach((title, i) => {
    votelist.push({
      title, desc: descs[i], pic: pics[i], num: 0,
    });
  });
  voteform = { ...voteform, votelist, create_time, end_time };
  console.log(voteform);
  return voteform;
};
