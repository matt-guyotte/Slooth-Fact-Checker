let findWord = document.getElementById("findWord");
let deactivate = document.getElementById("deactivate");

 function listenForClicks() {
    findWord.addEventListener("click", (e) => {
      if(findWord.style.backgroundColor = "#03f8fc") {
        findWord.style.backgroundColor = "#DDC8F7";
        findWord.style.color = "black";
        findWord.innerText = "Currently Fact Checking...";
        let modes = [1, 2, 3, 4, 5, 6];
        let interval = 100;
        const loadImage = src =>
        new Promise((resolve, reject) => {
            resolve(src)
        });
        let currentNumber = 1;
        callPics();
        function callPics() {
            console.log(currentNumber);
            setTimeout(() => {
                if(currentNumber === 6) {
                    document.getElementsByClassName("popup-title")[0].src = "https://slooth-subscription-site.herokuapp.com/pictures/owl_eyes_open.png";
                }
                if(currentNumber < 6) {
                  loadImage("https://slooth-subscription-site.herokuapp.com/pictures/main_icon_partiallyclosed" + currentNumber + ".png")
                  .then(
                      (image) => {
                          document.getElementsByClassName("popup-title")[0].src = image;
                          currentNumber = currentNumber + 1;
                          callPics();
                      }
                  )
                }
            }, interval)
        } 
      }
  
      function sendCheck(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "check",
        });
      }
  
      /**
       * Just log the error to the console.
       */
      function reportError(error) {
        console.error(`Could not sendCheck: ${error}`);
      }
  
      /**
       * Get the active tab,
       * then call "sendCheck()" or "reset()" as appropriate.
       */
        browser.tabs.query({active: true, currentWindow: true})
          .then(sendCheck)
          .catch(reportError);
    });
    deactivate.addEventListener("click", () => {
      function sendDeactivate(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "deactivate",
        });
      }

      function reportError(error) {
        console.error(`Could not sendCheck: ${error}`);
      }

      browser.tabs.query({active: true, currentWindow: true})
      .then(sendDeactivate)
      .catch(reportError);
    });
  }
  
  /**
   * There was an error executing the script.
   * Display the popup's error message, and hide the normal UI.
   */
  function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute sendCheck content script: ${error.message}`);
  }
  
  /**
   * When the popup loads, inject a content script into the active tab,
   * and add a click handler.
   * If we couldn't inject the script, handle the error.
   */
  browser.tabs.executeScript({file: "slooth_content_script.js"})
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
  