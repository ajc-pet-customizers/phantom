var features = new Map();
features.set("color",["black","black"]);
features.set("top","top_round");
features.set("bottom","bottom_sharp");
features.set("eye","round");
features.set("effect","none");

setColorButtons("color_grid"); 
setEyeButtons();
setOtherButtons();

updateColor("black");
updateBase();
updateSecondary("black");
updateAsset("eye","round");
updateAsset("top","top_round");
updateAsset("bottom","bottom_sharp");
updateAsset("effect","none");

document.getElementById("save").addEventListener("click", function() { mergeImages("save"); } );
document.getElementById("new_tab").addEventListener("click", function() { mergeImages("new_tab"); } );
document.getElementById("randomize").addEventListener("click", function() { randomize(); } );
document.getElementById("bg_contrast").addEventListener("click", function() { flip_bg(); } );
light = true;

var myVar;
function loaded() {
  myVar = setTimeout(showPage, 2500);
}

function showPage() {
  document.getElementById("loading_container").style.display = "none";
}

function randomize() {
  var randfeatures = [["dark red", "brown","orange","lime","blue","light red","tan","yellow","mint","light blue", "black","white","dark pink","dark green","teal","red orange", "burple","light pink","medium green","cyan"],["round","angry","happy","human","swirl","side"],["flat","round","sharp","stub"], ["flat","round","sharp","stub"],["none","glow","lightning","freckle"]];
  var randoms = []

  for (var i = 0; i < randfeatures.length; i++) {
    if (i==0) {
      randoms.push(randfeatures[i][Math.floor(Math.random()*randfeatures[i].length)])
    }
    randoms.push(randfeatures[i][Math.floor(Math.random()*randfeatures[i].length)]);
  }
  updateColor(randoms[0]);
  updateSecondary(randoms[1]);
  updateAsset("eye",randoms[2]);
  updateAsset("top","top_"+randoms[3]);
  updateAsset("bottom","bottom_"+randoms[4]);
  updateAsset("effect",randoms[5]);
}

function flip_bg() {
  if (!light) {
    document.getElementById("phantom_container").style.backgroundImage = "url('misc_assets/light bg.png'"+")";
  }
  else {
    document.getElementById("phantom_container").style.backgroundImage = "url('misc_assets/dark bg.png'"+")";
  }
  light = !light;
}

function setColorButtons(className) {
var colorNames = ["dark red", "brown","orange","lime","blue","light red","tan","yellow","mint","light blue", "black","white","dark pink","dark green","teal","red orange", "burple","light pink","medium green","cyan"];
var colorRGBs = [[199, 66, 83], [206, 117, 76],[255, 194, 107],[165, 222, 119],[139, 217, 255],[234, 102, 119],[237, 163, 114],[255, 236, 166],[219, 254, 165],[230, 255, 254],[50, 50, 50],[255, 255, 255],[229, 149, 255],[56, 110, 69],[86, 219, 208],[232, 101, 81],[151, 170, 254],[237, 204, 255],[88, 168, 107],[142, 255, 226]];
for (var i = 0; i < colorNames.length; i++) {
  var b = document.createElement("BUTTON");
  b.className = "color_grid_button";
  b.id = colorNames[i]+"1";
  b.style.backgroundColor = "rgb("+colorRGBs[i].join(",")+")";
  document.getElementById(className+"_1").appendChild(b);
  b.addEventListener("click", function() { updateColor(this.id.substring(0,this.id.length - 1)) } );

  var b2 = document.createElement("BUTTON");
  b2.className = "color_grid_button";
  b2.id = colorNames[i]+"2";
  b2.style.backgroundColor = "rgb("+colorRGBs[i].join(",")+")";
  document.getElementById(className+"_2").appendChild(b2);
  b2.addEventListener("click", function() { updateSecondary(this.id.substring(0,this.id.length - 1)) } );
  }
}

function setEyeButtons() {
var eyeAssets = ["round","angry","happy","side","human","swirl"];

for (var i = 0; i < eyeAssets.length; i++) {
  var b = document.createElement("BUTTON");
  b.className = "cell_button";
  b.id = ""+eyeAssets[i];
  b.style.backgroundImage = "url('button_assets/"+eyeAssets[i]+" cell.png'"+")";
  b.addEventListener("click", function() { updateAsset("eye",this.id) } );
  document.getElementsByClassName("eye_panel_div")[0].appendChild(b);
  }
}

function setOtherButtons() {
var legs = ["flat","round","sharp","stub"];
var effects = ["none","glow","lightning","freckle"];
for (var i = 0; i < 4; i++) {
  var t = document.createElement("BUTTON");
  t.className = "cell_button";
  t.id = "top_"+legs[i];
  t.style.backgroundImage = "url('button_assets/top "+legs[i]+" cell.png'"+")";
  document.getElementsByClassName("other_panel_div")[0].appendChild(t);
  t.addEventListener("click", function() { updateAsset("top",this.id) } );

  var b = document.createElement("BUTTON");
  b.className = "cell_button";
  b.id = "bottom_"+legs[i];
  b.style.backgroundImage = "url('button_assets/bottom "+legs[i]+" cell.png'"+")";
  document.getElementsByClassName("other_panel_div")[0].appendChild(b);
  b.addEventListener("click", function() { updateAsset("bottom",this.id) } );

  var e = document.createElement("BUTTON");
  e.className = "cell_button";
  e.id = ""+effects[i];
  e.style.backgroundImage = "url('button_assets/"+effects[i]+" cell.png'"+")";
  e.addEventListener("click", function() { updateAsset("effect",this.id) } );
  document.getElementsByClassName("other_panel_div")[0].appendChild(e);
  }
}

function updateBorders(buttonId, newButtonId) {
  var oldB = document.getElementById(buttonId);
  var newB = document.getElementById(newButtonId);
  if (oldB != null && newB != null) {
    oldB.style.outline = "none";
    newB.style.outline = "0.3vw solid #FBB148";
    oldB.style.zIndex = 0;
    newB.style.zIndex = 1000;
  }
}

//Functions for color/feature updating below
function updateColor(newColor) {
  updateBorders(features.get("color")[0]+"1",newColor+"1");
  features.set("color",[newColor,features.get("color")[1]]);
  updateBase();
  updateAsset("top",features.get("top"));
  updateAsset("bottom",features.get("bottom"));
}

function updateSecondary(newColor) {
  updateBorders(features.get("color")[1]+"2",newColor+"2");
  features.set("color",[features.get("color")[0],newColor]);
  updateBase();
  updateAsset("effect",features.get("effect"));
  updateAsset("eye",features.get("eye"));
}

function updateBase() {
  document.getElementById("base").src = "phantom_assets/base/"+features.get("color")[0]+".png";
}

function updateAsset(type, asset) {
  temp = asset;
  if (asset == "none") {
    document.getElementById(type).src = "misc_assets/empty.png"; 
  }

  else if (type == "eye" || type == "effect") {
    document.getElementById(type).src = "phantom_assets/"+type+"/"+asset+"/"+features.get("color")[1]+".png";
    if (asset == "glow") {
      document.getElementById(type).style.zIndex = "5";
    }
    else if (asset == "freckle") {
	document.getElementById(type).style.zIndex = "35";
    }
    else { document.getElementById(type).style.zIndex = "50"; }
  }

  else {
    if (asset.includes("top")) { temp = asset.substring(4); }
    else { temp = asset.substring(7); }
    document.getElementById(type).src = "phantom_assets/"+type+"/"+temp+"/"+features.get("color")[0]+".png";
  }

  updateBorders(features.get(type),asset);
  features.set(type,asset);
}

function mergeImages(type) {
if (features.get("effect") == "glow") { hasGlow = true; }
else { hasGlow = false; }
if (features.get("effect") == "freckle") { hasFreckle = true; }
else { hasFreckle = false; }
var c=document.getElementById("phantom_canvas");
var ctx=c.getContext("2d");
ctx.clearRect(0, 0, phantom_canvas.width, phantom_canvas.height);
var top = new Image();
var bottom = new Image();
var base = new Image();
var eye = new Image();
var effect = new Image();
var watermark = new Image();
if (hasGlow) {
effect.src = document.getElementById("effect").src;
effect.onload = function() {
  ctx.drawImage(effect,0,0);
  }
}
top.src = document.getElementById("top").src;
top.onload = function() {
   ctx.drawImage(top,0,0);
   bottom.src = document.getElementById("bottom").src;
   bottom.onload = function() {
      ctx.drawImage(bottom,0,0);
      base.src = document.getElementById("base").src;
      base.onload = function() {
 	ctx.drawImage(base,0,0);
	if (hasFreckle) {
 	  effect.src = document.getElementById("effect").src;
	  effect.onload = function() {
	    ctx.drawImage(effect,0,0);
            }
          }
 	eye.src = document.getElementById("eye").src;
	eye.onload = function() {
	  ctx.drawImage(eye,0,0);
          if (!hasGlow && !hasFreckle) {
 	  effect.src = document.getElementById("effect").src;
	  effect.onload = function() {
	    ctx.drawImage(effect,0,0);
            }
          }
	    watermark.src = document.getElementById("watermark").src;
	    watermark.onload = function() {
	      ctx.drawImage(watermark,0,0);  
	      var image = phantom_canvas.toDataURL("image/png");
		if (type == "new_tab") { 
		  var newTab = window.open();
		  newTab.document.write('<img src="'+image+'" width="1000" height="1000"/>');
		  }
  		else { 
		  var a  = document.createElement('a');
   	  	  a.href = image;
		  a.download = "phantom.png"; 
    		  a.click();
	      
	    }
	  }
	}	
      }
    }
  }
}
