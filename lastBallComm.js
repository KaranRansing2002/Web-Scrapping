const request=require("request");
const cheerio=require("cheerio");
const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary";

console.log("Before");
request(url,cb);

function cb(err,response,html){
    if(err){
        console.log(err);
    }
    else{
        extractHtml(html);
    }
}

function extractHtml(html){
    let $=cheerio.load(html);
    let contentArr=$(".d-flex.match-comment-padder.align-items-center .match-comment-long-text");
    let text=$(contentArr[0]).text();
    let htmlCont=$(contentArr[0]).html();
    console.log("text",text);
    console.log("html data : ",htmlCont);
}