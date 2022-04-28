function setTime() {
  // Get the local time using JS
  var date = new Date;
  var seconds = date.getSeconds();
  var minutes = date.getMinutes();
  var hours = date.getHours();

  var angleh = (hours * 30) + (minutes / 2);
  var anglem = minutes * 6;
  var angles = seconds * 6;

  
  document.getElementById('hours').style.transform = 'rotateZ('+ angleh +'deg)';
  document.getElementById('minutes').style.transform = 'rotateZ('+ anglem +'deg)';
  document.getElementById('seconds').style.transform = 'rotateZ('+ angles +'deg)';
  
  window.setTimeout(setTime, 1000);
}
setTime();