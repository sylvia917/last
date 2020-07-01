var canvas={};

canvas.XInfo={};
canvas.XInfo.X_height=[20,40,60,80,100];
canvas.width=0;
canvas.height=0;
canvas.widthX=0;//x轴高度
canvas.widthY=0;//y轴高度
canvas.spaceY=0;//Y间隔
canvas.spaceX=0;//X间隔
canvas.coordinate={};
canvas.coordinate.height=0;//x坐标高度
canvas.coordinate.width=0;//y坐标长度
canvas.origin={x:0,y:0};//原点的x，y坐标 


canvas.init=function(canvasNode){	
	"use strict";
	canvas.width=canvasNode.width;	canvas.height=canvasNode.height;	canvas.widthY=canvas.height*0.8;	canvas.widthX=canvas.width*0.8;};

/** 
* 画条形图 
* @param  canvasNode canvas对象 
* @param coordinate  是一个对象 必须包含有 XInfo（X轴信息）,YInfo（Y轴信息）,color（条形图对应颜色，可以为空）,prrcent（每个条形图所占中的百分比）,都是数组 
*/
canvas.drawBarChart=function(canvasNode,coordinate){	
	"use strict";
	canvas.init(canvasNode);	 
	var context=canvas.get2DContext(canvasNode);	
	var startLinePosX=canvas.width-canvas.widthX;	 
	var startLinePosY=canvas.height-canvas.widthY;	    context.beginPath();	    context.moveTo(startLinePosX,startLinePosY);	    context.lineTo(startLinePosX,canvas.widthY);	    canvas.origin.x=startLinePosX;	    canvas.coordinate.height=canvas.widthY-startLinePosY;	    context.moveTo(startLinePosX,canvas.widthY);	    context.lineTo(canvas.widthX,canvas.widthY);	    canvas.origin.y=canvas.widthY;	    canvas.coordinate.width=canvas.widthX-startLinePosX;	    
	context.fill();//填充	    
	context.stroke();//画线	    
	canvas.drawArraw(context,{midX:startLinePosX,midY:startLinePosY},true);	    canvas.drawArraw(context, {midX:canvas.widthX,midY:canvas.widthY},false);	    	  
	/*  canvas.drawCoordinate(context,[10,20,30,40,50,60,70,80,90],null,null,true);	    canvas.drawCoordinate(context,['一月','二月','三月','四月','五月','六月','七月'],null,[0.3,0.4,0.5,0.9,0.19,0.8,0.78,0.99,0.12],false);	    */	    canvas.drawCoordinate(context,coordinate.XInfo,null,null,true);	    console.info(coordinate.YInfo);	    canvas.drawCoordinate(context,coordinate.YInfo,coordinate.color,coordinate.percent,false);};

/** 
* @param context 画布 
* @param pos 画布位置 必须包含箭头中点位置:midX,midY,箭头左边最底高度：height,宽度 */
canvas.drawArraw=function(context,pos,isVertical){	
	"use strict";
	context.moveTo(pos.midX,pos.midY);	    
	context.lineWidth+=context.lineWidth;	    
	
	if(!isVertical){	    	
		
		context.lineTo(pos.midX-9,pos.midY+4);		   
		context.moveTo(pos.midX,pos.midY);		   
		context.lineTo(pos.midX-9,pos.midY-4);		   
		context.fill();//填充		    
		context.stroke();//画线	    
		}
		
	else{	    
		context.lineTo(pos.midX-4,pos.midY+9);	    
		context.moveTo(pos.midX,pos.midY);	   
		context.lineTo(pos.midX+4,pos.midY+9);	    
		context.fill();//填充	    
		context.stroke();//画线	    
	}	    
		context.lineWidth=context.lineWidth-1;};  /** * 画坐标 * @param 画布 * @param x或者y的坐标信息 * @param 是否是垂直方向 */

		canvas.drawCoordinate=function(
		context,XOrY_heightArr,color,percent,isVerticial){
			"use strict";
			var xOrigin=canvas.origin.x;//原点x坐标           	  
			var yOrigin=canvas.origin.y;//原点y坐标           	  
			var widthX=canvas.coordinate.width;           	  
			var heightY=canvas.coordinate.height;           	  
			var section=XOrY_heightArr===null?0:XOrY_heightArr.length;           	  
			var info=XOrY_heightArr;           	  
			var perSize=0;//每个坐标之间的距离           	  
			
			var actWidth=widthX-canvas.width*0.09;           	  
			var actHeight=heightY-canvas.height*0.09;           	  
			var tmpColor=['#FFA500','#EE7AE9','#E0FFFF','#AAAAAA','#8E8E8E','#8B1A1A','#76EE00','#525252','342354','362575','257436','246356','#00EE00','#4B0082'];                  
			color=color===null?tmpColor:color;           	             	 
			
			if(isVerticial&§ion==0){           		  
				
				info=canvas.XInfo.X_height;            	  }           	             	
			
			if(isVerticial){   			      perSize=actHeight/info.length;   		         }
			
			else{   		        	 
				if(section==0){return;   }   		        	 perSize=actWidth/info.length;   		         }            	  
			for(var i=1;i<=info.length;i++){                    		
				
				if(isVerticial){                    			
					
					context.moveTo(xOrigin-5,yOrigin-perSize*i);                    			 context.lineTo(xOrigin,yOrigin-perSize*i);                    			 
					context.stroke();                    			 
					context.fillText(info[i-1],xOrigin-20,yOrigin-perSize*i+4);                    		 }else{                    			 context.moveTo(xOrigin+perSize*i,yOrigin+5);                    			 context.lineTo(xOrigin+perSize*i,yOrigin); 
					context.stroke();                    			 
					 var character=info[i-1];                    			
					var char='';                    			 if(isNaN(character)){                    				  var tmp=character.split("");                    				  
					  for(var j=0;j<tmp.length;j++){                    					  context.fillText(tmp[j],xOrigin+perSize*i-5,yOrigin+10+(j+1)*13);                    				  }                     			 }else{               					  context.fillText(character,xOrigin+perSize*i-5,yOrigin+20);                    			 }                    			 context.fillStyle =color[i];                    			 context.fillRect(xOrigin+perSize*i-perSize/4,yOrigin-actHeight*percent[i-1],perSize/2,actHeight*percent[i-1]-1);                    			 context.fillStyle='black';                    			 context.fillText(percent[i-1]*100+"%",xOrigin+perSize*i-perSize/8,yOrigin-actHeight*percent[i-1]);                    		 }           	  }}; /** * 获取画布 */

					canvas.get2DContext=function(canvasNode){
						"use strict";
						return canvasNode.getContext("2d"); };

