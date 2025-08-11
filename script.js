    let timerElement = document.getElementById("timer");
    let quoteDisplay = document.getElementById("quoteDisplay");
    let quoteInput = document.getElementById("quoteInput");
    let resultElement = document.getElementById("result");
    let spinner = document.getElementById("spinner");

    let submitBtn = document.getElementById("submitBtn");
    let resetBtn = document.getElementById("resetBtn");

    let timer = 0;
    let timerId;

    function startTimer() {
      timer = 0;
      timerElement.textContent = timer + " seconds";
      timerId = setInterval(() => {
        timer++;
        timerElement.textContent = timer + " seconds";
      }, 1000);
    }

    function stopTimer() {
      clearInterval(timerId);
    }

    function fetchQuote() {
      spinner.classList.remove("d-none");
      spinner.classList.add("fade-in");
      quoteDisplay.style.opacity = "0";

      fetch("https://apis.ccbp.in/random-quote")
        .then((response) => response.json())
        .then((data) => {
          spinner.classList.add("fade-out");
          setTimeout(() => {
            spinner.classList.add("d-none");
            spinner.classList.remove("fade-in", "fade-out");
            quoteDisplay.textContent = data.content;
            quoteDisplay.style.opacity = "1";
            startTimer();
          }, 400);
        });
    }

    submitBtn.addEventListener("click", function () {
      let enteredText = quoteInput.value.trim();
      let originalQuote = quoteDisplay.textContent.trim();

      if (enteredText === originalQuote) {
        stopTimer();
        resultElement.className = "success";
        resultElement.textContent = "You typed the sentence in " + timer + " seconds!";
      } else {
        resultElement.className = "error";
        resultElement.textContent = "Incorrect, please try again.";
      }
    });

    resetBtn.addEventListener("click", function () {
      stopTimer();
      quoteInput.value = "";
      resultElement.textContent = "";
      resultElement.className = "";
      timerElement.textContent = "0 seconds";
      fetchQuote();
    });

    // Initial fetch
    fetchQuote();
