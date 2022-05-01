// Test my methods
//element = document.body.classList;
//console.log(element);

function toggleDarkMode(){
  document.body.classList.toggle("darkMode");
  //console.log(document.body.classList);
  //console.log('here');
}
document.querySelector('#toggleDarkMode').addEventListener('change', toggleDarkMode);