function circle(x,y,r){
			this.xcord = x;
			this.ycord = y;
			this.radius = r;
			this.area = function(){return Math.PI * this.radius * this.radius};

		}

onmessage = function(e){
	var message = e.data;
	var arg = JSON.parse(message);

	for(i=arg[0]; i<=arg[1]; i++){
		var cerchio = new circle(1,1,i);
		txt = "per un raggio pari a " +i+ ", l'area ha valore " + cerchio.area();
		postMessage(txt); 
	}

}