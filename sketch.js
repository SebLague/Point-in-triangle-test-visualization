var rad = 10;
var padding = 20;
var screenSize;

var A = vec(300,900);
var B = vec(700,300);
var C = vec(1000,750);//
var P = vec (400,500);
var weightsPos= vec(0,0);
var controlTriPoints = false;

function setup() {
  createCanvas(windowWidth-padding, windowHeight-padding);
  setTrianglePoints(windowWidth-padding, windowHeight-padding);
}

function draw() {//
    background(15.0);
    P = vec(mouseX,mouseY);

	stroke(90);//
	strokeWeight(rad*.6);
    line(A.x,A.y,B.x,B.y,rad);//
    line(A.x,A.y,C.x,C.y,rad);
    line(C.x,C.y,B.x,B.y,rad);
	
	stroke(255);
    strokeWeight(5);
    
	ellipse(A.x,A.y,rad*2,rad*2);
	ellipse(B.x,B.y,rad*2,rad*2);
	ellipse(C.x,C.y,rad*2,rad*2);
    
    noStroke();
    fill(255,0,0);
	if (inTri()){
		fill(0,255,0);
	}
    ellipse(P.x,P.y,rad*2,rad*2);
 
	// Draw weights
    var w1 = ((A.x-P.x) * (A.y-C.y) + (C.x-A.x) * (A.y-P.y)) / (-B.x*(A.y-C.y) - B.y*(C.x-A.x) - A.x*C.y + A.y*C.x);
    var w2 = (A.y + (B.y-A.y)*w1 -P.y)/(A.y-C.y);
    
    var ac = vec (C.x-A.x,C.y-A.y);
    var ab = vec(B.x-A.x,B.y-A.y);
	

    textSize(screenSize*.06);
	fill('#15b5ff');
	var dPlaces = 2;
	text("w₁ : " + Math.round(w1*Math.pow(10,dPlaces))/Math.pow(10,dPlaces), weightsPos.x,weightsPos.y)
	fill('#ff3333');
	text("w₂ : " + Math.round(w2*Math.pow(10,dPlaces))/Math.pow(10,dPlaces), weightsPos.x,weightsPos.y+screenSize*.1)

	
	// Draw points
	fill(255);
	textSize(screenSize*.06);
	text("A", A.x-55,A.y-10);
	text("B", B.x+25,B.y);
	text("C", C.x+25,C.y+30);
	text("P", P.x-10,P.y-20);

	
		// Draw arrows
	var arrowLen = 30;
	var arrowAng = 150 * Math.PI/180;
	stroke('#15b5ff');
	strokeWeight(rad);
	line(A.x,A.y,A.x+ab.x*w1,A.y+ab.y*w1);
	var arrowAngle = Math.atan2(ab.y,ab.x);
	var arrowDir = vec(Math.cos(arrowAngle + arrowAng), Math.sin(arrowAngle + arrowAng));
	var arrowDir2 = vec(Math.cos(arrowAngle - arrowAng), Math.sin(arrowAngle-arrowAng));
	line(A.x+ab.x*w1,A.y+ab.y*w1,A.x+ab.x*w1 + arrowDir.x * arrowLen,A.y+ab.y*w1+ arrowDir.y * arrowLen);
	line(A.x+ab.x*w1,A.y+ab.y*w1,A.x+ab.x*w1 + arrowDir2.x * arrowLen,A.y+ab.y*w1+ arrowDir2.y * arrowLen);//


	

	var arrowAngle = Math.atan2(ac.y,ac.x);
	var arrowDir = vec(Math.cos(arrowAngle + arrowAng), Math.sin(arrowAngle + arrowAng));
	var arrowDir2 = vec(Math.cos(arrowAngle - arrowAng), Math.sin(arrowAngle-arrowAng));
	
	var showVecFromHead = false;
	if (showVecFromHead) {
		stroke('#ff5555');
		line(A.x+ab.x*w1, A.y + ab.y*w1,P.x,P.y); // to P
		line(P.x,P.y,P.x + arrowDir.x * arrowLen,P.y + arrowDir.y * arrowLen);
		line(P.x,P.y,P.x+ arrowDir2.x * arrowLen,P.y+ arrowDir2.y * arrowLen);//
	}
	
	stroke('#ff3333');
	line(A.x,A.y,A.x+ac.x*w2,A.y+ac.y*w2);
	line(A.x+ac.x*w2,A.y+ac.y*w2,A.x+ac.x*w2 + arrowDir.x * arrowLen,A.y+ac.y*w2+ arrowDir.y * arrowLen);
	line(A.x+ac.x*w2,A.y+ac.y*w2,A.x+ac.x*w2 + arrowDir2.x * arrowLen,A.y+ac.y*w2+ arrowDir2.y * arrowLen);//
	
}

function inTri() {
    var v = ((A.x-P.x) * (A.y-C.y) + (C.x-A.x) * (A.y-P.y)) / (-B.x*(A.y-C.y) - B.y*(C.x-A.x) - A.x*C.y + A.y*C.x);
    var w = (A.y + (B.y-A.y)*v -P.y)/(A.y-C.y);
    return v>=0 && w >=0 && (v+w) <= 1;
}

function inTri2(A,B,C,D) {
    return sideLine(A,B,D) == sideLine(A,B,C) && sideLine(A,C,D) == sideLine(A,C,B) && sideLine(C,B,D) == sideLine(C,B,A);
}

function sideLine(A, B, C) {
    return Math.sign((C.x-A.x) * (-B.y+A.y) + (C.y-A.y) * (B.x-A.x));
}

function vec(a,b) {
    var c = {x:a,
             y:b,
            };
    
    return c;
}
    
function dirVec(a,b) {
    var mag = Math.pow(a*a+b*b,.5);
    
    var c = {x:a/mag,
             y:b/mag,
            };
    
    return c;
}

function setTrianglePoints(w, h) {
	A = vec(w*.2,h*.8);
	B = vec(w*.4,h*.3);
	C = vec(w*.8,h * .5);
	weightsPos = vec(w*.1,h*.15);
	screenSize = Math.min(w,h);
}

function windowResized() {
	resizeCanvas(windowWidth-padding, windowHeight-padding);
	setTrianglePoints(windowWidth-padding,windowHeight-padding);
}