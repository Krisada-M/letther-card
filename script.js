$(document).ready(function () {
  var envelope = $("#envelope");
  var btn_open = $("#open");
  var btn_reset = $("#reset");
  var bgMusic = document.getElementById("bg-music");
  var playToggle = document.getElementById("play-song");
  if (bgMusic) {
    bgMusic.volume = 0.6;
  }

  var correctPassword = "2131"; // simple shared password
  var unlocked = false;

  function tryPlayMusic() {
    if (!bgMusic) return;
    var playPromise = bgMusic.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(function () {
        // autoplay might be blocked; user can tap play
      });
    }
  }

  if (playToggle) {
    playToggle.addEventListener("click", function () {
      if (!bgMusic) return;
      if (bgMusic.paused) {
        tryPlayMusic();
        playToggle.textContent = "Pause";
      } else {
        bgMusic.pause();
        playToggle.textContent = "Play";
      }
    });
  }

  // attempt to start music on page load (may be blocked until first interaction)
  tryPlayMusic();

  function requestAccess() {
    if (unlocked) return true;
    var attempt = prompt("Enter the password to open the letter:");
    if (attempt === null) return false; // user cancelled
    if (attempt.trim() === correctPassword) {
      unlocked = true;
      return true;
    }
    alert("Wrong password. Try again!");
    return false;
  }

  envelope.click(function () {
    if (requestAccess()) {
      open();
      tryPlayMusic();
    }
  });
  btn_open.click(function () {
    if (requestAccess()) {
      open();
      tryPlayMusic();
    }
  });
  btn_reset.click(function () {
    close();
  });

  function open() {
    envelope.addClass("open").removeClass("close");
  }
  function close() {
    envelope.addClass("close").removeClass("open");
    unlocked = false; // require password again after closing
  }
});
