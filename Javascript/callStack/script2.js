window.onload = function test(){
  t = new Date();
  txt = t.getMilliseconds() + "<br>";
  document.getElementById("cont").innerHTML += txt;
  test();
}