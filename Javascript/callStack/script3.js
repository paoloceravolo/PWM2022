window.onload = function test(){
	date();
}

function date(){
  t = new Date();
  txt = t.toUTCString() + "<br>";
  // setTimeout non consente di chiamare una funzione con parametri, è necessario usare una funzione anonima
	setTimeout(function() {print(txt)}, 3000);
 // print(txt);
  function prep() {
  	document.getElementById("cont").innerHTML += "Carico dal server... ";
  	//throw new Error("Stop computation and show the call stack on console");
    console.trace();
  };
  prep();
 	//throw new Error("Stop computation and show the call stack on console");
} 

function print(txt){
      document.getElementById("cont").innerHTML += txt;
      console.trace();
  		throw new Error("Stop computation and show the call stack on console");
  		
}
