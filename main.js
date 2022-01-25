const fs=require("fs");
const request =require("request");
const cheerio=require("cheerio");
const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";

request(url,cb);

function cb(err,response,html){
    if(err){
        console.log("err",err);
        return;
    }
    else{
        extractLink(html);
    }
}

function extractLink(html){
    let $= cheerio.load(html);
    let anchorElem=$('a[data-hover="View All Results"]');
    let link="https://www.espncricinfo.com"+anchorElem.attr("href");
    //console.log(link);
    getAllMatchesLink(link);
}

function getAllMatchesLink(url){
    request(url,function(err,response,html){
        if(err){
            console,log(err);
        }
        else{
            extractAllLink(html)
        }
    })
}
function extractAllLink(html){
    let $=cheerio.load(html);
    let scorecardElem=$('a[data-hover="Scorecard"]');
    for(let i=0;i<scorecardElem.length;i++){
        let link="https://www.espncricinfo.com"+$(scorecardElem[i]).attr("href");
        console.log(link);
    }
}


