let bored = "false";
function start() {
  function loop() {
    setTimeout(function () {
      fetch("http://localhost:3000/bored", { method: "POST" })
        .then((response) => response.text())
        .then((data) => {
          data == "false" ? (bored = "false") : (bored = "true");
        });

      if (bored == "true") {
        document.getElementById("myBtn").click();
        fetch("http://localhost:3000/makefalse", { method: "POST" });
      }
      loop();
    }, 3000);
  }
  loop();
}

window.onload = start();
