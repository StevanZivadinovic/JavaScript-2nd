let history = document.querySelector("#history-value");
let output = document.querySelector("#output-value");

document.querySelector("#clear").addEventListener("click", (e) => {
  history.innerHTML = "";
});

try {
  document.querySelector("#keyboard").addEventListener("click", (e) => {
    console.log(e.target.textContent);

    if (
      e.target.textContent != "C" &&
      e.target.textContent != "CE" &&
      e.target.textContent != "="
    )
      history.innerHTML += e.target.textContent.toLocaleString("en");

    if (e.target.textContent == "=") {
      output.textContent = "";
      console.log(history.textContent.slice(0, -1));
      let text = history.textContent
      console.log(typeof text);
      console.log(text.includes("x"));
      if (text.includes("x")) {
        // let c = text.indexOf('x');
        console.log(text);
        let noviText = text.replace(/x/g, "*");
        console.log(noviText);
        let b = eval(noviText);
        output.innerHTML = b.toLocaleString("en");
        history.innerHTML = "";
      } else if (text.includes("÷")) {
        console.log(text);
        let noviText = text.replace(/÷/g, "/");
        console.log(noviText);
        let b = eval(noviText);
        output.innerHTML = b.toLocaleString("en");
        history.innerHTML = "";
      } else {
        let c = eval(text);
        console.log(c);
        output.innerHTML = c.toLocaleString("en");
        history.innerHTML = "";
      }
    }
  });
} catch (e) {
  console.log(e);
}

let CE = document.querySelector("#backspace");
CE.addEventListener("click", (e) => {
  history.textContent = history.textContent.substring(
    0,
    history.textContent.length - 1
  );
});



