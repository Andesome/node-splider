const http = require("http");
const cheerio = require('cheerio');
const fs = require('fs');


const url = 'http://blog.liaolunling.top/page/';
let articleIdx = 1;

let i = 1;
while(i<10){
  fetchPage(url,i);
  i++;
}


function writeResult(data){
  fs.stat('./logs.txt', function (err, stat) {
    if (stat && stat.isFile()) {
      // console.log('文件存在');
      fs.appendFile('./logs.txt', data, 'utf8', function (err) {
        if (err) {
          console.log(err);
        }
      });
  
    } else {
      console.log('文件不存在或不是标准文件');
      fs.open("./logs.txt", "w", (err) => {
        if (err) {
          console.log('写入失败', err)
        } else {
          console.log('文件创建成功')
        }
      });
    }
  })
}

// let i = 1;
// while(i<100){
//   fetchPage(url,i);
//   i++;
// }

function fetchPage(url, page) {
  // console.log('-------------------', url + page)
  http.get(url + page, (res) => {
    let data = "";

    // A chunk of data has been recieved.
    res.on('data', (chunk) => {
      data += chunk;
    })


    res.on('end', () => {
      // console.log(data);
      analyzeHtml(data);
    })

  }).on('error', (err) => {
    console.log('Error:' + err.message);
  })
}


function analyzeHtml(html) {
  const $ = cheerio.load(html);
  const $postTitle = $('.post_title');  //article title
  let str = '';
  // console.log($postTitle.length);
  for (let i = 0; i < $postTitle.length; i++) {
    const $postTitleItem = $($postTitle[i]);
    str += articleIdx + '：' + $postTitleItem.text() + ' 文章地址：' + $postTitleItem.find('a').attr('href') + '\r\n';
    articleIdx += 1;
  }
  console.log(str);
  writeResult(str);
}