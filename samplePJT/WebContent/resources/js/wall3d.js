(function(){
	const houseElem = document.querySelector('.house');
	let maxScrollVal = document.body.offsetHeight-window.innerHeight
	
	window.addEventListener('scroll', function(){
		// 1000하면 완전 끝까지 간다..ㅋ
		const zMove = (pageYOffset / maxScrollVal * 970) - 490;
		houseElem.style.transform = 'translateZ('+ zMove +'vw)';
		
	});
})();