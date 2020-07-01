//导航栏代码
var speed = 100;
var scrollTop = null;
var hold = 0;
var float_banner;
var pos = null;
var timer = null;
var moveHeight = null;
float_banner = document.getElementById("float_banner");
window.onscroll=scroll_ad;
function scroll_ad(){
	"use strict" ;
 scrollTop = document.documentElement.scrollTop+document.body.scrollTop;
 pos = scrollTop - float_banner.offsetTop;
 pos = pos/10;
 moveHeight = pos>0?Math.ceil(pos):Math.floor(pos);
 if(moveHeight!==0){
  float_banner.style.top = float_banner.offsetTop+moveHeight+"px";
  setTimeout(scroll_ad,speed);
 }
//alert(scrollTop);
}

