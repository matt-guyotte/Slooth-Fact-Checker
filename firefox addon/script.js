var styles = `.slooth-check-popup {position: relative;display: inline-block;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}.slooth-popup {font-size: 16px;width: 160px;background-color: #555;color: #fff;text-align: center;border-radius: 6px;padding: 8px 0;position: absolute;z-index: 1;bottom: 125%;left: 50%;margin-left: -80px;}.slooth-popup::after {content: "";position: absolute;top: 100%;left: 50%;margin-left: -5px;border-width: 5px;border-style: solid;border-color: #555 transparent transparent transparent;}
.slooth-icon-container {
    position: absolute;
    left: 95vw;
    top: 2vh;
    height: 4em;
    width: 4em;
    z-index: 9999 !important;
}

.slooth-icon-click {
    display: block;
    background-color: black;
    height: 3em;
    width: 3em;
    border-radius: 100%;
    position: relative;
    cursor: pointer; 
    box-shadow: -8px 5px 2px gainsboro;
    float: center;
}

.slooth-icon-click:hover {
    transform: translate(-2px, 2px);
}

.slooth-icon-click-arrow {
    background-color: white;
    height: 1.5em;
    width: 1.5em;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 100%;
    margin: -0.75em 0px 0px -0.75em;
    background-image: url("https://cdn0.iconfinder.com/data/icons/feather/96/591276-arrow-right-512.png");
    background-size: contain;
}
`

let jsonResponse = ""

async function callJSON() {
    try{
        let testArray = [];
        for(var i = 1; i <= 1000000; i++) {
            console.log(i);
            var jsonFetch = await fetch("https://raw.githubusercontent.com/matt-guyotte-slooth/slooth-final-json/main/json/" + i + ".json")
            var jsonRes = await jsonFetch.json();
            console.log(jsonFetch.status)
            //if(jsonFetch.status == 404) {
            //    console.log("404")
            //    workJSON();
            //    break;
            //}
            if(jsonFetch.status == 200) {
                console.log(jsonRes);
                testArray.push(jsonRes);
                jsonResponse = testArray;
            }
            //console.log(testArray)
        }
    }
    catch {
        console.log("catch called");
        await runButton();
    }
}
callJSON();

function runButton() {
    for(var ii = 0; ii < jsonResponse.length; ii++) {
        if(jsonResponse[ii].url == window.location.href) {
            var styleSheet = document.createElement("style")
            styleSheet.rel = "stylesheet";
            styleSheet.innerText = styles
            //console.log(styleSheet);
            document.head.appendChild(styleSheet);
    
            var pageContainer = document.createElement("div");
            pageContainer.classList.add("slooth-icon-container");
            pageContainer.id = "slooth-extension-popup-button-container";
            var pageButton = document.createElement("div");
            pageButton.classList.add("slooth-icon-click");
            pageButton.id = "slooth-extension-popup-button";
            pageContainer.appendChild(pageButton);
            var pageButtonSubClass1 = document.createElement("div");
            pageButtonSubClass1.classList.add("slooth-icon-click-arrow");
            pageButton.appendChild(pageButtonSubClass1);
    
            document.body.appendChild(pageContainer);
            var pageButtonAdded = document.getElementById("slooth-extension-popup-button-container");
            console.log(pageButtonAdded)
            document.body.insertBefore(pageButtonAdded, document.body.firstChild);
        }
    }
    
    var pageButtonAdded = document.getElementById("slooth-extension-popup-button-container") || undefined;
    if(pageButtonAdded !== undefined) {
        pageButtonAdded.addEventListener("click", (e) => {
            var styles2 = `.slooth-check-popup {position: relative;display: inline-block;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}.slooth-popup {font-size: 16px;width: 160px;background-color: #555;color: #fff;text-align: center;border-radius: 6px;padding: 8px 0;position: absolute;z-index: 1;bottom: 125%;left: 50%;margin-left: -80px;}.slooth-popup::after {content: "";position: absolute;top: 100%;left: 50%;margin-left: -5px;border-width: 5px;border-style: solid;border-color: #555 transparent transparent transparent;}
            .slooth-icon-container {
                position: absolute;
                left: 95vw;
                top: 2vh;
                height: 4em;
                width: 4em;
                z-index: 9999 !important;
            }

            .slooth-icon-click {
                display: block;
                background-color: black;
                height: 3em;
                width: 3em;
                border-radius: 100%;
                position: relative;
                cursor: pointer; 
                box-shadow: -8px 5px 2px gainsboro;
                float: center;
            }

            .slooth-icon-click:hover {
                transform: translate(-2px, 2px);
            }

            .slooth-icon-click-arrow {
                background-color: white;
                height: 1.5em;
                width: 1.5em;
                position: absolute;
                top: 50%;
                left: 50%;
                border-radius: 100%;
                margin: -0.75em 0px 0px -0.75em;
                background-image: url("https://cdn0.iconfinder.com/data/icons/feather/96/591276-arrow-right-512.png");
                background-size: contain;
            }
            `

            console.log(jsonResponse);

            var pageButtonAdded = document.getElementById("slooth-extension-popup-button-container");
            console.log(pageButtonAdded);
            pageButtonAdded.remove();

            let allStylesheets = document.querySelectorAll("style");
            console.log(allStylesheets);
            for (var ii = 0; ii < allStylesheets.length; ii++) {
                if(allStylesheets[ii].innerHTML == styles) {
                    allStylesheets[ii].innerHTML = "";
                }
            }

            var styleSheet = document.createElement("style");
            styleSheet.rel = "stylesheet";
            styleSheet.innerText = styles2;
            //console.log(styleSheet);
            document.head.appendChild(styleSheet);

            var pageContainer = document.createElement("div");
            pageContainer.classList.add("slooth-icon-container");
            pageContainer.id = "slooth-extension-popup-button-container";
            var pageButton = document.createElement("div");
            pageButton.classList.add("slooth-icon-click");
            pageButton.id = "slooth-extension-popup-button";
            pageContainer.appendChild(pageButton);
            var pageButtonSubClass1 = document.createElement("div");
            pageButtonSubClass1.classList.add("slooth-icon-click-arrow");
            pageButton.appendChild(pageButtonSubClass1);

            document.body.appendChild(pageContainer);
            console.log(pageButtonAdded)
            document.body.insertBefore(pageButtonAdded, document.body.firstChild);

            const selection = window.getSelection();
            //console.log(selection);
            selection.removeAllRanges();
            const range = document.createRange();
            range.selectNode(document.body);
            selection.addRange(range);

            let jsonEntries = jsonResponse;
            for(var i = 0; i < jsonEntries.length; i++) {
              if(jsonEntries[i]["url"] == window.location.href) {
                console.log(jsonEntries[i]);
                var jsonSubKeys = jsonEntries[i]["new_marks"];
                for (var y = 0; y < jsonSubKeys.length; y++) {
                  console.log(jsonSubKeys[y].text);
                  console.log(jsonSubKeys[y].note);
                  const selection = window.getSelection();
                  //console.log(selection);
                  selection.removeAllRanges();
                  // Select paragraph
                  const range = document.createRange();
                  range.selectNode(document.body);
                  selection.addRange(range);
                  var colorFill = jsonSubKeys[y].color;
                  //console.log(selection.anchorNode.innerHTML);
                  var regex = new RegExp(jsonSubKeys[y].text, "g");
                  selection.anchorNode.innerHTML = selection.anchorNode.innerHTML.replace(regex, '<span style = "background-color: ' + colorFill + '"' + 'class = "slooth-check-popup">' + jsonSubKeys[y].text + '</span>');
                  var sloothCheckPopup = document.getElementsByClassName("slooth-check-popup");
                  var sloothPopup = document.getElementsByClassName("slooth-popup");
                  console.log(sloothCheckPopup);
                  var jsonSave = jsonSubKeys;
                  for(var z = 0; z < sloothCheckPopup.length; z++) {
                    sloothCheckPopup[z].addEventListener('click', (e) => {
                      console.log(jsonSave);
                      var currentText = e.target.innerText;
                      //console.log(currentText);
                      //e.target.classList.toggle("show");
                      for(var a = 0; a < e.target.children.length; a++) {
                          //console.log(e.target.children[a].classList);
                          for(var b = 0; b < e.target.children[a].classlist.length; b++) {
                              //console.log(e.target.children[a].classlist[b])
                              if(e.target.children[a].classlist[b] == "slooth-popup") {
                                  e.target.children[a].remove();
                              }
                          }
                      }
                      for(var d = 0; d < jsonSave.length; d++) {
                          console.log(currentText);
                          console.log(jsonSave[d].text);
                          if(jsonSave[d].text.toUpperCase() == currentText.toUpperCase()) {
                              commentFill = jsonSave[d].note;
                              console.log(commentFill);
                              var node = document.createElement("span");
                              node.classList.add("slooth-popup");
                              node.innerText = commentFill;
                              e.target.appendChild(node);
                              for(var c = 0; c < sloothPopup.length; c++) {
                                  sloothPopup[c].addEventListener('click', (e) => {
                                      e.target.remove();
                                  })
                              }
                          }
                      }
                    })
                  }
                }
              }
            }
            let screenReaderAlert = document.createElement("p");
            screenReaderAlert.role = "alert";
            screenReaderAlert.style = "display: none;"
            screenReaderAlert.innerText = "Slooth News notes have been activated on this page."
            var pageButtonAdded = document.getElementById("slooth-extension-popup-button-container");
            console.log(pageButtonAdded);
            pageButtonAdded.remove();

            var styleSheet = document.createElement("style");
            styleSheet.rel = "stylesheet";
            styleSheet.innerText = styles;
            //console.log(styleSheet);
            document.head.appendChild(styleSheet);

            var pageContainer = document.createElement("div");
            pageContainer.classList.add("slooth-icon-container");
            pageContainer.id = "slooth-extension-popup-button-container";
            var pageButton = document.createElement("div");
            pageButton.classList.add("slooth-icon-click");
            pageButton.id = "slooth-extension-popup-button";
            pageContainer.appendChild(pageButton);
            var pageButtonSubClass1 = document.createElement("div");
            pageButtonSubClass1.classList.add("slooth-icon-click-arrow");
            pageButton.appendChild(pageButtonSubClass1);

            document.body.appendChild(pageContainer);
            console.log(pageButtonAdded)
            document.body.insertBefore(pageButtonAdded, document.body.firstChild);
        });
    }
};