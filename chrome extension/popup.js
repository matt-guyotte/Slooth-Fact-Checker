let jsonResponse = ""
let findWord = document.getElementById("findWord");
let deactivate = document.getElementById("deactivate");

findWord.addEventListener("click", () => {
  if(findWord.style.backgroundColor = "#03f8fc") {
    async function targetPage() {
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: getJSON,
      });
    }
    targetPage();
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

});

deactivate.addEventListener("click", () => {
    async function targetPage() {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: pageRefresh,
        });
      }
      targetPage();
})

function pageRefresh() {
    window.location.href = window.location.href
}

async function getJSON() {
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
        workJSON();
    }
    function workJSON() {
        if(document.getElementsByClassName("slooth-icon-click-owl").length > 0) {
            console.log(document.getElementsByClassName("slooth-icon-click-owl"))
            const loadImage = src =>
            new Promise((resolve, reject) => {
                resolve(src)
            });
            loadImage("https://slooth-subscription-site.herokuapp.com/pictures/owl_eyes_open.png")
            .then(
                (image) => {
                    document.getElementsByClassName("slooth-icon-click-owl")[0].src = image;
                }
            )
        }
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
                    left: 88vw;
                    top: 2vh;
                    z-index: 9999 !important;
                }

                .slooth-icon-click {
                    cursor: pointer;
                    float: center;
                }

                .slooth-icon-click:hover {
                    transform: translate(-2px, 2px);
                }

                .slooth-icon-click:focus {
                    transform: translate(-2px, 2px);
                }

                .slooth-icon-click-owl {
                    height: 3.5em;
                    width: 5.5em;
                    position: absolute;
                    margin: -0.75em 0px 0px -0.75em;
                    background-image: url("http://slooth-subscription-site.herokuapp.com/pictures/main_icon_closed.png");
                    background-size: cover;
                }
                `
                console.log(jsonResponse);

                //var pageButtonAdded = document.getElementById("slooth-extension-popup-button-container");
                //console.log(pageButtonAdded);
                //pageButtonAdded.remove();

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

                const selection = window.getSelection();
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
                            console.log(jsonSubKeys[y].note);
                            const selection = window.getSelection();
                            //console.log(selection);
                            selection.removeAllRanges();
                            // Select paragraph
                            let finalNote = jsonSubKeys[y].text;
                            var colorFill = jsonSubKeys[y].color;
                            //console.log(selection.anchorNode.innerHTML);
                            let userSelection = jsonSubKeys[y];
                            console.log(userSelection);
                            let startContainerHTML = userSelection.range.startContainer
                            let endContainerHTML = userSelection.range.endContainer
                            let commonAncestorContainerHTML = userSelection.range.commonAncestorContainer;
                            console.log(commonAncestorContainerHTML.length);
                            let startText = userSelection.range.startText;
                            let endText = userSelection.range.endText;
                            let startOffset = userSelection.range.startOffset;
                            let endOffset = userSelection.range.endOffset;
                            let startContainer;
                            let endContainer;
                            let commonAncestorContainer;
                            const allElements = document.getElementsByTagName('p');
                            for (const element of allElements) {
                                if(startText == undefined) {
                                    if(element.innerHTML == startContainerHTML) {
                                        console.log(element.innerHTML);
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
                                    console.log("last element")
                                    if(commonAncestorContainer === undefined) {
                                        console.log("common is undefined")
                                        for (const element2 of allElements) {
                                            let currentRightBeginning = 0;
                                            for(let char = 0; char < commonAncestorContainerHTML.length; char++) {
                                                if(element2.innerHTML[char] === commonAncestorContainerHTML[char]) {
                                                    currentRightBeginning++;
                                                }
                                            }
                                            let currentRightEnd = 0;
                                            for(let charEnd = 0; charEnd < commonAncestorContainerHTML.length; charEnd++) {
                                                if(element2.innerHTML[element2.innerHTML.length - charEnd] === commonAncestorContainerHTML[commonAncestorContainerHTML.length - charEnd]) {
                                                  currentRightEnd++;
                                                }
                                            }
                                            let currentRightBeginningAverage = currentRightBeginning/commonAncestorContainerHTML.length;
                                            let currentRightEndAverage = currentRightEnd/commonAncestorContainerHTML.length;
                                            if(currentRightBeginningAverage > 0.40 || currentRightEndAverage > 0.40) {
                                                commonAncestorContainer = element2
                                            }
                                        }
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
                            function activatePopup(e) {
                                console.log(jsonSave);
                                var currentText = e.target.getAttribute("value");
                                //console.log(currentText);
                                //e.target.classList.toggle("show");
                                for(var d = 0; d < jsonSave.length; d++) {
                                    console.log(currentText);
                                    console.log(jsonSave[d].text);
                                    if(jsonSave[d].text == currentText) {
                                        let existingPopup = false;
                                        if(document.getElementsByClassName("slooth-popup").length > 0) {
                                            for(const popup of document.getElementsByClassName("slooth-popup")) {
                                                if(popup.innerText === jsonSave[d].note) {
                                                    existingPopup = true;
                                                }
                                            }
                                        }
                                        console.log(existingPopup);
                                        if(existingPopup === false) {
                                            commentFill = jsonSave[d].note;
                                            console.log(commentFill);
                                            var node = document.createElement("span");
                                            node.classList = "slooth-popup";
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
                                }
                            }
                            for(var z = 0; z < sloothCheckPopup.length; z++) {
                                if(sloothCheckPopup[z].parentElement.nodeName == "A") {
                                    sloothCheckPopup[z].addEventListener('mouseover', (e) => {
                                      let screenReaderAlert = document.createElement("p");
                                      screenReaderAlert.setAttribute("role", "alert");
                                      screenReaderAlert.ariaHidden = "false"
                                      screenReaderAlert.style = "display: none;"
                                      screenReaderAlert.innerText = "You have hovered your cursor over a hyperlink note." + e.target.innerText + "The note has automatically displayed."
                                      e.target.append(screenReaderAlert);
                                      activatePopup(e);
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
                                      activatePopup(e);
                                    })
                                }
                            }
                        }
                    }
                }
                var styleSheet = document.createElement("style");
                styleSheet.rel = "stylesheet";
                styleSheet.innerText = styles;
                //console.log(styleSheet);
                document.head.appendChild(styleSheet);
            }
        }
    };
}