window.onload = function test(){
	date();
}

function date(){
  	t = new Date();
  	txt = t.toUTCString() + "<br>";
	print(txt);
} 

function print(txt){
    document.getElementById("cont").innerHTML += txt;
  	throw new Error("Stop computation and show the call stack on console");
}