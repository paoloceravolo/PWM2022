function load(data){
	//document.getElementById('cont').innerText = data[0].denominazione_centro; 
	data.forEach(function(val,ind){
		document.getElementById('cont').textContent += data[ind].denominazione_centro + ' ' + data[ind].comune; 
		document.getElementById('cont').appendChild(document.createElement('br'));
	});       
}

function success(){
	var data = JSON.parse(this.responseText);
	console.log('Ricevo:', this.status);
	console.log('da:', this.responseURL);
	//console.log(this.response);
	load(data)
};


function error(err){
	console.log('An Error:', err)
};

var xhr = new XMLHttpRequest();
console.log(xhr);
xhr.onload = success;
xhr.onerror = error;
//xhr.open('GET', 'https://www.dati.lombardia.it/resource/qkfs-wmmh.json');
xhr.open('GET', 'http://en.wikipedia.org/w/api.php?action=query&format=json&callback=data&prop=revisions&rvprop=content&lllimit=500&titles=Q_(novel)')
xhr.send();