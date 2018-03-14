const http = require("http");
const cheerio = require('cheerio');

const url = 'http://blog.liaolunling.top/page/';



let i = 1;
while(i<100){
  fetchPage(url,i);
  i++;
}

function fetchPage(url, page) {
  console.log('-------------------',url+page)
  http.get(url+page, (res) => {
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
  console.log($postTitle.length);
  for (let i = 0; i < $postTitle.length; i++) {
    const $postTitleItem = $($postTitle[i]);
    console.log(i + 1, $postTitleItem.text(), $postTitleItem.find('a').attr('href'))
  }

}