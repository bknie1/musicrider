/*
PaperScript is the plain old JavaScript that you are used to, 
with added support of mathematical operators (+ - * / %) for Point and Size objects. 
PaperScript code is automatically executed in its own scope that without polluting 
with the global scope still has access to all the global browser objects and functions, such as document or window.

By default, the Paper.js library only exports one object into the global scope: the 
paper object. It contains all the classes and objects that the library defines. When working with PaperScript, the user does not need to care about this though, because inside PaperScript code, through the use of clever scoping, all of paper's objects and functions seem global.

PaperScript also offers automatic creation of Project, View and mouse Tool objects, 
and simplifies the installation of event handlers for these.
*/

/* Declarations --------------------------------------------------------------- */
var isLoopStarted = false;
var isLoopToggled = false;
var radiusLower = 70;
var radiusUpper = 200;
var shapes = [];
var colors = [ '#BB38A5', '#99258A', '#3D2245', '#FD2071', '#49648B', '#383B6A', '#FCFADB' ];

/* Background Music */

var soundBassBg = new Howl({
	src: [ '/sounds/MikeOst-SynthwavePack/Loops/Music_Loops/LSC_100_Bass_Loop_02_Cm.wav' ],
	loop: true
});

var soundLeadBg1 = new Howl({
	src: [ '/sounds/MikeOst-SynthwavePack/Loops/Music_Loops/LSC_100_Synth_Loop_03_Cm.wav' ],
	loop: true
});

var soundLeadBg2 = new Howl({
	src: [ '/sounds/MikeOst-SynthwavePack/Loops/Music_Loops/LSC_100_Synth_Loop_04_Cm.wav' ],
	loop: true
});

var soundLeadBg3 = new Howl({
	src: [ '/sounds/MikeOst-SynthwavePack/Loops/Music_Loops/LSC_100_Synth_Loop_06_Cm.wav' ],
	loop: true
});

var soundBassHighBpmBg = new Howl({
	src: [ '/sounds/MikeOst-SynthwavePack/Loops/Music_Loops/LSRW_128_Bass_Loop_07_Dm' ],
	loop: true
});

var soundLeadHighBpmBg1 = new Howl({
	src: [ '/sounds/MikeOst-SynthwavePack/Loops/Music_Loops/LSRW_128_Bass_Loop_08_Dm.wav' ],
	loop: true
});

var soundLeadHighBpmBg3 = new Howl({
	src: [ '/sounds/MikeOst-SynthwavePack/Loops/Music_Loops/LSRW_128_Synth_Loop_12_Dm.wav' ],
	loop: true
});

/* Player Sounds */
soundDict = [];

setSoundDictionary();

function setSoundDictionary() {
	soundDict['1'] = '/sounds/MikeOst-SynthwavePack/One-Shots/Snares/LSC_Snare_01.wav';
	soundDict['2'] = '/sounds/MikeOst-SynthwavePack/One-Shots/Snares/LSC_Snare_02.wav';
	soundDict['3'] = '/sounds/MikeOst-SynthwavePack/One-Shots/Snares/LSC_Snare_03.wav';
	soundDict['4'] = '/sounds/MikeOst-SynthwavePack/One-Shots/Snares/LSC_Snare_04.wav';
	soundDict.q = '/sounds/MikeOst-SynthwavePack/One-Shots/Percussions/LSC_Perc_01.wav';
	soundDict.w = '/sounds/MikeOst-SynthwavePack/One-Shots/Percussions/LSC_Perc_02.wav';
	soundDict.e = '/sounds/MikeOst-SynthwavePack/One-Shots/Percussions/LSC_Perc_03.wav';
	soundDict.r = '/sounds/MikeOst-SynthwavePack/One-Shots/Percussions/LSC_Perc_04.wav';
	soundDict.a = '/sounds/MikeOst-SynthwavePack/One-Shots/Percussions/LSC_Perc_05.wav';
	soundDict.s = '/sounds/MikeOst-SynthwavePack/One-Shots/Percussions/LSC_Perc_06.wav';
	soundDict.d = '/sounds/MikeOst-SynthwavePack/One-Shots/Percussions/LSC_Perc_07.wav';
	soundDict.f = '/sounds/MikeOst-SynthwavePack/One-Shots/Percussions/LSC_Perc_08.wav';
	soundDict.z = '/sounds/MikeOst-SynthwavePack/One-Shots/Percussions/LSC_Perc_09.wav';
	soundDict.x = '/sounds/MikeOst-SynthwavePack/One-Shots/Percussions/LSC_Perc_10.wav';
	soundDict.c = '/sounds/MikeOst-SynthwavePack/One-Shots/Kicks/LSC_Kick_03.wav';
	soundDict.v = '/sounds/MikeOst-SynthwavePack/One-Shots/Kicks/LSC_Kick_02.wav';
	soundDict.space = '/sounds/MikeOst-SynthwavePack/One-Shots/Kicks/LSC_Kick_01.wav';

	/* Touch Mappings */
	soundDict['area2'] = '/sounds/MikeOst-SynthwavePack/One-Shots/Snares/LSC_Snare_01.wav';
	soundDict['area3'] = '/sounds/MikeOst-SynthwavePack/One-Shots/Snares/LSC_Snare_02.wav';
	soundDict['area4'] = '/sounds/MikeOst-SynthwavePack/One-Shots/Snares/LSC_Snare_03.wav';
	soundDict['area5'] = '/sounds/MikeOst-SynthwavePack/One-Shots/Snares/LSC_Snare_04.wav';
	soundDict['area6'] = '/sounds/MikeOst-SynthwavePack/One-Shots/Percussions/LSC_Perc_01.wav';
	soundDict['area7'] = '/sounds/MikeOst-SynthwavePack/One-Shots/Percussions/LSC_Perc_02.wav';
	soundDict['area8'] = '/sounds/MikeOst-SynthwavePack/One-Shots/Percussions/LSC_Perc_03.wav';
	soundDict['area9'] = '/sounds/MikeOst-SynthwavePack/One-Shots/Percussions/LSC_Perc_04.wav';
	soundDict['area10'] = '/sounds/MikeOst-SynthwavePack/One-Shots/Percussions/LSC_Perc_05.wav';
	soundDict['area11'] = '/sounds/MikeOst-SynthwavePack/One-Shots/Percussions/LSC_Perc_06.wav';
	soundDict['area12'] = '/sounds/MikeOst-SynthwavePack/One-Shots/Percussions/LSC_Perc_07.wav';
	soundDict['area13'] = '/sounds/MikeOst-SynthwavePack/One-Shots/Percussions/LSC_Perc_08.wav';
	soundDict['area14'] = '/sounds/MikeOst-SynthwavePack/One-Shots/Percussions/LSC_Perc_09.wav';
	soundDict['area15'] = '/sounds/MikeOst-SynthwavePack/One-Shots/Percussions/LSC_Perc_10.wav';
	soundDict['area16'] = '/sounds/MikeOst-SynthwavePack/One-Shots/Kicks/LSC_Kick_03.wav';
	soundDict['area17'] = '/sounds/MikeOst-SynthwavePack/One-Shots/Kicks/LSC_Kick_02.wav';
	soundDict['area18'] = '/sounds/MikeOst-SynthwavePack/One-Shots/Kicks/LSC_Kick_01.wav';
}

/* Methods --------------------------------------------------------------------- */
function playSound(soundToPlay) {
	console.log('Sound to play: ' + soundToPlay);

	var tempSound = new Howl({
		src: [ soundToPlay ]
	});

	tempSound.play();
}

function startLoop() {
	soundBassBg.play();
	soundLeadBg1.play();
	soundLeadBg2.play();
	soundLeadBg3.play();
	isLoopStarted = true;
}

function toggleBackgroundMusic() {
	// Toggle loop
	if (!isLoopToggled) {
		isLoopToggled = true;
		soundBassBg.stop();
		soundLeadBg1.stop();
		soundLeadBg2.stop();
		soundLeadBg3.stop();
		soundBassHighBpmBg.play();
		soundLeadHighBpmBg1.play();
		soundLeadHighBpmBg3.play();
	} else {
		isLoopToggled = false;
		soundBassHighBpmBg.stop();
		soundLeadHighBpmBg1.stop();
		soundLeadHighBpmBg3.stop();
		soundBassBg.play();
		soundLeadBg1.play();
		soundLeadBg2.play();
		soundLeadBg3.play();
	}
}

document.getElementById('area1').onclick = function() {
	toggleBackgroundMusic();
};

function onKeyDown(event) {
	if (!isLoopStarted) {
		startLoop();
	} else if (event.key === 'alt') {
		toggleBackgroundMusic();
	} else {
		playSound(soundDict[event.key]);
		createShape();
	}
}

function onTouchStart(event) {
	createShape();
}

function createShape() {
	shapes.push(
		circleFactory.newCircle(
			randomColorFromArray(),
			randomCoord(innerWidth),
			randomCoord(innerHeight),
			randomRadius()
		)
	);
}

function onFrame(event) {
	for (var i = 0; i < shapes.length; i++) {
		shapes[i].fillColor.hue += 1;
		shapes[i].scale(0.9);
	}

	if (circles[i].area < 1) {
		circles[i].remove();
		circles.splice(i, 1);
		console.log(circles);
	}
}

function randomShape() {
	v = Math.random() * (100 - 1) + 1;
	return v;
}

function randomColor() {
	var color = '#' + ((Math.random() * 0xffffff) << 0).toString(16);
	return color;
}

function randomColorFromArray() {
	var v = Math.floor(Math.random() * colors.length);
	return colors[v];
}

function randomCoord(dimensionMax) {
	var c = Math.random() * dimensionMax;
	return c;
}

function randomRadius() {
	var r = Math.random() * (radiusUpper - radiusLower) + radiusLower;
	return r;
}

var circleFactory = {
	newCircle: function(color, x, y, r) {
		var c = new Path.Circle(new Point(x, y), r);
		c.fillColor = color;
		return c;
	}
};

/* Area Bind Logic */
bindButtons();

function bindButtons() {
	document.getElementById('area2').onclick = function() {
		playSound(soundDict['area2']);
	};

	document.getElementById('area3').onclick = function() {
		playSound(soundDict['area3']);
	};

	document.getElementById('area4').onclick = function() {
		playSound(soundDict['area4']);
	};

	document.getElementById('area5').onclick = function() {
		playSound(soundDict['area5']);
	};

	document.getElementById('area6').onclick = function() {
		playSound(soundDict['area6']);
	};

	document.getElementById('area7').onclick = function() {
		playSound(soundDict['area7']);
	};

	document.getElementById('area8').onclick = function() {
		playSound(soundDict['area8']);
	};

	document.getElementById('area9').onclick = function() {
		playSound(soundDict['area9']);
	};

	document.getElementById('area10').onclick = function() {
		playSound(soundDict['area10']);
	};

	document.getElementById('area11').onclick = function() {
		playSound(soundDict['area11']);
	};

	document.getElementById('area12').onclick = function() {
		playSound(soundDict['area12']);
	};

	document.getElementById('area13').onclick = function() {
		playSound(soundDict['area13']);
	};

	document.getElementById('area14').onclick = function() {
		playSound(soundDict['area14']);
	};

	document.getElementById('area15').onclick = function() {
		playSound(soundDict['area15']);
	};

	document.getElementById('area16').onclick = function() {
		playSound(soundDict['area3']);
	};

	document.getElementById('area17').onclick = function() {
		playSound(soundDict['area17']);
	};

	document.getElementById('area18').onclick = function() {
		playSound(soundDict['area18']);
	};
}

/* Tap and Fade Logic */

/* Pattern Logic */
// var r = 70;

// for (var w = 0; w < innerWidth; w += 100) {
// 	for (var h = 0; h < innerHeight; h += 100) {
// 		circleFactory.newCircle(randomColor(), w, h, r);
// 	}
// }
