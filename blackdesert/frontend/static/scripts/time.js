const timerEl = document.getElementById("boss-timer");
const bossTimer = new Date(Date(timerEl.dataset.bossTimer)).getTime();

console.log(timerEl.dataset.bossTimer);
var x = setInterval(function () {
  // Get today's date and time
  var now = Date.now() - 120000;

  // Find the distance between now and the count down date
  var distance = bossTimer - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  timerEl.textContent =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    timerEl.textContent = "EXPIRED";
  }
}, 1000);
