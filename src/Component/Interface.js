import React, { useEffect } from "react";
import {useState} from "react";
import Canvas from "./TimelineCanvas.tsx";
import '../Style/App.css';
import { initialise } from "../scripts/initialiseData.js";
import { Player } from "../Controller/Player.ts";
import { ActionNode } from '../Controller/ActionNode.ts';
import { Party } from "../Controller/Party.ts";
import Modal from "react-modal";
import { initialiseDamageLine } from "../scripts/initialiseDamageLine.js";
import { exportParty } from "../scripts/exportJson.js";


const jobList = initialise();
const damageLineList = initialiseDamageLine();
var listOptionJob = [];
jobList.forEach(job => {
  listOptionJob.push(<option value={job.jobIndex.toString()} key={job.name}>{job.name}</option>);
});

var listOptionDLine = [];
damageLineList.forEach(dLine => {
  listOptionDLine.push(<option value={dLine.damageLineIndex} key={dLine.name}>{dLine.name}</option>);
});
var listJobSkills = [];
var listPlayerActions = [];

const customStyles = {
  content: {
    top: '20%',
    left: '40%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '30%',
    transform: 'translate(-40%, -10%)',
  },
};
const job = jobList.values().next().value;
  let playerList = new Map();
  const player1 = new Player(job,"player1");
  const player2 = new Player(job,"player2");
  const player3 = new Player(job,"player3");
  const player4 = new Player(job,"player4");
  const player5 = new Player(job,"player5");
  const player6 = new Player(job,"player6");
  const player7 = new Player(job,"player7");
  const player8 = new Player(job,"player8");

  playerList.set(player1.pIndex, player1);
  playerList.set(player2.pIndex, player2);
  playerList.set(player3.pIndex, player3);
  playerList.set(player4.pIndex, player4);
  playerList.set(player5.pIndex, player5);
  playerList.set(player6.pIndex, player6);
  playerList.set(player7.pIndex, player7);
  playerList.set(player8.pIndex, player8);


function createParty() {
  
  const party = new Party(playerList, damageLineList.get(0));

return party;
}

class ActionLister extends React.Component{
    line;
  myRef;
  party;
  player;
    
  constructor (props) {
    super(props);
    this.state = {p: props.player, party: props.party}
    this.party = props.party;
    this.player = props.player;
  }

  getActionList(line){
    if (line.head) {
      listPlayerActions = [];

      
      let lineSerialized = line.serialized();
      lineSerialized.actions.forEach(action => {
        listPlayerActions.push(<img id={action.actionIndex} className="buff-icon" src={action.buffIcon} title={action.buffName} key = {action.actionIndex} alt = {action.buffName} ></img>);

        
        
      });
      this.line = listPlayerActions;
    }else{
      this.line = [];
    }
     
    return this.line;
  }

  updateParty = (party) => {
    this.props.updateParty(party);
    this.party.updateStatPlayer(this.state.p);
    this.setState({p: this.player, party: this.party});
    
  }

  updateCanvas = (scroll) => {
    this.props.updateCanvas(scroll);
  }

  drawLine=(ctx, player, scrollLeft) =>{
    var head = player.record.head;
    
    while (head) {
      if (Math.round((scrollLeft-100)/30)<= head.time && Math.round((scrollLeft+((window.innerWidth-100)*0.65))/30) >= head.time) {
        
      
          
            let img = new Image();
            img.src = head.getIcon();
            img.pos = {x:Math.floor((head.time)*30), y: 5}
            img.onload = function(){
              
              ctx.drawImage(img,this.pos.x,this.pos.y,28,28);
            };
            
            
          }  
            
      head = head.next;
    }

    
  }

  drawCursor=(ctx, time) =>{

    ctx.fillStyle = "red";
    ctx.fillRect(time*30,0,2,100);
    
  }

deleteAction = (canvas,player,party, event) => {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  let ctx = canvas.getContext('2d', { alpha: false });

  let line = player.record;
  let head = line.head;
  let prevHead = undefined;
  let fixedPrevHead = undefined;
    let actionY = 5;

    
    let listAction = new Map();


    while (head) {
      if ((head.time)*30 <=x && (head.time)*30 +28 >= x && actionY <= y && actionY+28 >=y) {
        listAction.set(head.name, head);
        if (!fixedPrevHead) {
          fixedPrevHead = prevHead;
        }
      }
      prevHead = head;
      head = head.next; 
    }
    

    listAction.forEach(action => {
      if (fixedPrevHead) {
        
        fixedPrevHead.next = action.next;
      }
      if(line.head === action){
        line.head = action.next;
      }
      if (line.tail === action) {
        line.tail = fixedPrevHead;
      }


      ctx.fillStyle = "#d3d3d3";
      ctx.fillRect((action.time)*30,5,28,28);
      
    });

    this.updateParty(this.state.party);
}



render(){
  
  return <div style={{display:"flex", flex: "auto", flexDirection:"row"}}>
    <div style={{width: (window.innerWidth-100)*0.10}}> 
    hp: {this.state.p.hp}  <br/>  
    shield: {this.state.party.players.get(this.state.p.pIndex).cumulatedShield}   <br/>
    mitig physic: {this.state.party.players.get(this.state.p.pIndex).cumulatedPhyMitig}  <br/> 
    mitig magic: {this.state.party.players.get(this.state.p.pIndex).cumulatedMagMitig}   <br/>
    parry rate: {this.state.party.players.get(this.state.p.pIndex).parryRate} </div>
    
    
    <Canvas draw={this.drawLine} onClick = {this.deleteAction} player = {this.state.p} party = {this.state.party}  updateParty={this.updateParty} updateCanvas={this.updateCanvas} drawCursor={this.drawCursor}

    />
    
  </div>
}
}

class SkillLister extends React.Component{
    
  skill;


  
  constructor (props) {
    super(props);
    this.state = {p: props.player,party:props.party, time:props.time, scrollLeft: props.scrollLeft, modalIsOpen: false, timecode:0, inChaine:true, target: props.player, targetable: false}
    listJobSkills = [];
    this.state.p.job.getSkills().forEach(skill => {
      listJobSkills.push(skill.name);
      
    });
  }

  updateParty = (party) => {
    this.props.updateParty(party);
  }

  updateCanvas = (scroll) => {
    this.props.updateCanvas(scroll);
  }

  addSkillToLine(){
    
    var player = this.state.p
    
        let buffs = this.skill.getBuffs();
        var time = 0;
        if (this.state.inChaine) {
          if (player.record.head) {
            time = player.record.getLastTime() + 0.7;
          }
        }else{
          time = this.state.timecode;
        }
        
        
        let buffNb = 0;
        buffs.forEach(buff => {
          var target = undefined;
          if (buff.targetable) {
            target = this.state.target;
          }
          
          var party = this.state.party;
          if (!player.record.tail && this.state.inChaine) {
            player.record.addAction(new ActionNode(buff, Math.round((0+ 0.1*buffNb)*100)/100, target));
          } else {
            player.record.addAction(new ActionNode(buff, Math.round((time+ 0.1*buffNb)*100)/100, target));
          }
          buffNb++;
          party.updateStatPlayer(this.state.p);
          
          this.setState({ p: player,party:party, time:this.state.time+0.7 });
          //this.state.party.setTimeCalcul(this.state.party.getGlobalLastActionTime());
          this.state.party.setTimeCalcul(this.state.p.record.getLastTime());
          this.updateParty(this.state.party);
          
        
        });
        
        
      
    
  }

  getSkillList(skills){
    var cd = this.state.party.getCooldownSkills(this.state.p)
    var stacks = this.state.party.getStacksSkills(this.state.p);
    
    listJobSkills = [];
      skills.forEach(skill => {
        listJobSkills.push(<div className="container" key = {skill.skillIndex}>
          <img id={skill.skillIndex} className="skill-icon" src={skill.icon} title={skill.name} key = {skill.skillIndex} alt = {skill.name} onClick={this.openModal.bind(this)}
          ></img>
          <div className="centered">{cd.get(skill.skillIndex)!==0?cd.get(skill.skillIndex):""}</div>
          <div className="topLeft">{stacks.get(skill.skillIndex)}</div>
          </div>);
      });
      return listJobSkills;
  }

  openModal(e) {
    this.setState({timecode:0,inChaine:true})

    this.setState({modalIsOpen:true});

    this.setState({target:this.state.p});

    this.state.p.job.getSkills().forEach(skill => {
      if (''+skill.skillIndex === e.target.id) {
        this.skill= skill;
        this.setState({targetable: skill.targetable()})
        
        return;
      }
      
    });


    
    
  }

  addSkillModal() {
    this.addSkillToLine();
    this.setState({modalIsOpen:false});
    
  }


  closeModal() {
    this.setState({modalIsOpen:false});
  }

  componentDidMount() {
    Modal.setAppElement('body');
}

updateTimecode(e) {
  let split = e.target.value.split(':');
  let time = (Number(split[0])*60) +Number(split[1]);
  if (time >1082) {
    alert("Timecode should not be higher then 18:08. (this limit will be removed later) ")
    return;
  }else {
    this.setState({timecode: time, inChaine:false})
  }
  
}

updateInChaine(e) {
  this.setState({inChaine: !this.state.inChaine})
  
  
}

updateTarget(e) {
  this.setState({target:this.state.party.players.get(Number(e.target.value)).p})
  
  
}

getOptionTarget() {
  var listOptionTarget = [];
  this.state.party.players.forEach(pInfo => {
    listOptionTarget.push(<option value={pInfo.p.pIndex} key={pInfo.p.pIndex} >{"player"+(pInfo.p.pIndex+1).toString()}</option>);
  });
  return listOptionTarget;
}


render(){
  
  return <div className="skills-timeline">
    <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal.bind(this)}
        style={customStyles}
        contentLabel="Add skill :"
        
      >
        <h2 >Add new skill : {this.skill?this.skill.getName():"undefined"}</h2>
        <label>
        Timecode :
          <input type="time" name="name" onChange={this.updateTimecode.bind(this)} min={"00:00"} max={"18:08"}/>
          
        </label><br/><br/>
        <label>
        After last skill :   
        <input type={"checkbox"}  checked={this.state.inChaine} onChange={this.updateInChaine.bind(this)}/>
          
        </label><br/><br/>

        <label hidden={!this.state.targetable}>
        Target :
        <select id="players" className="target-selection" autoComplete="off" onChange={this.updateTarget.bind(this)} value={this.state.target.pIndex}>
        {this.getOptionTarget()}
        </select>
        <br/><br/>
        </label>
        <button onClick={this.addSkillModal.bind(this)}>Add skill</button>
        <button onClick={this.closeModal.bind(this)}>close</button>
        
      </Modal>
    <div className='skills-section' style={{width: (window.innerWidth-100)*0.15}}>
    {this.getSkillList(this.state.p.job.getSkills())}
    </div>
    
    <ActionLister player = {this.state.p} party = {this.state.party} updateParty={this.updateParty}  scrollLeft={this.state.scrollLeft}  updateCanvas={this.updateCanvas}/>

    </div>
}
}

class JobSelecter extends React.Component{

player;
party;

  constructor (props) {
    super(props);
    this.state = {p: props.player,party: props.party, time: 0, scrollLeft: props.scrollLeft}
    this.player = props.player;
    this.party = props.party;
  }

  updateParty = (party) => {
    this.props.updateParty(party);
  }

  updateCanvas = (scroll) => {
    this.props.updateCanvas(scroll);
  }

  updateJob(e){
    
    jobList.forEach(job => {
      if (''+job.jobIndex === e.target.value) {
        this.player.changeJob(job);
        this.party.setPlayer(this.player);
        
        this.setState(({p: this.player,party: this.party, time:5}))
        this.updateParty(this.state.party);
        
        
      }
    });
  }

  render(){
    return <div className='player-section' style={{width: window.innerWidth-100, margin:"auto"}}>
    <div className='job-segment'style={{width: (window.innerWidth-100)*0.05}}>
    <img className="job-icon" src={this.state.p.job.icon} alt={this.state.p.job.name} />
    <select id="jobs" className="job-selection" autoComplete="off" onChange={this.updateJob.bind(this)} >
      {listOptionJob}
    </select>
    </div>
    <SkillLister player = {this.state.p} party = {this.state.party} time = {this.state.time} updateParty={this.updateParty} scrollLeft={this.state.scrollLeft} updateCanvas={this.updateCanvas}/>
    </div>
  }

}







function Interface() {
  let partyInit = createParty();
  const [party, setParty] = useState(partyInit);
  const [partyRender, setPartyRender] = useState(renderPage(party));
  const [scrollLeft, setScrollLeft] = useState(0);
  var index = 0;


  useEffect(() => {
    updateParty(party);
    //updateCanvas(scrollLeft);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [party]);




  function updateParty(p) {
    p.players.forEach(player => p.updateStatPlayer(player.p));
    //setParty(p);
    setPartyRender(renderPage(p,scrollLeft));
    
  }

  function updateCanvas(scroll) {
    if (index === 10) {
      setPartyRender(renderPage(party,scrollLeft));
      index =0;
    }
    setScrollLeft(scroll);
    
    index++;
    
  }
  
    function renderPage(party, scrollLeft) {
        
        let partyRender=[];

        party.players.forEach(player => partyRender.push(<JobSelecter player={player.p} key={player.p.pIndex} party={party} updateParty={updateParty} updateCanvas={updateCanvas} scrollLeft={scrollLeft}/>));
        return partyRender;
      }

  function updateDamageLine(e){
    
    let damageLine = damageLineList.get(Number(e.target.value));
    
    party.setDamageLine(damageLine);
    setParty(party);
    
    //setPartyRender(renderPage(party));
  }


  
  function exportLines(e){
    
    let json = exportParty(party);

    const blob = new Blob([json]);
    const fileDownloadUrl = URL.createObjectURL(blob);

    const tag = document.createElement('a');
    tag.href = fileDownloadUrl;
    tag.setAttribute('download',"PartyMitig.json");
    document.body.appendChild(tag);
    tag.click();
    tag.remove();
    URL.revokeObjectURL(fileDownloadUrl);

  }


  function tryParseJSONObject (jsonString){
    try {
        var o = JSON.parse(jsonString);

        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }

    return false;
};

  function importLines(e){
    
    
    const tag = document.createElement('input');
    tag.type = "file";
    tag.setAttribute('multiple',false);
    tag.setAttribute('accept',".json");
    tag.addEventListener('change',function (event) {
      const fileObj = event.target.files[0];
      const reader = new FileReader();

      let fileloaded = e => {
        let json = tryParseJSONObject(e.target.result);


        if(!json){
          alert('Invalid File.');
          return;
        }
        
        let playerList = new Map();
        let buffList = new Map();
        let p;


        if (!json.players) {
          alert("Invalid File.");
          return;
        }
        json.players.forEach(pInfo => {
          jobList.forEach(job => {
            if (job.name === pInfo.player.job) {
              p = new Player(job,pInfo.player.name, pInfo.player.hp, pInfo.player.mp, pInfo.player.wd,pInfo.player.det,pInfo.player.mainstat)
              playerList.set(p.name,p);
              
            }
          });


          
          
        });

        if (playerList.size === 0) {
          alert("Invalid File.");
          return;
        }
        let partyjson = new Party(playerList,damageLineList.get(0));

        json.players.forEach(pInfo => {
        

          let p = playerList.get(pInfo.player.name);


          buffList.clear();
          p.job.getSkills().forEach(skill => {
            skill.getBuffs().forEach((buff, key) => {
              buffList.set(buff.name, buff);
            });
            
          });


          pInfo.player.record.forEach(action => {
            let target = playerList.get(action.target)!==null?playerList.get(action.target):undefined;
            let buff = buffList.get(action.buff);
            p.record.addAction(new ActionNode(buff,action.time, target));
          });
        
      });
      
      partyInit = partyjson;
      setParty(partyjson);
        //updateParty(partyjson);
        //setScrollLeft(0);
        //updateCanvas(scrollLeft);
       
      }

      fileloaded = fileloaded.bind(this);
      reader.onload = fileloaded;
      reader.readAsText(fileObj);
      
  })
    document.body.appendChild(tag);
    tag.click();
    tag.remove();
  }
    
    return (<div> <h1 style={{margin:"20px"}}>Party Mitigation Planner</h1>
      <div style={{margin:"20px"}}>
        <label>Fight Damage Timeline
        <select id="damageLine" className="dLine-selection" autoComplete="off" onChange={updateDamageLine.bind(this)} style={{margin:"20px"}}>
      {listOptionDLine}
    </select>
    
    </label>
    <div style={{textAlign:'right', width: window.innerWidth-100, margin:"auto"}}>
    <button onClick={exportLines} style={{margin:'10px'}}>Export Party Timelines</button>
    <button onClick={importLines} style={{margin:'10px'}}>Import Party Timelines</button>
    </div>
    </div>
    
    <br/>
      <div>{partyRender}</div>
    </div>
    )
  }
  
  export default Interface;