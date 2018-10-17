import fs from "fs";
import path from "path";
import axios from "axios";
import cheerio from "cheerio";

const dataDir = `${__dirname}/fakeStackOverflowData`;

let data = [];

fs.readdirSync(dataDir).forEach(file => {
  if (file[0] === "q") {
    data = data.concat(require(path.join(dataDir, file)));
  }
});

//console.log(data[0]);

const getBody = async () => {
  console.log('starting scraper...')
  var results = [];
  let id = 1;
  for (const question of data) {
    try {
      var res = await axios.get(question.link);
      var title = question.title
      var $ = cheerio.load(res.data);
    } catch (err) {
      console.log('error on axios request exiting loop...')
      break;
    }
    console.log('scraping new title ' + `${title}`);
    //console.log(question.link);
    //console.log( $('.post-text'));
    let newPost = [];
    let PostId = 1;
    let bounty;
    let comments = 0;
    $(".post-text").each(function(i, elem) {
      let post = {}
      
      if (i === 0) {
        console.log('new question id ' + id)
        post.body = $(this).text();
        post.title = title
        post.id = id;
        PostId = id;
        post.PostTypeId = 1
        post.bounty = Math.random()
        bounty = post.bounty
        post.UserId = Math.ceil(Math.random() * 100)
        post.viewCount = Math.ceil(Math.random() * 10);
        post.upvoteCount = Math.ceil(Math.random() * 40)
      } else {
        console.log('new answer id ' + id + ' for question ' + PostId)
        post.body = $(this).text();
        post.id = id;
        post.PostTypeId = 2;
        post.PostId = PostId
        post.bounty = bounty;
        post.UserId = Math.ceil(Math.random() * 100);
        post.upvoteCount = Math.ceil(Math.random() * 40);
        comments++;
      }
      newPost.push(post)
      console.log(newPost)
      id++;
    });
    newPost[0].comments = comments;

    console.log('adding newPost to results..,')
    results = [...results, ...newPost]
    //break
    console.log(`Finish question ${title}...`)
  }
  
  results = JSON.stringify(results);

  console.log('writing to file...')
  try {
    fs.writeFileSync(`./src/server/utils/scrapedText/text.json`, results);
    console.log('success')
    console.log('finished')
  } catch (err) {
    console.log("error writing file", err);
    return;
  }
};

getBody()