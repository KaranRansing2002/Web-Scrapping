const request=require("request");
const cheerio=require("cheerio");
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
            console.log(winTeam);
        }
    }
    let inngArr=$(".card.content-block.match-scorecard-table>.Collapsible");
    let htmlStr="";
    for(let i=0;i<inngArr.length;i++){
        let inngEl=$(inngArr[i]).find(".header-title.label");
        let team=inngEl.text();
        team=team.split("INNINGS")[0];
        team=team.trim();
        if(team==winTeam){
            let bowlTable=$(inngArr[i]).find(".table.bowler");
            let row=$(bowlTable).find("tr");
            let bowler=""; 
            let wickets=0;
            for(let j=0;j<row.length;j++){
                let allCol=$(row[j]).find("td");
                let name=$(allCol[0]).text();
                let num=$(allCol[4]).text();
                if(num>=wickets){
                    bowler=name;
                    wickets=num;
                }
            }
            console.log(bowler," : ",wickets);
        }
    }
    //console.log(htmlStr);
    
}