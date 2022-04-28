let user = {
	name: "Paolo",
	age: 43,
	'is Teacher': true,
	isOld: function() {if(this.age > 40){return true}}
};
user.isAdmin = true;
//delete user.age;
let arr = []
for(key in user){
	arr.push(key);
	//console.log(key);
}
console.log(arr)
console.log(user);

//let somma = function(x,y,z){
//	return x+y;
//}

function Somma(x,y){
	return x+y;
}

let somma = (x,y) => x+y;

console.log(somma(3,7));

// Esempio di costruttore con funzioni anonime
// la parola chiave this utilizzata nelle funzioni anonime definite all'interno del metodo calcola() non sta indicando l'oggetto numeri, ma il loro contesto di esecuzione.
var numeri = {
	x: 12,
	y: 3,
	calcola: function(operazione) {
		var fn;
		switch (operazione) {
			case '+':
				fn = function() { return this.x + this.y};
			break;
			case '-':
				fn = function() { return this.x - this.y};
			break;
			default:
				fn = function() {};
		}
		return fn();
	}
} 
console.log(numeri.calcola('+'));

// Esempio di costruttore con funzioni arrow
// la parola chiave this ora indica l'oggetto numeri
var numeri = {
	x: 12,
	y: 3,
	calcola: function(operazione) {
		var fn;
		switch (operazione) {
			case '+':
				fn = () => this.x + this.y;
			break;
			case '-':
				fn = () => this.x - this.y
			break;
			default:
				fn = () => {};
		}
		return fn();
	}
} 
console.log(numeri.calcola('-'));


