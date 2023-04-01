
export function exportParty(party) {
    var json;

    json = '{"timeCalcul":'+party.timeCalcul+',"damageLineId":'+party.damageLine.damageLineIndex+', "players":[';

    party.players.forEach((pInfo, key) => {
        json += '{"index":'+key+', "cumulatedShield":'+pInfo.cumulatedShield+
        ', "cumulatedPhyMitig":'+pInfo.cumulatedPhyMitig+
        ', "cumulatedMagMitig":'+pInfo.cumulatedMagMitig+
        ', "parryRate":'+pInfo.parryRate+ ',"player":{"job":"'+pInfo.p.job.name+
        '","hp":'+pInfo.p.hp+',"mp":'+pInfo.p.mp+',"wd":'+pInfo.p.wd+
        ',"det":'+pInfo.p.det+',"mainstat":'+pInfo.p.mainstat+
        ',"name":"'+pInfo.p.name+'"';


        var head = pInfo.p.record.head;
    
        json+=',"record":['

        if (!head) {
            json +=','
        }
        while (head) {
          json += '{"target":'
          json += head.getTarget()? '"'+head.getTarget().name+'"' :'null';
          json +=',"buff":"'+head.getBuff().name+
          '","time":'+head.time+'},'
            
            
            head = head.next;
        }

        json = json.substring(0,json.length-1);
        json +="]}";
        


        
        json +="},"
    });
    json = json.substring(0,json.length-1);
    
    json+="]}"


    return json;
}

export function exportPlayer(player) {
    var json;


    json = '{"job":"'+player.job.name+
    '","hp":'+player.hp+',"mp":'+player.mp+',"wd":'+player.wd+
    ',"det":'+player.det+',"mainstat":'+player.mainstat+
    ',"name":"'+player.name+'"';


    var head = player.record.head;

    json+=',"record":['

    if (!head) {
        json +=','
    }
    while (head) {
      json += '{"target":'
      json += head.getTarget()? '"'+head.getTarget().name+'"' :'null';
      json +=',"buff":"'+head.getBuff().name+
      '","time":'+head.time+'},'
        
        
        head = head.next;
    }

    json = json.substring(0,json.length-1);
    json +="]}";
    


    return json;
}