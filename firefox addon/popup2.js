let findWord = document.getElementById("findWord");

 function listenForClicks() {
    findWord.addEventListener("click", (e) => {
  
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
  