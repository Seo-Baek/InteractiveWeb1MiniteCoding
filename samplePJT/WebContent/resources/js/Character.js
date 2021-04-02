function Character(props){
	this.mainElem = document.createElement('div');
	this.mainElem.classList.add('character');
	//백틱 사용 시 엔터 막치면서 html 작성 가능 ㅎ
	this.mainElem.innerHTML = ''
		 + '<div class="character-face-con character-head">'
            + '<div class="character-face character-head-face face-front"></div>'
            + '<div class="character-face character-head-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-torso">'
            + '<div class="character-face character-torso-face face-front"></div>'
            + '<div class="character-face character-torso-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-arm character-arm-right">'
            + '<div class="character-face character-arm-face face-front"></div>'
            + '<div class="character-face character-arm-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-arm character-arm-left">'
            + '<div class="character-face character-arm-face face-front"></div>'
            + '<div class="character-face character-arm-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-leg character-leg-right">'
            + '<div class="character-face character-leg-face face-front"></div>'
            + '<div class="character-face character-leg-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-leg character-leg-left">'
            + '<div class="character-face character-leg-face face-front"></div>'
            + '<div class="character-face character-leg-face face-back"></div>'
        + '</div>';
	document.querySelector('.stage').appendChild(this.mainElem);
	this.mainElem.style.left = props.xPos + '%';
	// 스크롤 중인지 아닌지
	this.scrollState = false ;
	this.lastScrollTop = 0;
	this.xPos = props.xPos;
	this.speed = props.speed;
	this.direction;
	//좌우 이동 중인지 아닌지
	this.runningState = false;
	this.init();
}

Character.prototype = {
	constructor : Character,
	init : function(){
		const self = this;
		window.addEventListener('scroll', function(){
			// scroll 중에 계속 여기로 들어오니까 0.5초 뒤에 timeout 함수가 실행될 수 없음
			clearTimeout(self.scrollState);
			
			if(!self.scrollState){
				self.mainElem.classList.add('running');
				console.log('running클래스 붙음')
			}
			self.scrollState = setTimeout(function(){
				self.scrollState = false;
				self.mainElem.classList.remove('running');
			},100);
			
			// 스크롤을 내릴 수록 pageYOffset이 커진다.
			if(self.lastScrollTop > pageYOffset){
				self.mainElem.setAttribute('data-direction','backward');
			} else {
				self.mainElem.setAttribute('data-direction','forward');
				/*현재값 :  4759 , 나중값 :  4760*/
			}
			self.lastScrollTop = pageYOffset;
		});
		window.addEventListener('keydown',function(e){
			if(self.runningState) return;
			if(e.keyCode == '100' || e.keyCode == '37' || e.keyCode == '52' || e.keyCode == '37'){
				self.direction = 'left'; 
			} else if(e.keyCode == '102' || e.keyCode == '39' || e.keyCode == '54' || e.keyCode == '39'){
				self.direction = 'right';
			} else {
				return;
			}
			self.mainElem.classList.add('running');
			self.mainElem.setAttribute('data-direction',self.direction);
			self.mainElem.classList.add('running');
			self.run(self);
			self.runningState = true;
		});
		window.addEventListener('keyup', function(e){
			self.mainElem.classList.remove('running');
			cancelAnimationFrame(self.rafId);
			self.runningState = false;
		});
		
	},
	run : function(self){
		console.log(self.xPos);
		//const self = this; // 2번 방법에는 이 줄이 필요함. this로 바인딩만 시켜준거니까.
		//1. 의 방법을 사용하기로 한다.
		if(self.direction == 'left'){
			self.xPos -= self.speed;
		} else if(self.direction == 'right') {
			self.xPos += self.speed;
		}
		
		if(self.xPos < 2)  self.xPos = 2;
		if(self.xPos > 88) self.xPos = 88;
		
		self.mainElem.style.left = self.xPos+'%';
		//1. param으로 줄것
		self.rafId = requestAnimationFrame(function(){
			self.run(self); // run함수를 실행시킬 때마다 this에 해당하는 인자를 주어야한다.
		});
		//2. 호출관계에 관계없이 this 바인딩하기
		//   옛날에는 bind 함수가 문제가 많았으나 현재는 별로 문제가 없어서 사용가능하다고 함
		//self.rafId = requestAnimationFrame(self.run.bind(self));// 첫번째 인자가 this가 되는 함수
	}
}