const fs = require("fs");

// your path file
const pathFollowing = `${__dirname}/connections/followers_and_following/following.json`;
const pathFollowers = `${__dirname}/connections/followers_and_following/followers_1.json`;

let dataFollowing, dataFollowers;

const getData = (data, type) => {
  const users = data.map((val) => {
    return val.string_list_data[0].href;
  });

  if (type === "following") {
    dataFollowing = users;
  } else {
    dataFollowers = users;
  }
};

const getUnfollowData = () => {
  let dataUnfollow = [];

  dataFollowing.forEach((value) => {
    if (!dataFollowers.includes(value)) {
      dataUnfollow.push(value);
    }
  });

  console.log(JSON.stringify(dataUnfollow, null, 2));
  return dataUnfollow;
};

const processFile = (filePath, key, type) => {
  fs.readFile(filePath, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    const data = JSON.parse(result);
    const inputData = key ? data[key] : data;
    getData(inputData, type);
  });
};

// Proses file following
processFile(pathFollowing, "relationships_following", "following");

// Proses file followers
processFile(pathFollowers, null, "followers");

// Show unfollow data
setTimeout(() => {
  getUnfollowData();
}, 1200);
