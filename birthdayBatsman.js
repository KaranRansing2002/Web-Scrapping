const request=require("request");
const cheerio=require("cheerio");
const { get } = require("request");
const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";

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
    let teamsArr=$(".match-info.match-info-MATCH .team");
    let winTeam='';
    for(let i=0;i<teamsArr.length;i++){
        let hasclass=$(teamsArr[i]).hasClass("team-gray");
        if(hasclass==false){
            let teamName=$(teamsArr[i]).find(".name");
            winTeam=teamName.text().trim();
            //console.log(winTeam);
        }
    }
    let inngArr=$(".card.content-block.match-scorecard-table>.Collapsible");
    let htmlStr="";
    for(let i=0;i<inngArr.length;i++){
        let inngEl=$(inngArr[i]).find(".header-title.label");
        let team=inngEl.text();
        team=team.split("INNINGS")[0];
        team=team.trim();
        let batsmanTable=$(inngArr[i]).find(".table.batsman");
        let row=$(batsmanTable).find("tr");
        for(let j=0;j<row.length;j++){
            let allCol=$(row[j]).find("td");
            let isBatsManCol=$(allCol[0]).hasClass("batsman-cell");

            if(isBatsManCol){
                let href= $(allCol[0]).find("a").attr("href");
                let name=$(allCol[0]).text();
                let link="https://www.espncricinfo.com/"+href;
                getBirthdays(link,team,name);
            }
        }
        //console.log(bowler," : ",wickets); 
    }
    //console.log(htmlStr);
    
}
function getBirthdays(link,team,name){
    request(link,cb);
    function cb(err,response,html){
        if(err){
            return;
        }
        else{
            extractBirthdays(team,name,html);
        }
    }
}

function extractBirthdays(team,name,html){
    let $=cheerio.load(html);
    let bornArr=$(".player_overview-grid .player-card-description ");
    let birthdate=$(bornArr[1]).text();
    console.log(`team : ${team} player name : ${name} birthdate : ${birthdate}`);
}