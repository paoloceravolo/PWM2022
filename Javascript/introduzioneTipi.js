var foo;
foo = "ciao";
console.log(foo + 2);
console.log(foo.length);
foo = true;
foo = 123;
console.log("." + foo + 2);
console.log(foo.length);
foo = null;
foo = function (km){return km * 0.6214};
//foo = Miglia(23);
console.time("exectime")
foo = [];
console.log(foo.length);
console.timeEnd("exectime");
console.time("exectime");
foo = new Array;
console.timeEnd("exectime");
foo = {};
foo = new Object;
foo = "una serie di parole".indexOf("parole");
foo = "una serie di parole".substring(4,9);
foo = "una serie di parole".split(" ");
foo.push(2);
foo.shift();
console.log(foo);


