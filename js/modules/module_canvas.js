define(function(){
	"use strict";

	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var raf;
	var particles = {};
	var particleIndex = 0;
	var settings = {
		density: 1,
		particleSize: 5,
		startingX: canvas.width / 2,
		startingY: canvas.height / 4,
		groundLevel: canvas.height,
		leftWall: canvas.width * 0.1,
		rightWall: canvas.width,
		w:200,
		h:200,
		currentDelete:0
	};

	var seedsX = [];
	var seedsY = [];
	var maxAngles = 100;
	var currentAngle = 0;

	function seedAngles() {
		seedsX = [];
		seedsY = [];
		for (var i = 0; i < maxAngles; i++){
			seedsX.push(Math.random() * 20 - 5);
			seedsY.push(Math.random() * 20 - 5);
		}
	}

	seedAngles();

	function Particle(startX, startY, w, h) {
		this.x = startX;
		this.y = startY;
		this.vw = w;
		this.vh = h;
		this.vx = seedsX[currentAngle];
		this.vy = seedsY[currentAngle];

		currentAngle++;

		particleIndex ++;
		particles[particleIndex] = this;
		this.id = particleIndex;
	}

	Particle.prototype.draw = function() {
		this.x += this.vx;
		this.y += this.vy;

		if(this.x + this.vx + this.vw > canvas.width || this.x + this.vx < 0) this.vx = -this.vx;
		if(this.y + this.vy + this.vh > canvas.height || this.y + this.vy < 0) this.vy = -this.vy;

		context.clearRect(settings.leftWall, settings.groundLevel, canvas.width, canvas.height);
		context.beginPath();
		context.fillStyle="#FF0000";
		context.rect(this.x, this.y, this.vw, this.vh);
		context.closePath();
		context.fill();
	}

	function animationFrame(){
		context.fillStyle = "rgba(10,10,10,0.8)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#fff";
        context.fillRect(0, 0, settings.leftWall, canvas.height);
        context.fillRect(settings.rightWall, 0, canvas.width, canvas.height);
        context.fillRect(0, settings.groundLevel, canvas.width, canvas.height);

		for (var i in particles){
			if(i>settings.currentDelete) particles[i].draw();
		}

		raf = window.requestAnimationFrame(animationFrame);
	}


	var Canvas = function(){
		var _that = this;
		_that.startIS = false;
		_that.animateIS = false;
		_that.particleLen = 1;
		return this
	}
	Canvas.prototype.init = function(){
		var _that = this;
		return _that;
	}
	Canvas.prototype.start = function(){
		var _that = this;

		if(!_that.startIS){
			_that.startIS = true;
			_that.animateIS = true;
			new Particle((canvas.width / 2) - (settings.w / 2), (canvas.height / 2) - (settings.h / 2), settings.w, settings.h);
			raf = window.requestAnimationFrame(animationFrame);
		}
	}
	Canvas.prototype.stop = function(){
		var _that = this;
		if(_that.startIS){
			if(_that.animateIS){
				_that.animateIS = false;
				window.cancelAnimationFrame(raf);
			}else{
				_that.animateIS = true;
				raf = window.requestAnimationFrame(animationFrame);
			}
		}
	}
	Canvas.prototype.particle = function(){
		var _that = this;
		settings.currentDelete = _that.particleLen;
		_that.particleLen *= 4;

		settings.w /= 2;
		settings.h /= 2;

		for (var i = 0; i < _that.particleLen; i++){
			new Particle(Math.random() * canvas.width - settings.w, Math.random() * canvas.height - settings.h, settings.w, settings.h);
		}
	}
	Canvas.prototype.clearAnimate = function(){
		var _that = this;
		if(_that.startIS){
			_that.startIS = false;
			context.clearRect(0, 0, canvas.width, canvas.height);
			particles = {};
			settings.w = 200;
			settings.h = 200;
			window.cancelAnimationFrame(raf);
		}
	}
	
	return Canvas;
});
