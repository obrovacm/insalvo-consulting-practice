console.log("src/js/script.js - RADI");

var hamburger = $("#hamburger");
var nav = $("#nav");

hamburger.on("click", function (e) {
  hamburger.toggleClass("on");
  nav.toggleClass("on");
});
