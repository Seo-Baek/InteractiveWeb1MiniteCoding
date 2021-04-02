(function(){
	
	const houseElem = document.querySelector('.house');
	const stageElem = document.querySelector('.stage');
	const barElem = document.querySelector('.progress-bar');
	const selectElem = document.querySelector('.select-character');
	const mousePos = {x: 0, y: 0};
	let maxScrollVal = 0;
	
	function resizeHandler(){
		console.log(pageYOffset);
		maxScrollVal = document.body.offsetHeight-window.innerHeight;
	}
	
	window.addEventListener('scroll', function(){
		// 1000하면 완전 끝까지 간다..ㅋ
		const scrollPer = pageYOffset / maxScrollVal;
		const zMove = (scrollPer * 970) - 490;
		houseElem.style.transform = 'translateZ('+ zMove +'vw)';
		
		//progress bar
		barElem.style.width = (scrollPer * 100) + '%';
		
	});
	window.addEventListener('resize',resizeHandler);
	
	window.addEventListener('mousemove', function(e){
		mousePos.x = -1 +(e.clientX / window.innerWidth) * 2;
		mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
		// roatateX < X축을 기준으로 시점 변화(세로변화), rotateY는 Y축을 기준으로 시점 변화(가로변화)
		stageElem.style.transform = 'rotateX('+ (mousePos.y*10) +'deg)'
										+' rotateY('+ (mousePos.x*10) +'deg)';
	});
	stageElem.addEventListener('click', function(e){
		// 다른 속성도 추가할 수 있으니 객체로 파람값 설정
		new Character({
			xPos : e.clientX / window.innerWidth * 100,
			speed : Math.random() * 0.5 + 0.2
		});
	});
	
	selectElem.addEventListener('click',function(e){
		const value = e.target.getAttribute('data-char');
		document.body.setAttribute('data-char',value);
	});
	resizeHandler();
})();