let user = {
	name: "Paolo",
	age: 43,
	'is Teacher': true,
	isOld: function() {if(this.age > 40){return true}}
};
user.isAdmin = true;
//delete user.age;
console.log(user.isOld());