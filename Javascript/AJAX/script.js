
function load(){
	document.getElementById('cont').innerText = 'Success';        
}

function success(){
	console.log(this);
	load()
};


function error(err){
	console.log('An Error:', err)
};

var xhr = new XMLHttpRequest();
xhr.onload = success;
xhr.onerror = error;
xhr.open('GET', 'https://ceravolo.di.unimi.it/teaching.html');
xhr.send();