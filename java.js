const TypeWriter = function(txtElement, words, wait = 3000){
	this.txtElement = txtElement;
	this.words = words;
	this.txt = '';
	this.wordIndex = 0;
	this.wait = parseInt(wait, 10);
	this.type();
	this.isDeleting = false;
}


//Type Method
TypeWriter.prototype.type = function() {
	//current index of word
	const current = this.wordIndex % this.words.length;

	//get full yexy of current word
	const fullTxt = this.words[current];

	//check if deleting
	if(this.isDeleting) {
		//remove char
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		//add char
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

	//type speed
	let typeSpeed = 7000;

	if(this.isDeleting) {
		typeSpeed /= 3;
	}

	//if words is complete

	if(!this.isDeleting && this.txt === fullTxt) {
		//make pause at end
		typeSpeed= this.wait;
		this.isDeleting = true;
	} else if(this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		this.wordIndex++;
		//pause before type
		typeSpeed = 30000;

	}

	setTimeout(() => this.type(), 500);
}


document.addEventListener('DOMContentLoaded', init);


//init on DOM Load
function init(){
	const txtElement = document.querySelector('.txt-type');
	const words = JSON.parse(txtElement.getAttribute('data-words'));
	const wait = txtElement.getAttribute('data-wait');
	//Init Typewriter 
	new TypeWriter(txtElement, words, wait);
}

