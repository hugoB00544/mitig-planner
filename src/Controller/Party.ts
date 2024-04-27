import { ActionNode } from "./ActionNode";
import { DamageLine } from "./DamageLine";
import { Player } from "./Player";

export class Party {
    static _gPartyIndex: number = 0;
    readonly partyIndex: number;
     players: Map<number,{ p: Player; cumulatedShield: number; cumulatedPhyMitig: number; cumulatedMagMitig: number; parryRate: number; }>;
     timeCalcul: number;
     damageLine:DamageLine;
    /**
     *
     */
    constructor(players:Map<string,Player>, damageLine: DamageLine) {
        this.partyIndex = Party._gPartyIndex;
        this.players = new Map<number,{ p: Player; cumulatedShield: number; cumulatedPhyMitig: number; cumulatedMagMitig: number; parryRate: number; }>()
        players.forEach((p: Player, key: string) => {
            this.players.set(p.pIndex,{ p: p, cumulatedShield:0 , cumulatedPhyMitig:0 , cumulatedMagMitig:0 , parryRate: 0 })
        });
        Party._gPartyIndex++;
        this.damageLine = damageLine;
        this.timeCalcul = 0;
    }

    
    public getPartyIndex(){return this.partyIndex;}

    /**
     * setRecord
     */
    public setPlayer(player: Player) {
        this.players.forEach((value: any, key: number) => {
            
            if (value.p.pIndex === player.pIndex) {
                let playerInfo = {p:player, cumulatedShield: 0, cumulatedPhyMitig: 0, cumulatedMagMitig: 0, parryRate: 0 };
                this.players.set(key,playerInfo);
            }
        });
        
    }

    public setPlayers(players:Map<string,Player>) {
        this.players = new Map<number,{ p: Player; cumulatedShield: number; cumulatedPhyMitig: number; cumulatedMagMitig: number; parryRate: number; }>()
        players.forEach((p: Player, key: string) => {
            this.players.set(p.pIndex,{ p: p, cumulatedShield:0 , cumulatedPhyMitig:0 , cumulatedMagMitig:0 , parryRate: 0 })
        });
        
    }

    public setDamageLine(damageLine: DamageLine) {
        this.damageLine = damageLine;
        
    }

    /**
     * getPlayer
pPos: string     */
    public getPlayer(pId: number) {
        if (this.players.has(pId)) {
            return this.players.get(pId);
        }else{
            return null;
        }
        
    }

    public getPlayerShield(player: Player) {
        
                return this.players.get(player.pIndex)?.cumulatedShield;
                
    }


    /**
     * getGlobalLastActionTime
     */
    public getGlobalLastActionTime() {
        var time = 0;
        this.players.forEach((p: any, key: number) => {
            let timeP = p.p.record.getLastTime();
            if (timeP > time) {
                time = timeP
            }
        });
        return time;
    }


    public setTimeCalcul(time:number) {
        this.timeCalcul = Math.round(time*100)/100
    }

    public updateStatPlayer(player: Player) {

        
        var listAppliedBuffs = this.getTimeBuffWithoutDouble(player);


                this.players.get(player.pIndex)!.cumulatedShield = 0;
                this.players.get(player.pIndex)!.cumulatedPhyMitig = 0;
                this.players.get(player.pIndex)!.cumulatedMagMitig = 0;
                this.players.get(player.pIndex)!.parryRate = 0;
                this.players.get(player.pIndex)!.p.hp = 0;
            
        
        

        
        listAppliedBuffs.forEach((actionInfo: {action:ActionNode,player:Player}, key: string) => {
            
            if (actionInfo.action.getReducedMaxHp()>0) {
                this.players.get(player.pIndex)!.cumulatedShield += Math.floor(actionInfo.player.hp*(actionInfo.action.getReducedMaxHp()/100));
        
            }

            if (actionInfo.action.getPotency()>0) {

                let mainstat = Math.floor(actionInfo.player.mainstat*(1+(0.01*5)));
                let shield = Math.floor(actionInfo.action.getPotency()*(Math.floor(((390*115)/1000))+actionInfo.player.wd)*((100+Math.floor(((mainstat-390)*569/1522)))/100));
                shield = Math.floor(shield*((1000+ Math.floor((140*(actionInfo.player.det-390)/1900)))/1000));
                shield = Math.floor(shield *(1000+Math.floor((130*(400-400)/1900)))/1000/100);

                if (actionInfo.player.job.name === "AST" || actionInfo.player.job.name === "WHM" || actionInfo.player.job.name === "SGE" || actionInfo.player.job.name === "SCH" ||
                actionInfo.player.job.name === "BLM" || actionInfo.player.job.name === "RDM" || actionInfo.player.job.name === "SMN") {
                    shield = Math.floor(shield*1.3);
                }
                
                if(actionInfo.action.getType() === "Mitig"){
                    this.players.get(player.pIndex)!.cumulatedShield += shield;
                }else if (actionInfo.action.getType() === "Heal") {
                    this.players.get(player.pIndex)!.p.hp += shield;
                    if(this.players.get(player.pIndex)!.p.hp >this.players.get(player.pIndex)!.p.maxhp){
                        this.players.get(player.pIndex)!.p.hp = this.players.get(player.pIndex)!.p.maxhp;
                    } 
                }

            }

            if (actionInfo.action.getReducedPhysic()>0) {
                if (key === 'Intervention') {
                    if ((listAppliedBuffs.has("Sentinel")&& listAppliedBuffs.get("Sentinel")!.action.time<actionInfo.action.time) || 
                    (listAppliedBuffs.has("Rampart") && listAppliedBuffs.get("Rampart")!.action.time<actionInfo.action.time)) {
                        this.players.get(player.pIndex)!.cumulatedPhyMitig = Math.round((100-(((100-this.players.get(player.pIndex)!.cumulatedPhyMitig)/100)* ((100-actionInfo.action.getReducedPhysic())/100))*100)*1000)/1000;
                        this.players.get(player.pIndex)!.cumulatedPhyMitig = Math.round((100-(((100-this.players.get(player.pIndex)!.cumulatedPhyMitig)/100)* ((100-actionInfo.action.getReducedPhysic())/100))*100)*1000)/1000;
                    }else{
                        this.players.get(player.pIndex)!.cumulatedPhyMitig = Math.round((100-(((100-this.players.get(player.pIndex)!.cumulatedPhyMitig)/100)* ((100-actionInfo.action.getReducedPhysic())/100))*100)*1000)/1000;
        
                    }
                }else{
                    this.players.get(player.pIndex)!.cumulatedPhyMitig = Math.round((100-(((100-this.players.get(player.pIndex)!.cumulatedPhyMitig)/100)* ((100-actionInfo.action.getReducedPhysic())/100))*100)*1000)/1000;
        
                }
                
            }

            if (actionInfo.action.getReducedMagic()>0) {
                if (key === 'Intervention') {
                    if ((listAppliedBuffs.has("Sentinel")&& listAppliedBuffs.get("Sentinel")!.action.time<actionInfo.action.time) || 
                    (listAppliedBuffs.has("Rampart") && listAppliedBuffs.get("Rampart")!.action.time<actionInfo.action.time)
                    ) {
                        this.players.get(player.pIndex)!.cumulatedMagMitig = Math.round((100-(((100-this.players.get(player.pIndex)!.cumulatedMagMitig)/100) *((100-actionInfo.action.getReducedMagic())/100))*100)*1000)/1000;
        
                        this.players.get(player.pIndex)!.cumulatedMagMitig = Math.round((100-(((100-this.players.get(player.pIndex)!.cumulatedMagMitig)/100) *((100-actionInfo.action.getReducedMagic())/100))*100)*1000)/1000;
                    }else{
                        this.players.get(player.pIndex)!.cumulatedMagMitig = Math.round((100-(((100-this.players.get(player.pIndex)!.cumulatedMagMitig)/100) *((100-actionInfo.action.getReducedMagic())/100))*100)*1000)/1000;
        
                    }
                }else{
                    this.players.get(player.pIndex)!.cumulatedMagMitig = Math.round((100-(((100-this.players.get(player.pIndex)!.cumulatedMagMitig)/100) *((100-actionInfo.action.getReducedMagic())/100))*100)*1000)/1000;
        
                }
                
            }

            if (actionInfo.action.getParryRate()>0) {
                this.players.get(player.pIndex)!.parryRate += actionInfo.action.getParryRate();
        
            }
            }
        );
        
        
    }


    public getTimeBuffWithoutDouble(player: Player) {

        var listAppliedBuffs = new Map<string,{action:ActionNode,player:Player}>()


        this.players.forEach((p: any, key: number) => {
            
            let head = p.p.record.head;
            
            if (p.p.record.head) {
            
                while (head) {
                    if (head.time + head.getDuration() >= this.timeCalcul &&  head.time <= this.timeCalcul) {
                        if (head.groupedMitig() || 
                        (head.getTarget() ===player && head.targetable()) || 
                        (!head.groupedMitig() && !head.targetable() && p.p.pIndex === player.pIndex)) {
                            
                                listAppliedBuffs.set(head.name, {action:head,player:p.p});
                            
                    }
                    }
                    



                    head = head.next;
                
                    }
                }
            }
        );

        return this.correctImpossibleCase(listAppliedBuffs);
        
    }


    public getDamageTaken(type:string) {

        var damage = 0;

            let head = this.damageLine.head;
            
            if (this.damageLine.head) {
            
                while (head) {
                    if (head.type === type) {
                        
                                damage += head.damage;
                            
                    }
                    
                    head = head.next;
                
                    }
            }
        
        return damage;
        
    }


    private correctImpossibleCase(listAppliedBuffs: Map<string,{action:ActionNode,player:Player}>) {

        
        
        
            if(listAppliedBuffs.has("Eukrasian Diagnosis")){
                if(listAppliedBuffs.has("Eukrasian Prognosis")){
                    listAppliedBuffs.delete("Eukrasian Prognosis");
                }
                if(listAppliedBuffs.has("Galvanize")){
                    listAppliedBuffs.delete("Galvanize");
                }
                if(listAppliedBuffs.has("Succor")){
                    listAppliedBuffs.delete("Succor");
                }
            }

            if(listAppliedBuffs.has("Galvanize")){
                if(listAppliedBuffs.has("Eukrasian Prognosis")){
                    listAppliedBuffs.delete("Eukrasian Prognosis");
                }
                if(listAppliedBuffs.has("Eukrasian Diagnosis")){
                    listAppliedBuffs.delete("Eukrasian Diagnosis");
                }
                if(listAppliedBuffs.has("Succor")){
                    listAppliedBuffs.delete("Succor");
                }
            }

            if(listAppliedBuffs.has("Eukrasian Prognosis")){
                if(listAppliedBuffs.has("Succor")){
                    listAppliedBuffs.delete("Succor");
                }
            }

            if(listAppliedBuffs.has("Shield Samba")){
                if(listAppliedBuffs.has("Troubadour")){
                    listAppliedBuffs.delete("Troubadour");
                }
                if(listAppliedBuffs.has("Tactician")){
                    listAppliedBuffs.delete("Tactician");
                }
            }

            if(listAppliedBuffs.has("Troubadour")){
                if(listAppliedBuffs.has("Shield Samba")){
                    listAppliedBuffs.delete("Shield Samba");
                }
                if(listAppliedBuffs.has("Tactician")){
                    listAppliedBuffs.delete("Tactician");
                }
            }

            if(listAppliedBuffs.has("Tactician")){
                if(listAppliedBuffs.has("Troubadour")){
                    listAppliedBuffs.delete("Troubadour");
                }
                if(listAppliedBuffs.has("Shield Samba")){
                    listAppliedBuffs.delete("Shield Samba");
                }
            }

            if(listAppliedBuffs.has("Aspect Benefic")){
                if(!listAppliedBuffs.has("Neutral Sect")){
                    listAppliedBuffs.delete("Aspect Benefic");
                }else if(listAppliedBuffs.get("Neutral Sect")!.action.time > listAppliedBuffs.get("Aspect Benefic")!.action.time){
                    listAppliedBuffs.delete("Aspect Benefic");
                }
            }

            if(listAppliedBuffs.has("Aspect Helios")){
                if(!listAppliedBuffs.has("Neutral Sect")){
                    listAppliedBuffs.delete("Aspect Helios");
                }else if(listAppliedBuffs.get("Neutral Sect")!.action.time > listAppliedBuffs.get("Aspect Helios")!.action.time){
                    listAppliedBuffs.delete("Aspect Helios");
                }
            }

            if(listAppliedBuffs.has("Passage of Arms")){
                if(listAppliedBuffs.has("Arms Up")){
                    listAppliedBuffs.delete("Arms Up");
                }
            }
            
                    


        return listAppliedBuffs;
        
    }


    public getCooldownSkills(player:Player){

        var listCdSkills = new Map<Number,Number>()
        player.job.getSkills().forEach(skill => {
            let head = player.record!.head;
            // eslint-disable-next-line
            var stacks = 0;

            skill.getBuffs().forEach(buff => {

                if (!listCdSkills.has(skill.skillIndex)) {
                    if (buff.cd !== 0) {
                        
                    
                
                
                stacks = buff.stack;
                let firstIt = -1;
                let iteration = 0;

            if (player.record!.head) {
            
                while (head) {
                    if (head.time <= this.timeCalcul ) {
                        
                        if (buff.buffIndex === head.getBuffIndex() ) {
                            iteration++;
                            
                            if (Math.floor((head.time-firstIt)/(buff.cd)) >= buff.stack) {
                                
                                firstIt = -1;
                                iteration = 1;
                            }

                            if (firstIt === -1) {
                                firstIt = head.time;
                    
                            }
 
                            
                        }

            
                }

                    head = head.next;
                
                    }

                    
                }
                //Math.floor((this.timeCalcul-firstIt)/(buff.cd)) < buff.stack

                if (firstIt !== -1 && (this.timeCalcul - firstIt <= buff.cd*iteration)) {
                    
                        listCdSkills.set(skill.skillIndex, Math.round((buff.cd -(this.timeCalcul-firstIt)%buff.cd)*100)/100);
                    
                    
                }
                
            }
        }
            });
        });

        return listCdSkills;
    }


    public getStacksSkills(player:Player){

        var listStacksSkills = new Map<number,number>()
        player.job.getSkills().forEach(skill => {
            let head = player.record!.head;
            let stacks = 0;

            skill.getBuffs().forEach(buff => {
                if (!listStacksSkills.has(skill.skillIndex)) {
                
                    if (buff.cd !== 0) {
                        
                    
                
                    stacks = buff.stack;
                    let firstIt = -1;
                    let iteration = 0;
                    let buffActionTimes = [];
    
                if (player.record!.head) {
                
                    while (head) {
                        if (head.time <= this.timeCalcul ) {
                            
                            if (buff.buffIndex === head.getBuffIndex() ) {
                                buffActionTimes.push(head.time);
                                
     
                                
                            }
    
                
                    }
    
                        head = head.next;
                    
                        }
    
                        
                    }

                    buffActionTimes = [...new Set(buffActionTimes)];
                    buffActionTimes.sort((a, b) => a - b);
                    if (buffActionTimes.length !== 0) {

                        for (let i = 0; i < buffActionTimes.length; i++) {
                            iteration++;
                                
                                if (Math.floor((buffActionTimes[i]-firstIt)/(buff.cd)) >= buff.stack) {
                                    
                                    firstIt = -1;
                                    iteration = 1;
                                }
    
                                if (firstIt === -1) {
                                    firstIt = buffActionTimes[i];
                        
                                }


                            
                        }
                        
                    }
                    
                    stacks = buff.stack - iteration + (Math.floor((this.timeCalcul-firstIt)/buff.cd));
                    if (stacks > buff.stack ) {
                        stacks = buff.stack;
                    }
    
                    
                        listStacksSkills.set(skill.skillIndex, stacks);
                        
                    
                }else{
                    listStacksSkills.set(skill.skillIndex, buff.stack);
                }
            }
            });
        });

        return listStacksSkills;
    }

}
