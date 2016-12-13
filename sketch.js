var circles = [];
var max_width = 400;
var circleButtons = [];
var game;
var num_circles = 0;
var myCanvas;
var rgb = [255, 255, 255];
var bigtheme;
var pickedColor;
var descend = 0;
var theme2Color = [0,0,0]
var toolstate = 1;
var counter = 0;
var default_random_upperbound = 4;
var default_frequency = 3;
var themes = [];
var switcher=0;
var random_slider;
var frequency_slider;
var start_draw = 0;
var stop_draw = 0;
var minButtonBox, minButton;
var originalHue=0;
var originalSaturation=0;


function setup() {

  myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent('mainContainer');
	themes.push(select('#theme1Bubble'));
	themes.push(select('#theme2Bubble'));
	themes.push(select('#theme3Bubble'));
	themes.push(select('#theme4Bubble'));
	bigtheme = select('#tools');
	minButtonBox = select('#minbtncntnr');
	minButton = select('#minimizeButton');
	
  random_slider = createSlider(default_random_upperbound, 255, default_random_upperbound);
  random_slider.size(select('#randomnessSlider').width - 20);
  random_slider.parent('randomnessSlider');
  
  frequency_slider = createSlider(1, 15, default_frequency);
  frequency_slider.size(select('#frequencySlider').width - 20);
  frequency_slider.parent('frequencySlider');
	
	makeButtons();
	//makeThemes();
	game = new gameState();
	//console.l90og(game)
	selectTheme(0);
  frameRate(15);
}

function selectTheme(themeId) {
	var gg;
	themes[themeId].elt.style.border = "2px solid #0000ff";
	game.theme = themeId;
	for (gg = 0; gg < themes.length; gg++) {
		if (gg != themeId) {
			themes[gg].elt.style.border = "1px solid #4e6096";
		}
	}
	originalHue = 0;
	originalSaturation = 0;
	console.log(game.theme);
}

function makeButtons() {
	/*
	generate_button = createButton("Generate");
  generate_button.parent('button1');
  generate_button.mousePressed(startDraw);
	generate_button.addClass('myButton');
 
  stop_button = createButton("Stop");
  stop_button.parent('button2');
  stop_button.mousePressed(stopDraw);
	stop_button.addClass('myButton');
  
	save_button = createButton("Save");
  save_button.parent('button3');
  save_button.mousePressed(saveScreenShot);
	save_button.addClass('myButton');

	reset_button = createButton("Reset");
  reset_button.parent('button4');
  reset_button.mousePressed(reset);
	reset_button.addClass('myButton');
	*/
	

}

function reset(){
		circles.length = 0;
		background(255);
}

function saveScreenShot() {
		saveCanvas();
}

function startDraw() {
  start_draw = 1;
	stop_draw = 0;
	originalHue = 0;
	originalSaturation = 0;
	writeColor(cp);
}

function stopDraw() {
  stop_draw = 1;
	start_draw = 0;
}

function colourshift(themeType) {
	
  rand = round(random(0,2));
	
	if(themeType==0) {
		quantity = round(random(0,random_slider.value()));
		if((rgb[rand]+quantity)>=255) descend = 1;

		if((rgb[rand]-quantity)<=0)   descend = 0;

		if(descend == 0) {
			rgb[rand] += quantity;
		}
		if(descend == 1) {
			rgb[rand] -= quantity;
		}
	} else if(themeType==1) {
		theme2Color = rgbToHsl(rgb);
		if (originalHue==0 && originalSaturation==0) {
			originalHue = theme2Color[1];
			originalSaturation = theme2Color[2];
		}
		quantity = round(random(0,random_slider.value()));

		if(theme2Color[0]-quantity<=0) descend = 0;
		if(theme2Color[0]+quantity>360) descend = 1;

		if(descend) theme2Color[0] -= quantity;
		else if(descend==0) theme2Color[0]+=quantity;

		rgb = hslToRgb(theme2Color[0],originalHue,originalSaturation);
	}
	
	
	else if(themeType==2) {
		theme2Color = rgbToHsl(rgb);
		if (originalHue==0 && originalSaturation==0) {
			originalHue = theme2Color[0];
			originalSaturation = theme2Color[2];
		}
		quantity = round(random(0,random_slider.value()));

		if(theme2Color[1]-quantity<=0) descend = 0;
		if(theme2Color[1]+quantity>100) descend = 1;

		if(descend) theme2Color[1] -= quantity;
		else if(descend==0) theme2Color[1]+=quantity;

		rgb = hslToRgb(originalHue,theme2Color[1],originalSaturation);	
	}
	
	else if(themeType==3) {
		theme2Color = rgbToHsl(rgb);
		if (originalHue==0 && originalSaturation==0) {
			originalHue = theme2Color[0];
			originalSaturation = theme2Color[1];
		}
		quantity = round(random(0,random_slider.value()));

		if(theme2Color[2]-quantity<=0) descend = 0;
		if(theme2Color[2]+quantity>100) descend = 1;

		if(descend) theme2Color[2] -= quantity;
		else if(descend==0) theme2Color[2]+=quantity;

		rgb = hslToRgb(originalHue,originalSaturation,theme2Color[2]);	
	}
	 
}


function hslToRgb(h, s, l){
		h /= 360, s/= 100, l/= 100;
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHsl(colorsample){
	  r = red(colorsample)
		g = green(colorsample)
		b = blue(colorsample)

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
}

function expand(operativeCircle) {
  if(operativeCircle.width < operativeCircle.max_width) {
        operativeCircle.width += map(operativeCircle.width, operativeCircle.max_width, 0, 1, 5);
  } else {
		//circles.splice(indexOf(operativeCircle,1));
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
	for(var i=0; i<circles.length; i++) {
			circles[i].x = myCanvas.width/2;
			circles[i].y = myCanvas.height/2;
	}
	random_slider.size(select('#randomnessSlider').width-20)
	frequency_slider.size(select('#frequencySlider').width-20)
}

function switchToolState(){
	if(toolstate==1) {
		bigtheme.hide();
		toolstate=0;
		minButtonBox.style("left", "2%");
		minButton.elt.innerHTML = "Show";

	} else if(toolstate==0) {
		bigtheme.show()
		toolstate = 1;
		minButtonBox.style("left", "75%");
		minButton.elt.innerHTML = "Hide";
	}
}

function writeColor(colorToWrite) {
	pickedColor = hexToRgb(colorToWrite.color);
	rgb[0] = pickedColor.r;
	rgb[1] = pickedColor.g;
	rgb[2] = pickedColor.b;
}

function checkBoundariesAndSketch() {
	d = int(dist(0, 0, windowWidth/2, windowHeight/2));
  for(var i=0; i<circles.length; i++) {
        expand(circles[i]);
				if(circles.length > 1 && i < circles.length-1 && circles[i].width<circles[i+1].width) { 
					circles.splice(i,1);
					expand(circles[i]);
				}
				if(circles[i].width/2>d) {
					circles.splice(i,1);
					expand(i)

				}
        circles[i].sketch();
      }
}

function addCircleToArray() {
	circles.push(new circle());
  circles[circles.length-1].rgb_=[rgb[0],rgb[1],rgb[2]];
}

function draw() {

	
	//draw circular buttons
	
	for(var h=0; h<circleButtons.length; h++) {
		circleButtons[h].sketch();
	}
	
	
  if(start_draw == 1) {
    
    if(stop_draw == 0) {
			
      colourshift(game.theme);
    
      period = map(frequency_slider.value(), 1, 15, 15, 1);
      if(counter%period == 0) {
				addCircleToArray();
      }
      counter++;
      
      if(circles.length > num_circles) {
        for(var j=0; j<circles.length-1; j++) {
          circles[j].max_width = circles[j+1].max_width;
        }
        max_width += 10;
        circles[circles.length-1].max_width = max_width;
      }
			
			checkBoundariesAndSketch();
			
				
      num_circles = circles.length;
      }
			
    } else {
      for(var i=0; i<circles.length; i++) {
        circles[i].sketch();
      }
    } 
}


function circle() {
	
  this.width = 10;
  this.x = myCanvas.width/2;
  this.y = myCanvas.height/2;
  this.rgb_ = [0,0,0];
  this.max_width = max_width;

  this.sketch = function() {
    noStroke();
    fill(this.rgb_)
    ellipse(this.x, this.y, this.width, this.width);
  }

}