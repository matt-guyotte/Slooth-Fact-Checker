var styles = `
.slooth-check-popup {
    position: relative;
    display: inline-block;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.slooth-popup {
    font-size: 16px;
    width: 160px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 8px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -80px;
}

.slooth-popup::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
}

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

.slooth-icon-click:focus {
    transform: translate(-2px, 2px);
}

.slooth-icon-click-owl {
    background-color: white;
    height: 1.5em;
    width: 1.5em;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 100%;
    margin: -0.75em 0px 0px -0.75em;
    background-image: url("http://slooth-survey-site.herokuapp.com/pictures/owl_eyes_open.png");
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
        runButton();
    }
}
callJSON();

function runButton() {
    function getSafeRanges(dangerous) {
        var a = dangerous.commonAncestorContainer;
        // Starts -- Work inward from the start, selecting the largest safe range
        var s = new Array(0); var rs = new Array(0);
        if (dangerous.startContainer != a)
            for(var i = dangerous.startContainer; i != a; i = i.parentNode)
                s.push(i)
        ;
        if (0 < s.length) for(var i = 0; i < s.length; i++) {
            var xs = document.createRange();
            if (i) {
                xs.setStartAfter(s[i-1]);
                xs.setEndAfter(s[i].lastChild);
            }
            else {
                xs.setStart(s[i], dangerous.startOffset);
                xs.setEndAfter(
                    (s[i].nodeType == Node.TEXT_NODE)
                    ? s[i] : s[i].lastChild
                );
            }
            rs.push(xs);
        }
        // Ends -- basically the same code reversed
        var e = new Array(0), re = new Array(0);
        if (dangerous.endContainer != a)
            for(var i = dangerous.endContainer; i != a; i = i.parentNode)
                e.push(i)
        ;
        if (0 < e.length) for(var i = 0; i < e.length; i++) {
            var xe = document.createRange();
            if (i) {
                xe.setStartBefore(e[i].firstChild);
                xe.setEndBefore(e[i-1]);
            }
            else {
                xe.setStartBefore(
                    (e[i].nodeType == Node.TEXT_NODE)
                    ? e[i] : e[i].firstChild
                );
                xe.setEnd(e[i], dangerous.endOffset);
            }
            re.unshift(xe);
        }
    
        // Middle -- the uncaptured middle
        if ((0 < s.length) && (0 < e.length)) {
            var xm = document.createRange();
            xm.setStartAfter(s[s.length - 1]);
            xm.setEndBefore(e[e.length - 1]);
        }
        else {
            return [dangerous];
        }
    
        // Concat
        rs.push(xm);
        var response = rs.concat(re);    
    
        // Send to Console
        console.log("recieved response")
        return response;
    }
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
            pageContainer.ariaLabel = "Slooth News Button. Click this button to activate notes."
            var pageButton = document.createElement("div");
            pageButton.classList.add("slooth-icon-click");
            pageButton.id = "slooth-extension-popup-button";
            pageContainer.appendChild(pageButton);
            var pageButtonSubClass1 = document.createElement("div");
            pageButtonSubClass1.classList.add("slooth-icon-click-owl");
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
            var styles2 = `
                .slooth-check-popup {
                    position: relative;
                    display: inline-block;
                    cursor: pointer;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }
                
                .slooth-popup {
                    font-size: 16px;
                    width: 160px;
                    background-color: #555;
                    color: #fff;
                    text-align: center;
                    border-radius: 6px;
                    padding: 8px 0;
                    position: absolute;
                    z-index: 1;
                    bottom: 125%;
                    left: 50%;
                    margin-left: -80px;
                }
                
                .slooth-popup::after {
                    content: "";
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    margin-left: -5px;
                    border-width: 5px;
                    border-style: solid;
                    border-color: #555 transparent transparent transparent;
                }

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

                .slooth-icon-click:focus {
                    transform: translate(-2px, 2px);
                }

                .slooth-icon-click-owl {
                    background-color: white;
                    height: 1.5em;
                    width: 1.5em;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    border-radius: 100%;
                    margin: -0.75em 0px 0px -0.75em;
                    background-image: url("http://slooth-survey-site.herokuapp.com/pictures/owl_eyes_open.png");
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
                pageButtonSubClass1.classList.add("slooth-icon-click-owl");
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
                        let finalNote = jsonSubKeys[y].text
                        var colorFill = jsonSubKeys[y].color;
                        //console.log(selection.anchorNode.innerHTML);
                        let userSelection = jsonSubKeys[y];
                        console.log(userSelection);
                        let startContainerHTML = userSelection.range.startContainer
                        let endContainerHTML = userSelection.range.endContainer
                        let commonAncestorContainerHTML = userSelection.range.commonAncestorContainer;
                        let startText = userSelection.range.startText;
                        let endText = userSelection.range.endText;
                        let startOffset = userSelection.range.startOffset;
                        let endOffset = userSelection.range.endOffset;
                        let startContainer;
                        let endContainer;
                        let commonAncestorContainer;
                        const allElements = document.getElementsByTagName('*');
                        for (const element of allElements) {
                            if(startText == undefined) {
                                if(element.innerHTML == startContainerHTML) {
                                    startContainer = element
                                }
                            }
                            if(endText == undefined) {
                                if(element.innerHTML == endContainerHTML) {
                                    endContainer = element
                                }
                            }
                            if(element.innerHTML == commonAncestorContainerHTML) {
                                commonAncestorContainer = element
                                console.log(commonAncestorContainer);
                            }
                            if(allElements[allElements.length - 1] == element) {
                                if(commonAncestorContainer !== undefined) {
                                    if(startText !== undefined) {
                                        let parentChildren = commonAncestorContainer.childNodes;
                                        for(var x = 0; x < parentChildren.length; x++) {
                                            if(parentChildren[x].innerText == startText || parentChildren[x].textContent == startText) {
                                                startContainer = parentChildren[x];
                                            }
                                        }
                                    }
                                    if(endText !== undefined) {
                                        let parentChildren = commonAncestorContainer.childNodes;
                                        for(var x = 0; x < parentChildren.length; x++) {
                                            if(parentChildren[x].innerText == endText || parentChildren[x].textContent == endText) {
                                                endContainer = parentChildren[x];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        console.log(startContainer);
                        console.log(endContainer);
                        console.log(commonAncestorContainer);
                        let reCreatedRange = document.createRange();
                        reCreatedRange.setStart(startContainer, startOffset);
                        reCreatedRange.setEnd(endContainer, endOffset);
                        console.log(reCreatedRange);
                        var safeRanges = getSafeRanges(reCreatedRange);
                        let rangeArray = [];
                        for (var x = 0; x < safeRanges.length; x++) {
                            console.log(safeRanges[x]);
                            rangeArray.push(safeRanges[x]);
                        }
                        console.log(rangeArray);
                        console.log(finalNote);
                        for(var z = 0; z < rangeArray.length; z++) {
                            highlightRange(rangeArray[z], finalNote, colorFill);
                        }
                        function highlightRange(range, finalNote, colorFill) {
                          console.log(range)
                          //console.log(range.commonAncestorContainer.parentElement.classList[0]);
                          let existingPagePopups = document.querySelectorAll('[id^="slooth-popup"]');
                          if(existingPagePopups.length == 0) {
                              let existingHighlights = document.querySelectorAll('[id^="slooth-highlight"]');
                              if(existingHighlights.length > 0) {
                                  //console.log("more than one")
                                  //let currentHighest = 1;
                                  for(var ii = 0; ii < existingHighlights.length; ii++) {
                                      let existingId = existingHighlights[ii].id;
                                      let existingSplit = existingId.split("highlight")[1];
                                      let splitParse = parseInt(existingSplit);
                                      if (ii == existingHighlights.length - 1) {
                                          //console.log("this is the value of y " + y);
                                          let highestNumber = ii + 2;
                                          let highToString = highestNumber.toString();
                                          var newNode = document.createElement("span");
                                          newNode.classList = "slooth-check-popup";
                                          newNode.id = "slooth-highlight" + highToString;
                                          newNode.setAttribute(
                                             "style",
                                             "background-color: " + colorFill + "; display: inline;"
                                          );
                                          newNode.setAttribute(
                                              "value",
                                              finalNote
                                          );
                                          range.surroundContents(newNode);
                                          var sloothCheckPopup = document.getElementById("slooth-highlight" + highToString);
                                          let newHighlightNote = document.createElement("p");
                                          newHighlightNote.setAttribute("role", "alert");
                                          newHighlightNote.ariaHidden = "false";
                                          newHighlightNote.style = "display: none;";
                                          newHighlightNote.innerText = document.getElementById("slooth-highlight" + highToString).innerText + "is the text you just highlighted."
                                          document.getElementById("slooth-highlight1").append(newHighlightNote);
                                          //console.log(sloothCheckPopup);
                                          //console.log("this is the number of popups: " + sloothCheckPopup.length)
                                      }
                                      existingHighlights[ii].addEventListener("mouseover", (e) => {
                                          let newHighlightNote = document.createElement("p");
                                          newHighlightNote.setAttribute("role", "alert");
                                          newHighlightNote.ariaHidden = "false";
                                          newHighlightNote.style = "display: none;";
                                          newHighlightNote.innerText = "Click here to add note about" + e.target.innerText;
                                          e.target.append(newHighlightNote)
                                      })
                                  }
                              }
                              if(existingHighlights.length == 0) {
                                  console.log("no highlights")
                                  var newNode = document.createElement("span");
                                  newNode.classList = "slooth-check-popup";
                                  newNode.id = "slooth-highlight1"
                                  newNode.setAttribute(
                                     "style",
                                     "background-color: " + colorFill + "; display: inline;"
                                  );
                                  newNode.setAttribute(
                                      "value",
                                      finalNote
                                  );
                                  range.surroundContents(newNode);
                                  console.log(document.getElementById("slooth-highlight1").innerText);
                                  let newHighlightNote = document.createElement("p");
                                  newHighlightNote.setAttribute("role", "alert");
                                  newHighlightNote.ariaHidden = "false";
                                  newHighlightNote.style = "display: none;";
                                  newHighlightNote.innerText = document.getElementById("slooth-highlight1").innerText + "is the text you just highlighted."
                                  document.getElementById("slooth-highlight1").append(newHighlightNote);
          
                                  document.getElementById("slooth-highlight1").addEventListener("mouseover", (e) => {
                                      let newHighlightNote = document.createElement("p");
                                      newHighlightNote.setAttribute("role", "alert");
                                      newHighlightNote.ariaHidden = "false";
                                      newHighlightNote.style = "display: none;";
                                      newHighlightNote.innerText = "Click here to add note about" + e.target.innerText;
                                      e.target.append(newHighlightNote)
                                  })
                              }
                              window.getSelection().removeAllRanges();
                          }
                        }
                        var sloothCheckPopup = document.getElementsByClassName("slooth-check-popup");
                        var sloothPopup = document.getElementsByClassName("slooth-popup");
                        console.log(sloothCheckPopup);
                        var jsonSave = jsonSubKeys;
                        for(var z = 0; z < sloothCheckPopup.length; z++) {
                          if(sloothCheckPopup[z].parentElement.nodeName == "A") {
                              sloothCheckPopup[z].addEventListener('mouseover', (e) => {
                                let screenReaderAlert = document.createElement("p");
                                screenReaderAlert.setAttribute("role", "alert");
                                screenReaderAlert.ariaHidden = "false"
                                screenReaderAlert.style = "display: none;"
                                screenReaderAlert.innerText = "You have hovered your cursor over a hyperlink note." + e.target.innerText + "The note has automatically displayed."
                                e.target.append(screenReaderAlert);
                                console.log(jsonSave);
                                var currentText = e.target.getAttribute("value");
                                for(var d = 0; d < jsonSave.length; d++) {
                                  console.log(currentText);
                                  console.log(jsonSave[d].text);
                                  if(jsonSave[d].text == currentText) {
                                      commentFill = jsonSave[d].note;
                                      console.log(commentFill);
                                      var node = document.createElement("span");
                                      node.classList.add("slooth-popup");
                                      node.innerText = commentFill;
                                      e.target.appendChild(node);
                                      let noteAlert = document.createElement("p");
                                      noteAlert.setAttribute("role","alert");
                                      noteAlert.style = "display:none;"
                                      noteAlert.ariaHidden = "false";
                                      noteAlert.innerText = commentFill;
                                      e.target.appendChild(noteAlert);
                                      for(var c = 0; c < sloothPopup.length; c++) {
                                          sloothPopup[c].addEventListener('click', (e) => {
                                              e.target.remove();
                                          })
                                      }
                                  }
                              }
                              })
                          }
                          if(sloothCheckPopup[z].parentElement.nodeName !== "A") {
                              sloothCheckPopup[z].addEventListener("mouseover", (e) => {
                                let screenReaderAlert = document.createElement("p");
                                screenReaderAlert.setAttribute("role", "alert");
                                screenReaderAlert.ariaHidden = "false";
                                screenReaderAlert.style = "display: none;"
                                screenReaderAlert.innerText = "You have hovered your cursor over a Slooth News note." + e.target.innerText + "Please click the highlight in order to display the note."
                                e.target.append(screenReaderAlert);
                              })
                              sloothCheckPopup[z].addEventListener('click', (e) => {
                                console.log(jsonSave);
                                var currentText = e.target.getAttribute("value");
                                //console.log(currentText);
                                //e.target.classList.toggle("show");
                                for(var d = 0; d < jsonSave.length; d++) {
                                    console.log(currentText);
                                    console.log(jsonSave[d].text);
                                    if(jsonSave[d].text == currentText) {
                                        commentFill = jsonSave[d].note;
                                        console.log(commentFill);
                                        var node = document.createElement("span");
                                        node.classList.add("slooth-popup");
                                        node.innerText = commentFill;
                                        e.target.appendChild(node);
                                        let noteAlert = document.createElement("p");
                                        noteAlert.setAttribute("role","alert");
                                        noteAlert.style = "display:none;"
                                        noteAlert.ariaHidden = "false";
                                        noteAlert.innerText = commentFill;
                                        e.target.appendChild(noteAlert);
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
                }
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
                pageButtonSubClass1.classList.add("slooth-icon-click-owl");
                pageButton.appendChild(pageButtonSubClass1);

                document.body.appendChild(pageContainer);
                console.log(pageButtonAdded)
                document.body.insertBefore(pageButtonAdded, document.body.firstChild);
        });
        pageButtonAdded.addEventListener("mouseover", (e) => {
            let screenReaderAlert = document.createElement("p");
            screenReaderAlert.setAttribute("role", "alert");
            screenReaderAlert.ariaHidden = "false"
            screenReaderAlert.style = "display: none;"
            screenReaderAlert.innerText = "Click here to activate the Slooth News Fact Checker."
        })
    }
};