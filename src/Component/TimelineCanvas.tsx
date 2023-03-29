import React, {useEffect, useRef, useState} from 'react';
import { Party } from '../Controller/Party';
import { Player } from "../Controller/Player";
import { ActionNode } from '../Controller/ActionNode';


var isSelected = false;
var width = (window.innerWidth-100)*0.65;
var scrollLeft = 0;

type CanvasProps = React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> & {draw: (ctx: CanvasRenderingContext2D, player: Player) => void} 
 & {onClick: (canvas:HTMLCanvasElement |null, player: Player, party:Party,event: any) => void} & {updateParty: (party:Party) => void} & {drawCursor: (ctx: CanvasRenderingContext2D, time:Number) => void}
 & {updateCanvas: (scroll:Number) => void} & {player: Player} & {party: Party};

const Canvas: React.FC<CanvasProps> = ({draw, ...props}) => { 

  
  const height= 100;
  const [draggedSkill, setDraggedSkill] = useState(new Map<string,ActionNode>());
  const [player, setPlayer] = useState(props.player);
  const [party, setParty] = useState(props.party);
  const [isClickDown, setIsClickDown] = useState(false);

  var refreshFrame:number = 0;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(()=> {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    var hignestTime = party.getGlobalLastActionTime();
    

    if ((hignestTime)*30 +100 > (window.innerWidth-100)*0.65) {

      width  = (hignestTime)*30 +100;
    }else {
      width = (window.innerWidth-100)*0.65;
    }
    
    if (canvas.width !== width) {
      canvas.width = width;
    }
    
    
    
    clearLine(ctx, canvas);
    if (isSelected && party.timeCalcul !== party.getGlobalLastActionTime()) {
      
    props.drawCursor(ctx, party.timeCalcul);
    }

    drawDamageLine(ctx, canvas);
    draw(ctx,props.player);
    


    if (canvas.parentElement) {
      canvas.parentElement.scrollLeft = scrollLeft;
      
    }

// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])


  
  function clearLine(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement) {
      
    ctx.fillStyle = "#d3d3d3";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    drawTimer(ctx,canvas);
}

function drawTimer(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement) {
  var time:number = 0;
  ctx.fillStyle = "#000000";
  
  while (time*30 < width) {
    
    
    if (time%60 === 0) {
      ctx.font = "14px serif";
      ctx.fillText("|"+time/60+":00",(time)*30, 70);
    }else if (time%5 === 0) {
      ctx.font = "12px serif";
      ctx.fillText("|"+(time-time%60)/60+":"+Math.round(time%60 *100)/100,(time)*30, 70);
    }else{
      ctx.font = "8px serif";
      ctx.fillText("|",(time)*30, 70);
    }

    time++;
    
  }
}


function drawDamageLine(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement) {
  var head = party.damageLine.head;
    
    while (head) {
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.moveTo((head.time*30)-3, 80);
      ctx.lineTo((head.time*30)+3,80);
      ctx.lineTo((head.time*30), 74);
      ctx.fill();
            
            
            
            
      head = head.next;
    }
  
}

  function getActionCanvas(canvas:HTMLCanvasElement, event: any) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return getActionFromPosition(x,y);
  }
  
  function getActionFromPosition(x:Number,y:Number) {
    let line = player.record;
    let head = line?.head;
    let listAction = new Map<string,ActionNode>();
      let actionY = 5;
  
      while (head) {
        if ((head.time)*30 <=x && (head.time)*30 +28 >= x && actionY <= y && actionY+28 >=y) {
          listAction.set(head.name, head);
        }
        head = head.next; 
      }
      return listAction;
  }
  

  function deleteAction(event: any) {
    // Here, we invoke the callback with the new value

    props.onClick(canvasRef.current, player, party,event);
    
  }




  function getDamageCanvas(canvas:HTMLCanvasElement, event: any) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return getDamageFromPosition(x,y);
  }
  
  function getDamageFromPosition(x:Number,y:Number) {
    let DamageLine = party.damageLine;
    let head = DamageLine.head;
    var prevHead = undefined;
      let actionY = 74;
  
      while (head) {
        if ((head.time)*30-5 <=x && (head.time)*30 +5 >= x && actionY-2 <= y && actionY+6 >=y) {
          
          return {head:head,prev: prevHead};   
        }
        head = head.next; 
      }
      return undefined;
  }



    function handleMouseMove(event: any)
  {
    
    event.preventDefault();
    event.stopPropagation();
    var actions = getActionCanvas(canvasRef.current!,event);
    var damage = getDamageCanvas(canvasRef.current!,event);
    if (event.button === 0 && isClickDown) {
      


      if (draggedSkill.size!==0 && canvasRef.current ) {
        
        const rect = canvasRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left

        let index = 0;
        draggedSkill.forEach(action => {

          action.time = (Math.round((((x-14)/30))*100)/100)+(index*0.1);
          index++;
        });
 
        setPlayer(player);
        party.setTimeCalcul(party.getGlobalLastActionTime());
        setParty(party);
        refreshFrame++;

        if (refreshFrame === 20) {
          if (canvasRef.current) {
            
            
            clearLine(canvasRef.current.getContext('2d')!,canvasRef.current);

            draw(canvasRef.current.getContext('2d')!,player);
          }
          
        refreshFrame = 0;
        props.updateParty(party);
        }
      
      }




    }else if (!isClickDown) {
      var ctx = canvasRef.current!.getContext('2d');
      if (ctx) {
       
        
        if (actions.size!==0) {
          ctx.fillStyle = "#d3d3d3";
          ctx.fillRect(0,35,width,20);
          ctx.font = "14px serif";
          ctx.fillStyle = "#000000";
          
          ctx.fillText(actions.entries().next().value[0], actions.entries().next().value[1].time*30, 50);
            
          
        }else if (damage) {
          ctx.fillStyle = "#d3d3d3";
          ctx.fillRect(0,35,width,20);
          ctx.font = "14px serif";
          ctx.fillStyle = "#000000";
          ctx.fillText(damage.head.name+'  ('+damage.head.type+' )', damage.head.time*30, 50);
            
          
        }else{
          ctx.fillStyle = "#d3d3d3";
          ctx.fillRect(0,35,width,20);
        }
        if (isSelected && party.timeCalcul !== party.getGlobalLastActionTime()) {
      
          props.drawCursor(ctx, party.timeCalcul);
          }
      }
      
      
    }
  }

  function handleMouseUp(_event: any)
  {
    setIsClickDown(false);
    refreshFrame = 0;
    setDraggedSkill(new Map<string,ActionNode>());
  }


  function handleClick(event: any)
  {
    event.preventDefault();
    event.stopPropagation();

    var actions = getActionCanvas(canvasRef.current!,event);
    
    if(event.button === 0) {
      
      if (actions.size!==0) {
        setDraggedSkill(actions);
      }
      
      setIsClickDown(true);
      
      if (actions.size===0 && canvasRef.current) {
        
        const rect = canvasRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        party.setTimeCalcul(Math.round(((x/30))*100)/100);
        props.updateParty(party);
        setParty(party);
        isSelected = true;
      }
    }else if(event.button === 2){
      deleteAction(event);

      if (actions.size===0 && canvasRef.current) {
        
        party.setTimeCalcul(party.getGlobalLastActionTime());
        props.updateParty(party);
        setParty(party);
        isSelected = false;
      }
    }
    
  }

  function disableMenu(event:any)
  {
    event.preventDefault();
    event.stopPropagation();
    
  }

  function handleMouseLeave(event:any)
  {
    if (canvasRef.current) {
      if (isClickDown) {
        if (canvasRef.current.parentElement) {
          if (isClickDown) {
            const rect = canvasRef.current.getBoundingClientRect();
            
            if (event.clientX - rect.x <= canvasRef.current.parentElement.scrollLeft) {
              canvasRef.current.parentElement.scrollLeft -= 20;
              
              
            }

            if (event.clientX - rect.x >= canvasRef.current.parentElement.offsetWidth-3) {
              
            canvasRef.current.parentElement.scrollLeft += 20;
            }
          }
        }
      }
    }
    
    
    
    
  }

  function handleOnScroll(event: any) {
    scrollLeft = event.currentTarget.scrollLeft ;
    props.updateCanvas(scrollLeft);
    
  }

  
  return (<div className='timeline' style={{overflow: "scroll clip", height: "100px", width: (window.innerWidth-100)*0.65, left: scrollLeft}} onScroll={handleOnScroll.bind(this)}>
    <canvas ref={canvasRef} height={height} width={width} onMouseDown= {handleClick.bind(this)}
                onMouseMove={handleMouseMove.bind(this)}
                onMouseUp={handleMouseUp.bind(this)}
                onContextMenu={disableMenu.bind(this)} 
                onMouseLeave={handleMouseLeave.bind(this)}
                />
                </div>)
}



export default Canvas;
