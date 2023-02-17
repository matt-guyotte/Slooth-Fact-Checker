var styles = `
    .slooth-check-popup {
        position: relative;
        display: inline-block;
        cursor: pointer;
    }
    
    .slooth-popup, .slooth-popup-click {
        font-size: 1em;
        width: 30em;
        background-color: white;
        color: black;
        font-family: sans-serif;
        word-wrap: break-word;
        text-align: center;
        border-radius: 6px;
        padding: 12px 12px;
        position: absolute;
        z-index: 999 !important;
        bottom: 125%;
        left: 50%;
        margin-left: -15em;
        cursor: default;
    }
    
    .slooth-popup::after, .slooth-popup-click::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #555 transparent transparent transparent;
    }
    
    .slooth-popup-header, .slooth-popup-click-header {
        font-size: 0.5em;
        width: 30em;
        background-color: white;
        color: black;
        font-family: sans-serif;
        word-wrap: break-word;
        text-align: center;
        border-radius: 6px;
        padding: 12px 12px;
        position: absolute;
        z-index: 999 !important;
        top: 15%;
        margin-left: -15em;
        cursor: default;
    }
    
    .slooth-popup-header::after, .slooth-popup-click-header::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #555 transparent transparent transparent;
    }
    
    .slooth-popup-close {
        color: black;
        font-weight: bold;
        margin-left: 95%;
    }
      
    .slooth-popup-close:hover,
    .slooth-popup-close:focus {
        color: gray;
        text-decoration: none;
        cursor: pointer;
    }
    
    .slooth-popup-text {
        cursor: text;
        user-select: text;
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
        margin: -0.75em 0px 0px -0.75em;
        border: 0;
    }

    /* Modal Box */
    .slooth-popup-modal {
      display: block; /* Hidden by default */
      position: fixed; /* Stay in place */
      z-index: 999; /* Sit on top */
      padding-top: 100px; /* Location of the box */
      left: 0;
      top: 0;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      overflow: auto; /* Enable scroll if needed */
      background-color: rgb(0,0,0); /* Fallback color */
      background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }

    /* Modal Content */
    .slooth-popup-modal-content {
    font-family: sans-serif;
    font-size: 1.25em;
    text-align: center;
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    height: 30vh;
    width: 90vw;
    overflow: scroll;
    }
    `

let jsonResponse = ""

async function callJSON() {
    //try{
    //    let testArray = [];
    //    for(var i = 1; i <= 1000000; i++) {
    //        console.log(i);
    //        var jsonFetch = await fetch("https://raw.githubusercontent.com/matt-guyotte-slooth/slooth-final-json/main/json/" + i + ".json")
    //        var jsonRes = await jsonFetch.json();
    //        console.log(jsonFetch.status)
    //        //if(jsonFetch.status == 404) {
    //        //    console.log("404")
    //        //    workJSON();
    //        //    break;
    //        //}
    //        if(jsonFetch.status == 200) {
    //            console.log(jsonRes);
    //            testArray.push(jsonRes);
    //            jsonResponse = testArray;
    //        }
    //        //console.log(testArray)
    //    }
    //}
    //catch {
    //    console.log("catch called");
    //    runButton();
    //}
    console.log(window.location)
    console.log(window.location.href);
    let finalHref = encodeURIComponent(window.location.href.toString());
    let testArray = [];
    var jsonFetch = await fetch("https://slooth-survey-site.herokuapp.com/getfactcheckernotes/?url=" + finalHref)
    var jsonRes = await jsonFetch.json();
    testArray.push(jsonRes);
    jsonResponse = testArray;
    console.log(jsonResponse);
    runButton();
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
    console.log(jsonResponse)
    if(jsonResponse !== null) {
        console.log("not null")
        var styleSheet = document.createElement("style")
        styleSheet.rel = "stylesheet";
        styleSheet.innerText = styles
        //console.log(styleSheet);
        document.head.appendChild(styleSheet);

        var pageContainer = document.createElement("div");
        pageContainer.classList.add("slooth-icon-container");
        pageContainer.id = "slooth-extension-popup-button-container";
        pageContainer.ariaLabel = "Slooth News Activation Button. Click this button to activate notes."
        var pageButton = document.createElement("div");
        pageButton.classList.add("slooth-icon-click");
        pageButton.id = "slooth-extension-popup-button";
        pageContainer.appendChild(pageButton);
        var pageButtonSubClass1 = document.createElement("img");
        pageButtonSubClass1.classList.add("slooth-icon-click-owl");
        pageButtonSubClass1.src = "https://slooth-subscription-site.herokuapp.com/pictures/main_icon_closed.png"
        pageButton.appendChild(pageButtonSubClass1);

        document.body.appendChild(pageContainer);
        var pageButtonAdded = document.getElementById("slooth-extension-popup-button-container");
        console.log(pageButtonAdded)
        document.body.insertBefore(pageButtonAdded, document.body.firstChild);
    }
    
    var pageButtonAdded = document.getElementById("slooth-extension-popup-button-container");
    if(pageButtonAdded !== undefined) {
        pageButtonAdded.addEventListener("click", (e) => {
            console.log("clicked button")
            if(document.getElementsByClassName("slooth-icon-click-owl")[0].src !== "https://slooth-subscription-site.herokuapp.com/pictures/owl_eyes_open.png") {
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
                let jsonEntries = jsonResponse;
                let jsonSubKeys = jsonEntries[0].entries;
                function removeUnusedRanges() {
                    let notExist = [];
                    let currentOrderNumber = 0;
                    jsonSubKeys.sort((a,b) => a.range.subLevel - b.range.subLevel);
                    //jsonSubKeys.sort((a,b) => a.range.order - b.range.order);
                    //console.log(jsonSubKeys);
                    let sub0 = [];
                    let sub1 = [];
                    let sub2 = [];
                    let sub3 = [];
                    let sub4 = [];
                    let sub5 = [];
                    let newOrder = [];
                    for(let x = 0; x < jsonSubKeys.length; x++) {
                        if(jsonSubKeys[x].range.subLevel == 0) {
                            for(let sub = 0; sub < sub0.length; sub++) {
                                sub0.push(jsonSubKeys[x])
                            }
                        }
                        if(jsonSubKeys[x].range.subLevel == 1) {
                            for(let sub = 0; sub < sub1.length; sub++) {
                                if(sub1[sub].commonAncestorContainerReal == jsonSubKeys[x].range.commonAncestorContainerReal) {
                                    sub1[sub].entries.push(jsonSubKeys[x])
                                }
                                if(sub === sub1.length - 1) {
                                    sub1.push({commonAncestorContainerReal: jsonSubKeys[x].range.commonAncestorContainerReal, entries: [jsonSubKeys[x]]})
                                }
                            }
                        }
                        if(jsonSubKeys[x].range.subLevel == 2) {
                            for(let sub = 0; sub < sub2.length; sub++) {
                                if(sub2[sub].commonAncestorContainerReal == jsonSubKeys[x].range.commonAncestorContainerReal) {
                                    sub2[sub].entries.push(jsonSubKeys[x])
                                }
                                if(sub === sub2.length - 1) {
                                    sub2.push({commonAncestorContainerReal: jsonSubKeys[x].range.commonAncestorContainerReal, entries: [jsonSubKeys[x]]})
                                }
                            }
                        }
                        if(jsonSubKeys[x].range.subLevel == 3) {
                            for(let sub = 0; sub < sub3.length; sub++) {
                                if(sub3[sub].commonAncestorContainerReal == jsonSubKeys[x].range.commonAncestorContainerReal) {
                                    sub3[sub].entries.push(jsonSubKeys[x])
                                }
                                if(sub === sub3.length - 1) {
                                    sub3.push({commonAncestorContainerReal: jsonSubKeys[x].range.commonAncestorContainerReal, entries: [jsonSubKeys[x]]})
                                }
                            }
                        }
                        if(jsonSubKeys[x].range.subLevel == 4) {
                            for(let sub = 0; sub < sub4.length; sub++) {
                                if(sub4[sub].commonAncestorContainerReal == jsonSubKeys[x].range.commonAncestorContainerReal) {
                                    sub4[sub].entries.push(jsonSubKeys[x])
                                }
                                if(sub === sub4.length - 1) {
                                    sub4.push({commonAncestorContainerReal: jsonSubKeys[x].range.commonAncestorContainerReal, entries: [jsonSubKeys[x]]})
                                }
                            }
                        }
                        if(jsonSubKeys[x].range.subLevel == 5) {
                            for(let sub = 0; sub < sub5.length; sub++) {
                                if(sub5[sub].commonAncestorContainerReal == jsonSubKeys[x].range.commonAncestorContainerReal) {
                                    sub5[sub].entries.push(jsonSubKeys[x])
                                }
                                if(sub === sub5.length - 1) {
                                    sub5.push({commonAncestorContainerReal: jsonSubKeys[x].range.commonAncestorContainerReal, entries: [jsonSubKeys[x]]})
                                }
                            }
                        }
                        if(x === jsonSubKeys.length - 1) {
                            if(sub0.length > 0) {
                                sub0.sort((a,b) => a.range.order - b.range.order);
                                for(let sub = 0; sub < sub0.length; sub0++) {
                                    newOrder.push(sub0[sub]);
                                }
                            }
                            if(sub1.length > 0) {
                                for(let sub = 0; sub < sub1.length; sub++) {
                                    sub1[sub].entries.sort((a,b) => a.range.order - b.range.order);
                                    for(let subNext = 0; subNext < sub1[sub].entries.length; subNext++) {
                                        newOrder.push(sub1[sub].entries[subNext])
                                    }
                                }
                            }
                            if(sub2.length > 0) {
                                for(let sub = 0; sub < sub2.length; sub++) {
                                    sub2[sub].entries.sort((a,b) => a.range.order - b.range.order);
                                    for(let subNext = 0; subNext < sub2[sub].entries.length; subNext++) {
                                        newOrder.push(sub2[sub].entries[subNext])
                                    }
                                }
                            }
                            if(sub3.length > 0) {
                                for(let sub = 0; sub < sub3.length; sub++) {
                                    sub3[sub].entries.sort((a,b) => a.range.order - b.range.order);
                                    for(let subNext = 0; subNext < sub3[sub].entries.length; subNext++) {
                                        newOrder.push(sub3[sub].entries[subNext])
                                    }
                                }
                            }
                            if(sub4.length > 0) {
                                for(let sub = 0; sub < sub4.length; sub++) {
                                    sub4[sub].entries.sort((a,b) => a.range.order - b.range.order);
                                    for(let subNext = 0; subNext < sub4[sub].entries.length; subNext++) {
                                        newOrder.push(sub4[sub].entries[subNext])
                                    }
                                }
                            }
                            if(sub5.length > 0) {
                                for(let sub = 0; sub < sub5.length; sub++) {
                                    sub5[sub].entries.sort((a,b) => a.range.order - b.range.order);
                                    for(let subNext = 0; subNext < sub5[sub].entries.length; subNext++) {
                                        newOrder.push(sub5[sub].entries[subNext])
                                    }
                                }
                            }
                            jsonSubKeys = newOrder;
                        }
                    }
                    for (let y = 0; y < jsonSubKeys.length; y++) {
                        const selection = window.getSelection();
                        //console.log(selection);
                        selection.removeAllRanges();
                        // Select paragraph
                        let userSelection = jsonSubKeys[y];
                        let startContainerHTML = userSelection.range.startContainer
                        let endContainerHTML = userSelection.range.endContainer
                        let commonAncestorContainerHTML = userSelection.range.commonAncestorContainer;
                        let startText = userSelection.range.startText;
                        let endText = userSelection.range.endText;
                        let startOffset = userSelection.range.startOffset;
                        let endOffset = userSelection.range.endOffset;
                        let order = userSelection.range.order;
                        let commonAncestorContainerRealHTML = userSelection.range.commonAncestorContainerReal;
                        let subLevel = userSelection.range.subLevel;
                        if(order == currentOrderNumber) {
                            let startContainer;
                            let endContainer;
                            let commonAncestorContainer;
                            const allElements = document.getElementsByTagName('*');
                            for (const element of allElements) {
                                if(element.parentElement) {
                                    if(element.parentElement.classList) {
                                        if(element.parentElement.classList.value == "slooth-check-popup") {
                                            //console.log(element.parentElement.childNodes);
                                            for(var newTry = 0; newTry < element.parentElement.childNodes.length; newTry++) {
                                                if(element.parentElement.childNodes[newTry].textContent == startText) {
                                                    startContainer = element.parentElement.childNodes[newTry];
                                                }
                                                if(element.parentElement.childNodes[newTry].textContent == endText) {
                                                    endContainer = element.parentElement.childNodes[newTry];
                                                }
                                            }
                                        }
                                        if(element.parentElement.classList.value == "slooth-check-popup-sub") {
                                            //console.log(element.parentElement.childNodes);
                                            for(var newTry2 = 0; newTry2 < element.parentElement.childNodes.length; newTry2++) {
                                                if(element.parentElement.childNodes[newTry2].textContent == startText) {
                                                    startContainer = element.parentElement.childNodes[newTry2];
                                                }
                                                if(element.parentElement.childNodes[newTry2].textContent == endText) {
                                                    endContainer = element.parentElement.childNodes[newTry2];
                                                }
                                            }
                                        }
                                    }
                                }
                                if(startContainer == undefined) {
                                    if(element.innerHTML == startContainerHTML) {
                                        startContainer = element
                                    }
                                    if(element.innerText == startText) {
                                        startContainer = element
                                    }
                                }
                                if(endContainer == undefined) {
                                    if(element.innerHTML == endContainerHTML) {
                                        endContainer = element
                                    }
                                    if(element.innerText == endText) {
                                        endContainer = element
                                    }
                                }
                                if(element.innerHTML == commonAncestorContainerHTML) {
                                    commonAncestorContainer = element
                                    //console.log(commonAncestorContainer);
                                }
                                if(allElements[allElements.length - 1] == element) {
                                    //console.log("last element")
                                    if(commonAncestorContainer !== undefined) {
                                        if(startText !== undefined) {
                                            let parentChildren = commonAncestorContainer.childNodes;
                                            //console.log(parentChildren);
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
                            //console.log("after last")
                            if(commonAncestorContainer === undefined && startContainer === undefined && endContainer === undefined) {
                                //console.log("removed note");
                                //console.log(userSelection);
                                notExist.push(userSelection)
                                continue;
                            }
                            if(jsonSubKeys[y + 1]) {
                                //console.log("check jsonsubkey")
                                if(jsonSubKeys[y + 1].range.order == currentOrderNumber + 1) {
                                    //console.log("next is higher");
                                    currentOrderNumber = currentOrderNumber + 1
                                }
                                if(jsonSubKeys[y + 1].range.order == 0) {
                                    currentOrderNumber = 0;
                                }
                            }
                        }
                    }
                    //console.log(notExist);
                    
                    for(let notExists in notExist) {
                        console.log(notExists)
                        for (let j = 0; j < jsonSubKeys.length; j++) {
                            if(jsonSubKeys[j] === notExist[notExists]) {
                                jsonSubKeys.splice(j, 1);
                            }
                        }
                    }
                    console.log(jsonSubKeys);
                }
                //removeUnusedRanges();
                function checkDeletedRanges() {
                    var ranges = jsonSubKeys;
                    //console.log(ranges)
                    let updatedRanges = [];
                    let currentCommon;
                    let alreadyUsed = [];
                    for(var x = 0; x < ranges.length; x++) {
                        let done = false;
                        for(var b = 0; b < alreadyUsed.length; b++) {
                            if(ranges[x].range.commonAncestorContainerReal == alreadyUsed[b]) {
                                done == true;
                                break;
                            }
                        }
                        if(done == false) {
                            let highestNumber = -1;
                            let commonArray = [];
                            let orderArray = []
                            currentCommon = ranges[x].range.commonAncestorContainerReal;
                            for(var z = 0; z < ranges.length; z++) {
                                if(ranges[z].range.commonAncestorContainerReal == currentCommon) {
                                    if(ranges[z].range.order > highestNumber) {
                                        highestNumber = ranges[z].range.order;
                                    }
                                    commonArray.push(ranges[z]);
                                    orderArray.push(ranges[z].range.order);
                                }
                            }
                            orderArray = [...new Set(orderArray)];
                            orderArray.sort(function(a, b) {
                                return a - b;
                            });
                            //console.log(commonArray);
                            //console.log(orderArray);
                            let missingNumbers = [];
                            prletMissingElements(orderArray, orderArray.length)
                            function prletMissingElements(arr, N) {
                                // Initialize diff
                                let diff = arr[0] - 0;
                            
                                for(let i1 = 0; i1 < N; i1++)
                                {
                                
                                    // Check if diff and arr[i]-i
                                    // both are equal or not
                                    if (arr[i1] - i1 != diff)
                                    {
                                    
                                        // Loop for consecutive
                                        // missing elements
                                        while (diff < arr[i1] - i1)
                                        {
                                            missingNumbers.push((i1 + diff))
                                            diff++;
                                        }
                                    }
                                }
                            }
                            for(var z1 = 0; z1 < commonArray.length; z1++) {
                                if(commonArray[z1].range.order > missingNumbers[0]) {
                                    let subLevel = commonArray[missingNumbers[0] - 1].range.subLevel;
                                    //console.log(subLevel)
                                    let common = commonArray[missingNumbers[0] - 1].range.commonAncestorContainer;
                                    let start = commonArray[missingNumbers[0] - 1].range.startContainer;
                                    let end = commonArray[missingNumbers[0] - 1].range.endContainer;
                                    let text = commonArray[missingNumbers[0] - 1].highlight;
                                    //console.log(commonArray[missingNumbers[0] - 1])
                                    updateRanges(common, text)
                                    function updateRanges(common, text) {
                                        let commonChange = common.split(text);
                                        //console.log(common)
                                        let textAdded;
                                        if(subLevel == 0) {
                                            textAdded = commonChange[0] + '<span class="slooth-check-popup" style="background-color: yellow; display: inline;" value="' + text +'">'
                                        }
                                        if(subLevel == 1) {
                                            textAdded = commonChange[0] + '<span class="slooth-check-popup-sub" style="background-color: #dd99ff; display: inline;" value="' + text +'">'
                                        }
                                        if(subLevel == 2) {
                                            textAdded = commonChange[0] + '<span class="slooth-check-popup-sub" style="background-color: #ffcc00; display: inline;" value="' + text +'">'
                                        }
                                        if(subLevel == 3) {
                                            textAdded = commonChange[0] + '<span class="slooth-check-popup-sub" style="background-color: #66bbff; display: inline;" value="' + text +'">'
                                        }
                                        if(subLevel == 4) {
                                            textAdded = commonChange[0] + '<span class="slooth-check-popup-sub" style="background-color: #55ff55; display: inline;" value="' + text +'">'
                                        }
                                        if(subLevel == 5) {
                                            textAdded = commonChange[0] + '<span class="slooth-check-popup-sub" style="background-color: #ff6666; display: inline;" value="' + text +'">'
                                        }
                                        //console.log(textAdded)
                                        let finalText = textAdded + text + "</span>" + commonChange[1];
                                        let newCommon = finalText;
                                        //console.log(newCommon);
                                        let startText;
                                        let endText;
                                        let startOffset;
                                        let endOffset;

                                        let testDiv = document.createElement("div");
                                        testDiv.innerHTML = newCommon;
                                        let testDivNodes = testDiv.childNodes;
                                        for(let test1 = 0; test1 < testDivNodes.length; test1++) {
                                            //console.log(testDivNodes[test1].innerText);
                                            if(testDivNodes[test1].innerText) {
                                                if(testDivNodes[test1].innerText.includes(commonArray[z1].highlight)) {
                                                    startText = testDivNodes[test1].innerText;
                                                    endText = testDivNodes[test1].innerText;
                                                    commonArray[z1].range.startText = startText;
                                                    commonArray[z1].range.endText = endText;
                                                    let textLength = testDivNodes[test1].innerText.length;
                                                    let testSplit = testDivNodes[test1].innerText.split(commonArray[z1].highlight);
                                                    startOffset = testSplit[0].length;
                                                    endOffset = testSplit[0].length + commonArray[z1].note.length;
                                                    commonArray[z1].range.startOffset = startOffset;
                                                    commonArray[z1].range.endOffset = endOffset;
                                                }
                                            }
                                            if(!testDivNodes[test1].innerText) {
                                                if(testDivNodes[test1].data.includes(commonArray[z1].highlight)) {
                                                    startText = testDivNodes[test1].data;
                                                    endText = testDivNodes[test1].data;
                                                    commonArray[z1].range.startText = startText;
                                                    commonArray[z1].range.endText = endText;
                                                    let textLength = testDivNodes[test1].data.length;
                                                    let testSplit = testDivNodes[test1].data.split(commonArray[z1].highlight);
                                                    startOffset = testSplit[0].length;
                                                    //console.log(startOffset);
                                                    endOffset = testSplit[0].length + commonArray[z1].highlight.length;
                                                    commonArray[z1].range.startOffset = startOffset;
                                                    commonArray[z1].range.endOffset = endOffset;
                                                }
                                            }
                                        }
                                        
                                        if(commonArray[z1].range.commonAncestorContainer == commonArray[z1].range.startContainer && commonArray[z1].range.commonAncestorContainer == commonArray[z1].range.endContainer) {
                                            if(commonArray[z1].range.order > missingNumbers[0]) {
                                                commonArray[z1].range.commonAncestorContainer = newCommon;
                                                commonArray[z1].range.startContainer = newCommon;
                                                commonArray[z1].range.endContainer = newCommon;
                                                commonArray[z1].range.order = missingNumbers[0];
                                                updatedRanges.push(commonArray[z1]);
                                            }
                                        }
                                        //console.log(updatedRanges);
                                    }
                                    missingNumbers.shift()
                                }
                            }
                            //console.log(x);
                            alreadyUsed.push(ranges[x].range.commonAncestorContainerReal)
                            for(var x1 = 0; x1 < ranges.length; x1++) {
                                for(let y1 = 0; y1 < updatedRanges.length; y1++) {
                                    //console.log(ranges);
                                    //console.log(updatedRanges);
                                    //console.log(ranges[x1]);
                                    //console.log(updatedRanges[y1].highlight);
                                    if(ranges[x1].highlight == updatedRanges[y1].highlight) {
                                        ranges.splice(x1, 1);
                                    }
                                }
                            }
                            for(var x2 = 0; x2 < updatedRanges.length; x2++) {
                                console.log(ranges[x]);
                                console.log(updatedRanges[x2])
                                ranges.push(updatedRanges[x2]);
                            }
                        }
                    }
                    console.log(ranges);
                    addNewRangeColors(ranges)
                }
                //checkDeletedRanges();
                addNewRangeColors(jsonSubKeys)
                function addNewRangeColors(ranges) {
                    console.log(ranges)
                    let updatedRanges = [];
                    let currentCommon;
                    let alreadyUsed = [];
                    for(var x = 0; x < ranges.length; x++) {
                        let done = false;
                        for(var b = 0; b < alreadyUsed.length; b++) {
                            if(ranges[x].range.commonAncestorContainerReal == alreadyUsed[b]) {
                                done == true;
                                break;
                            }
                        }
                        if(done == false) {
                            let highestNumber = -1;
                            let commonArray = [];
                            currentCommon = ranges[x].range.commonAncestorContainerReal;
                            for(var z = 0; z < ranges.length; z++) {
                                if(ranges[z].range.commonAncestorContainerReal == currentCommon) {
                                    if(ranges[z].range.order > highestNumber) {
                                        highestNumber = ranges[z].order;
                                    }
                                    commonArray.push(ranges[z]);
                                }
                            }
                            console.log(commonArray);
                            for(var z1 = 0; z1 < commonArray.length; z1++) {
                                if(commonArray[z1].range.order > 0 && commonArray[z1].range.subLevel >= 0 || commonArray[z1].range.order === 0 && commonArray[z1].range.subLevel > 0 && z1 - 1 >= 0) {
                                    console.log(z1)
                                    console.log(commonArray[z1]);
                                    console.log(commonArray[z1 - 1])
                                    let subLevel = commonArray[z1 - 1].range.subLevel;
                                    //console.log(subLevel)
                                    let common = commonArray[z1 - 1].range.commonAncestorContainer;
                                    let start = commonArray[z1 - 1].range.startContainer;
                                    let end = commonArray[z1 - 1].range.endContainer;
                                    let text = commonArray[z1 - 1].highlight;
                                    let color = commonArray[z1 - 1].color;
                                    console.log(commonArray[z1].range.commonAncestorContainer);
                                    let newText = undefined;
                                    let indexCheck = commonArray[z1].range.commonAncestorContainer.indexOf(text, (commonArray[z1].range.commonAncestorContainer.indexOf(text) + 1));
                                    console.log(indexCheck);
                                    let indexCheckLast = indexCheck + text.length;
                                    console.log(commonArray[z1].range.commonAncestorContainer.toString()[indexCheck - 1])
                                    if(commonArray[z1].range.commonAncestorContainer[indexCheck - 1] == " ") {
                                        console.log("has space");
                                        newText = " " + text;
                                    }
                                    if(commonArray[z1].range.commonAncestorContainer[indexCheckLast + 1] == " ") {
                                        newText = text + " ";
                                    }
                                    console.log(text);

                                    //console.log(commonArray[z1])
                                    updateRanges(common, text)
                                    function updateRanges(common, text) {
                                        let commonChange = undefined;
                                        if(newText !== undefined) {
                                            commonChange = common.split(newText);
                                        }
                                        if(newText == undefined) {
                                            commonChange = common.split(text);
                                        }
                                        console.log(commonChange)
                                        if(commonChange[0].indexOf(commonChange[0].length) === " ") {
                                            commonChange[0] = commonChange[0].substring(0, commonChange[0].length-1);
                                        }
                                        //console.log(color)
                                        let textAdded;
                                        if(subLevel == 0) {
                                            textAdded = commonChange[0] + '<span class="slooth-check-popup" style="background-color: ' + color + '; display: inline;" value="' + text +'">'
                                        }
                                        if(subLevel > 0) {
                                            textAdded = commonChange[0] + '<span class="slooth-check-popup-sub" style="background-color: ' + color + '; display: inline;" value="' + text +'">'
                                        }
                                        //console.log(textAdded)
                                        let finalText = undefined;
                                        if(newText !== undefined) {
                                            finalText = textAdded + newText + "</span>" + commonChange[1];
                                        }
                                        if(newText == undefined) {
                                            finalText = textAdded + text + "</span>" + commonChange[1];
                                        }
                                        let newCommon = finalText;
                                        console.log(newCommon);
                                        let startText;
                                        let endText;
                                        let startOffset;
                                        let endOffset;
                                        let testDiv = document.createElement("div");
                                        testDiv.innerHTML = newCommon;
                                        //console.log(testDiv);
                                        let testDivNodes = testDiv.childNodes;
                                        //console.log(testDivNodes);
                                        for(let test1 = 0; test1 < testDivNodes.length; test1++) {
                                            //console.log(testDivNodes[test1].innerText);
                                            //console.log(testDivNodes[test1].data);
                                            if(testDivNodes[test1].innerText) {
                                                if(testDivNodes[test1].innerText.includes(commonArray[z1].highlight)) {
                                                    startText = testDivNodes[test1].innerText;
                                                    endText = testDivNodes[test1].innerText;
                                                    commonArray[z1].range.startText = startText;
                                                    commonArray[z1].range.endText = endText;
                                                    let textLength = testDivNodes[test1].innerText.length;
                                                    let testSplit = testDivNodes[test1].innerText.split(commonArray[z1].highlight);
                                                    startOffset = testSplit[0].length;
                                                    endOffset = testSplit[0].length + commonArray[z1].note.length;
                                                    commonArray[z1].range.startOffset = startOffset;
                                                    commonArray[z1].range.endOffset = endOffset;
                                                }
                                            }
                                            if(!testDivNodes[test1].innerText) {
                                                if(testDivNodes[test1].data.includes(commonArray[z1].highlight)) {
                                                    startText = testDivNodes[test1].data;
                                                    endText = testDivNodes[test1].data;
                                                    commonArray[z1].range.startText = startText;
                                                    commonArray[z1].range.endText = endText;
                                                    let textLength = testDivNodes[test1].data.length;
                                                    let testSplit = testDivNodes[test1].data.split(commonArray[z1].highlight);
                                                    startOffset = testSplit[0].length;
                                                    //console.log(startOffset);
                                                    endOffset = testSplit[0].length + commonArray[z1].highlight.length;
                                                    commonArray[z1].range.startOffset = startOffset;
                                                    commonArray[z1].range.endOffset = endOffset;
                                                }
                                            }
                                        }

                                        if(commonArray[z1].range.commonAncestorContainer == commonArray[z1].range.startContainer && commonArray[z1].range.commonAncestorContainer == commonArray[z1].range.endContainer) {
                                            commonArray[z1].range.commonAncestorContainer = newCommon;
                                            commonArray[z1].range.startContainer = newCommon;
                                            commonArray[z1].range.endContainer = newCommon;
                                            //console.log(commonArray[z1]);
                                            updatedRanges.push(commonArray[z1]);
                                        }
                                        //console.log(updatedRanges);
                                    }
                                }
                            }
                            //console.log(x);
                            alreadyUsed.push(ranges[x].range.commonAncestorContainerReal);
                            console.log(ranges);
                            for(let y1 = 0; y1 < updatedRanges.length; y1++) {
                                for(var x1 = 0; x1 < ranges.length; x1++) {
                                    //console.log(ranges);
                                    //console.log(updatedRanges);
                                    //console.log(ranges[x1]);
                                    //console.log(updatedRanges[y1].highlight);
                                    //console.log(ranges[x1]);
                                    if(ranges[x1].highlight == updatedRanges[y1].highlight) {
                                        ranges.splice(x1, 1);
                                        ranges.push(updatedRanges[y1]);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    console.log(ranges);
                    treatJSON(ranges);
                }
                function treatJSON(treatedJSON) {
                    jsonSubKeys = treatedJSON;
                    jsonSubKeys.sort((a,b) => a.range.subLevel - b.range.subLevel);
                    let sub0 = [];
                    let sub1 = [];
                    let sub2 = [];
                    let sub3 = [];
                    let sub4 = [];
                    let sub5 = [];
                    let newOrder = [];
                    for(let x = 0; x < jsonSubKeys.length; x++) {
                        if(jsonSubKeys[x].range.subLevel == 0) {
                            console.log(jsonSubKeys[x]);
                            sub0.push(jsonSubKeys[x])
                        }
                        if(jsonSubKeys[x].range.subLevel == 1) {
                            if(sub1.length > 0) {
                                for(let sub = 0; sub < sub1.length; sub++) {
                                    if(sub1[sub].commonAncestorContainerReal == jsonSubKeys[x].range.commonAncestorContainerReal) {
                                        sub1[sub].entries.push(jsonSubKeys[x])
                                    }
                                    if(sub === sub1.length - 1) {
                                        sub1.push({commonAncestorContainerReal: jsonSubKeys[x].range.commonAncestorContainerReal, entries: [jsonSubKeys[x]]})
                                    }
                                }
                            }
                            if(sub1.length === 0) {
                                sub1.push({commonAncestorContainerReal: jsonSubKeys[x].range.commonAncestorContainerReal, entries: [jsonSubKeys[x]]})
                            }
                        }
                        if(jsonSubKeys[x].range.subLevel == 2) {
                            if(sub2.length > 0) {
                                for(let sub = 0; sub < sub2.length; sub++) {
                                    if(sub2[sub].commonAncestorContainerReal == jsonSubKeys[x].range.commonAncestorContainerReal) {
                                        sub2[sub].entries.push(jsonSubKeys[x])
                                    }
                                    if(sub === sub2.length - 1) {
                                        sub2.push({commonAncestorContainerReal: jsonSubKeys[x].range.commonAncestorContainerReal, entries: [jsonSubKeys[x]]})
                                    }
                                }
                            }
                            if(sub2.length === 0) {
                                sub2.push({commonAncestorContainerReal: jsonSubKeys[x].range.commonAncestorContainerReal, entries: [jsonSubKeys[x]]})
                            }
                        }
                        if(jsonSubKeys[x].range.subLevel == 3) {
                            if(sub3.length > 0) {
                                for(let sub = 0; sub < sub3.length; sub++) {
                                    if(sub3[sub].commonAncestorContainerReal == jsonSubKeys[x].range.commonAncestorContainerReal) {
                                        sub3[sub].entries.push(jsonSubKeys[x])
                                    }
                                    if(sub === sub3.length - 1) {
                                        sub3.push({commonAncestorContainerReal: jsonSubKeys[x].range.commonAncestorContainerReal, entries: [jsonSubKeys[x]]})
                                    }
                                }
                            }
                            if(sub3.length === 0) {
                                sub3.push({commonAncestorContainerReal: jsonSubKeys[x].range.commonAncestorContainerReal, entries: [jsonSubKeys[x]]})
                            }
                        }
                        if(jsonSubKeys[x].range.subLevel == 4) {
                            if(sub4.length > 0) {
                                for(let sub = 0; sub < sub4.length; sub++) {
                                    if(sub4[sub].commonAncestorContainerReal == jsonSubKeys[x].range.commonAncestorContainerReal) {
                                        sub4[sub].entries.push(jsonSubKeys[x])
                                    }
                                    if(sub === sub4.length - 1) {
                                        sub4.push({commonAncestorContainerReal: jsonSubKeys[x].range.commonAncestorContainerReal, entries: [jsonSubKeys[x]]})
                                    }
                                }
                            }
                            if(sub4.length === 0) {
                                sub4.push({commonAncestorContainerReal: jsonSubKeys[x].range.commonAncestorContainerReal, entries: [jsonSubKeys[x]]})
                            }
                        }
                        if(jsonSubKeys[x].range.subLevel == 5) {
                            if(sub5.length > 0) {
                                for(let sub = 0; sub < sub5.length; sub++) {
                                    if(sub5[sub].commonAncestorContainerReal == jsonSubKeys[x].range.commonAncestorContainerReal) {
                                        sub5[sub].entries.push(jsonSubKeys[x])
                                    }
                                    if(sub === sub5.length - 1) {
                                        sub5.push({commonAncestorContainerReal: jsonSubKeys[x].range.commonAncestorContainerReal, entries: [jsonSubKeys[x]]})
                                    }
                                }
                            }
                            if(sub5.length === 0) {
                                sub5.push({commonAncestorContainerReal: jsonSubKeys[x].range.commonAncestorContainerReal, entries: [jsonSubKeys[x]]})
                            }
                        }
                        if(x === jsonSubKeys.length - 1) {
                            console.log(sub0);
                            if(sub0.length > 0) {
                                sub0.sort((a,b) => a.range.order - b.range.order);
                                for(let sub = 0; sub < sub0.length; sub++) {
                                    newOrder.push(sub0[sub]);
                                }
                            }
                            console.log(newOrder);
                            if(sub1.length > 0) {
                                for(let sub = 0; sub < sub1.length; sub++) {
                                    sub1[sub].entries.sort((a,b) => a.range.order - b.range.order);
                                    for(let subNext = 0; subNext < sub1[sub].entries.length; subNext++) {
                                        newOrder.push(sub1[sub].entries[subNext])
                                    }
                                }
                            }
                            if(sub2.length > 0) {
                                for(let sub = 0; sub < sub2.length; sub++) {
                                    sub2[sub].entries.sort((a,b) => a.range.order - b.range.order);
                                    for(let subNext = 0; subNext < sub2[sub].entries.length; subNext++) {
                                        newOrder.push(sub2[sub].entries[subNext])
                                    }
                                }
                            }
                            if(sub3.length > 0) {
                                for(let sub = 0; sub < sub3.length; sub++) {
                                    sub3[sub].entries.sort((a,b) => a.range.order - b.range.order);
                                    for(let subNext = 0; subNext < sub3[sub].entries.length; subNext++) {
                                        newOrder.push(sub3[sub].entries[subNext])
                                    }
                                }
                            }
                            if(sub4.length > 0) {
                                for(let sub = 0; sub < sub4.length; sub++) {
                                    sub4[sub].entries.sort((a,b) => a.range.order - b.range.order);
                                    for(let subNext = 0; subNext < sub4[sub].entries.length; subNext++) {
                                        newOrder.push(sub4[sub].entries[subNext])
                                    }
                                }
                            }
                            if(sub5.length > 0) {
                                for(let sub = 0; sub < sub5.length; sub++) {
                                    sub5[sub].entries.sort((a,b) => a.range.order - b.range.order);
                                    for(let subNext = 0; subNext < sub5[sub].entries.length; subNext++) {
                                        newOrder.push(sub5[sub].entries[subNext])
                                    }
                                }
                            }
                            console.log(newOrder)
                            jsonSubKeys = newOrder;
                        }
                    }
                    console.log(jsonSubKeys);
                    let currentOrderNumber = 0;
                    for (var y = 0; y < jsonSubKeys.length; y++) {
                        //console.log(y)
                        //console.log(currentOrderNumber);
                        console.log(jsonSubKeys[y].highlight);
                        const selection = window.getSelection();
                        //console.log(selection);
                        selection.removeAllRanges();
                        // Select paragraph
                        let finalNote = jsonSubKeys[y].highlight;
                        var colorFill = jsonSubKeys[y].color;
                        //console.log(selection.anchorNode.innerHTML);
                        let userSelection = jsonSubKeys[y];
                        console.log("user selection");
                        //console.log(userSelection);
                        let startContainerHTML = userSelection.range.startContainer
                        let endContainerHTML = userSelection.range.endContainer
                        let commonAncestorContainerHTML = userSelection.range.commonAncestorContainer;
                        let startText = userSelection.range.startText;
                        let endText = userSelection.range.endText;
                        let startOffset = userSelection.range.startOffset;
                        let endOffset = userSelection.range.endOffset;
                        let order = userSelection.range.order;
                        let commonAncestorContainerRealHTML = userSelection.range.commonAncestorContainerReal;
                        let subLevel = userSelection.range.subLevel;
                        
                        let startContainer;
                        let endContainer;
                        let commonAncestorContainer;
                        const allElements = document.getElementsByTagName('*');
                        for (const element of allElements) {
                            if(element.parentElement) {
                                if(element.parentElement.classList) {
                                    if(element.parentElement.classList.value == "slooth-check-popup") {
                                        console.log(element.parentElement.childNodes);
                                        for(var newTry = 0; newTry < element.parentElement.childNodes.length; newTry++) {
                                            if(element.parentElement.childNodes[newTry].textContent == startText) {
                                                startContainer = element.parentElement.childNodes[newTry];
                                            }
                                            if(element.parentElement.childNodes[newTry].textContent == endText) {
                                                endContainer = element.parentElement.childNodes[newTry];
                                            }
                                        }
                                    }
                                    if(element.parentElement.classList.value == "slooth-check-popup-sub") {
                                        console.log(element.parentElement.childNodes);
                                        for(var newTry2 = 0; newTry2 < element.parentElement.childNodes.length; newTry2++) {
                                            if(element.parentElement.childNodes[newTry2].textContent == startText) {
                                                startContainer = element.parentElement.childNodes[newTry2];
                                            }
                                            if(element.parentElement.childNodes[newTry2].textContent == endText) {
                                                endContainer = element.parentElement.childNodes[newTry2];
                                            }
                                        }
                                    }
                                }
                            }
                            if(startContainer == undefined) {
                                if(element.innerHTML == startContainerHTML) {
                                    console.log(startContainerHTML);
                                    startContainer = element
                                    console.log(startContainer)
                                }
                                if(element.innerText == startText) {
                                    startContainer = element
                                }
                            }
                            if(endContainer == undefined) {
                                if(element.innerHTML == endContainerHTML) {
                                    console.log(endContainerHTML);
                                    endContainer = element
                                }
                                if(element.innerText == endText) {
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
                                        console.log(parentChildren);
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
                        //console.log("after last")
                        //if(commonAncestorContainer == undefined) {
                        //    for (const element2 of allElements) {
                        //        let currentRightBeginning = 0;
                        //        for(let char = 0; char < commonAncestorContainerHTML.length; char++) {
                        //            if(element2.innerHTML[char] === commonAncestorContainerHTML[char]) {
                        //                currentRightBeginning++;
                        //            }
                        //        }
                        //        let currentRightEnd = 0;
                        //        for(let charEnd = 0; charEnd < commonAncestorContainerHTML.length; charEnd++) {
                        //            if(element2.innerHTML[element2.innerHTML.length - charEnd] === commonAncestorContainerHTML[commonAncestorContainerHTML.length - charEnd]) {
                        //              currentRightEnd++;
                        //            }
                        //        }
                        //        let currentRightBeginningAverage = currentRightBeginning/commonAncestorContainerHTML.length;
                        //        let currentRightEndAverage = currentRightEnd/commonAncestorContainerHTML.length;
                        //        if(currentRightBeginningAverage > 0.40 || currentRightEndAverage > 0.40) {
                        //            commonAncestorContainer = element2
                        //            startContainer = element2
                        //            endContainer = element2;
                        //        }
                        //    }
                        //}
                        //console.log(commonAncestorContainer);
                        //console.log(startContainer);
                        //console.log(endContainer);
                        if(commonAncestorContainer === undefined && startContainer === undefined && endContainer === undefined || commonAncestorContainer === undefined && startContainer !== undefined && endContainer === undefined) {
                            console.log("removed note");
                            //console.log(userSelection);

                            continue;
                        }
                        if(startContainer.hasChildNodes()) {
                            for(var x3 = 0; x3 < startContainer.childNodes.length; x3++) {
                                console.log(startContainer.childNodes[x3].innerText);
                                console.log(startContainer.childNodes[x3].data);
                                if(startContainer.childNodes[x3].innerText) {
                                    if(startContainer.childNodes[x3].innerText.includes(startText)) {
                                        startContainer = startContainer.childNodes[x3];
                                    }
                                }
                                if(startContainer.childNodes[x3].data) {
                                    if(startContainer.childNodes[x3].data.includes(startText)) {
                                        startContainer = startContainer.childNodes[x3];
                                    }
                                }
                            }
                        }
                        if(endContainer.hasChildNodes()) {
                            for(var x4 = 0; x4 < endContainer.childNodes.length; x4++) {
                                if(endContainer.childNodes[x4].innerText) {
                                    if(endContainer.childNodes[x4].innerText.includes(endText)) {
                                        endContainer = endContainer.childNodes[x4];
                                        break;
                                    }
                                }
                                if(endContainer.childNodes[x4].data) {
                                    if(endContainer.childNodes[x4].data.includes(endText)) {
                                        endContainer = endContainer.childNodes[x4];
                                        break;
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
                            //console.log(safeRanges[x]);
                            rangeArray.push(safeRanges[x]);
                        }
                        //console.log(rangeArray);
                        //console.log(finalNote);
                        for(var z = 0; z < rangeArray.length; z++) {
                            highlightRange(rangeArray[z], finalNote, colorFill, subLevel);
                        }
                    }
                }
                function highlightRange(range, finalNote, colorFill, subLevel) {
                    console.log(range)
                    //console.log(range.commonAncestorContainer.parentElement.classList[0]);
                    let existingPagePopups = document.querySelectorAll('[id^="slooth-popup"]');
                    if(existingPagePopups.length == 0) {
                        let existingHighlights = document.querySelectorAll('[id^="slooth-highlight"]');
                        if(existingHighlights.length > 0) {
                            //console.log("more than one")
                            //let currentHighest = 1;
                            for(var ii = 0; ii < existingHighlights.length; ii++) {
                                if (ii == existingHighlights.length - 1) {
                                    //console.log("this is the value of y " + y);
                                    let highToString = highestNumber.toString();
                                    var newNode = document.createElement("span");
                                    newNode.classList = "slooth-check-popup";
                                    newNode.setAttribute(
                                       "style",
                                       "background-color: " + colorFill + "; display: inline;"
                                    );
                                    newNode.setAttribute(
                                        "value",
                                        finalNote
                                    );
                                    range.surroundContents(newNode);
                                    let newHighlightNote = document.createElement("p");
                                    newHighlightNote.setAttribute("role", "alert");
                                    newHighlightNote.ariaHidden = "false";
                                    newHighlightNote.style = "display: none;";
                                    newHighlightNote.innerText = finalNote + "is the text you just highlighted."
                                    document.body.append(newHighlightNote);
                                }
                                existingHighlights[ii].addEventListener("mouseover", (e) => {
                                    let newHighlightNote = document.createElement("p");
                                    newHighlightNote.setAttribute("role", "alert");
                                    newHighlightNote.ariaHidden = "false";
                                    newHighlightNote.style = "display: none;";
                                    newHighlightNote.innerText = "Click here to see note for" + e.target.innerText;
                                    document.body.append(newHighlightNote)
                                })
                            }
                        }
                        if(existingHighlights.length == 0) {
                            console.log("no highlights");
                            var newNode = document.createElement("span");
                            newNode.classList = "slooth-check-popup";
                            newNode.setAttribute(
                               "style",
                               "background-color: " + colorFill + "; display: inline;"
                            );
                            newNode.setAttribute(
                                "value",
                                finalNote
                            );
                            range.surroundContents(newNode);
                            let newHighlightNote = document.createElement("p");
                            newHighlightNote.setAttribute("role", "alert");
                            newHighlightNote.ariaHidden = "false";
                            newHighlightNote.style = "display: none;";
                            newHighlightNote.innerText = finalNote + "is the text you just highlighted."
                            document.body.append(newHighlightNote);

                            for(var loop = 0; loop < document.getElementsByClassName("slooth-check-popup").length; loop++) {
                                document.getElementsByClassName("slooth-check-popup")[loop].addEventListener("mouseover", (e) => {
                                    let newHighlightNote = document.createElement("p");
                                    newHighlightNote.setAttribute("role", "alert");
                                    newHighlightNote.ariaHidden = "false";
                                    newHighlightNote.style = "display: none;";
                                    newHighlightNote.innerText = "Click here to add note about" + e.target.innerText;
                                    document.body.append(newHighlightNote)
                                })
                            }
                        }
                        window.getSelection().removeAllRanges();
                    }
                }
                var sloothCheckPopup = document.getElementsByClassName("slooth-check-popup");
                var sloothPopup = document.getElementsByClassName("slooth-popup");
                let sloothPopupClick = document.getElementsByClassName("slooth-popup-click")
                let sloothPopupClose = document.getElementsByClassName("slooth-popup-close")
                console.log(sloothCheckPopup);
                var jsonSave = jsonSubKeys;
                function activatePopup(e, click) {
                    //console.log(jsonSave);
                    var currentText = e.target.getAttribute("value");
                    let popupColor = e.target.style.backgroundColor;
                    //console.log(currentText);
                    //e.target.classList.toggle("show");
                    for(var d = 0; d < jsonSave.length; d++) {
                        //console.log(currentText);
                        //console.log(jsonSave[d].highlight);
                        if(jsonSave[d].highlight == currentText) {
                            let existingPopup = false;
                            let existingPopupClick = false
                            if(document.getElementsByClassName("slooth-popup").length > 0) {
                                for(const popup of document.getElementsByClassName("slooth-popup")) {
                                    if(popup.innerText === jsonSave[d].note && click === true) {
                                        popup.remove();
                                    }
                                    if(popup.innerText === jsonSave[d].note && click === false) {
                                        existingPopup = true;
                                    }
                                }
                            }
                            if(document.getElementsByClassName("slooth-popup-click").length > 0) {
                                for(const popup of document.getElementsByClassName("slooth-popup-click")) {
                                    if(popup.innerText === jsonSave[d].note) {
                                        existingPopupClick = true;
                                    }
                                }
                            }
                            if(document.getElementsByClassName("slooth-popup-header").length > 0) {
                                for(const popup of document.getElementsByClassName("slooth-popup-header")) {
                                    if(popup.innerText === jsonSave[d].note && click === true) {
                                        popup.remove();
                                    }
                                    if(popup.innerText === jsonSave[d].note && click === false) {
                                        existingPopup = true;
                                    }
                                }
                            }
                            if(document.getElementsByClassName("slooth-popup-click-header").length > 0) {
                                for(const popup of document.getElementsByClassName("slooth-popup-click-header")) {
                                    if(popup.innerText === jsonSave[d].note) {
                                        existingPopupClick = true;
                                    }
                                }
                            }
                            console.log(existingPopup);
                            if(existingPopup === false && existingPopupClick === false) {
                                commentFill = jsonSave[d].check;
                                console.log(commentFill);
                                let nodeContainer = document.createElement("span");
                                if(click === false && e.target.parentElement.nodeName !== "H1" && e.target.parentElement.nodeName !== "H2" && e.target.parentElement.nodeName !== "H3") {
                                    nodeContainer.classList = "slooth-popup";
                                }
                                if(click === true && e.target.parentElement.nodeName !== "H1" && e.target.parentElement.nodeName !== "H2" && e.target.parentElement.nodeName !== "H3") {
                                    nodeContainer.classList = "slooth-popup-click";
                                }
                                if(click === false && e.target.parentElement.nodeName == "H1" || click === false && e.target.parentElement.nodeName == "H2" || click === false && e.target.parentElement.nodeName == "H3") {
                                    nodeContainer.classList = "slooth-popup-header";
                                }
                                if(click === true && e.target.parentElement.nodeName == "H1" || click === true && e.target.parentElement.nodeName == "H2" || click === true && e.target.parentElement.nodeName == "H3") {
                                    nodeContainer.classList = "slooth-popup-click-header";
                                }
                                console.log(nodeContainer)
                                if(nodeContainer.classList.value !== "slooth-popup-click" && nodeContainer.classList.value !== "slooth-popup-click-header") {
                                        nodeContainer.style.border = "0.25em solid " + popupColor;
                                        let windowClose = document.createElement("span");
                                        windowClose.classList = "slooth-popup-close";
                                        windowClose.innerText = "X";
                                        windowClose.ariaLabel = "Click Here to exit the popup."
                                    nodeContainer.append(windowClose);
                                        var nodeText = document.createElement("p");
                                        nodeText.classList = "slooth-popup-text"
                                        nodeText.innerHTML = commentFill;
                                    nodeContainer.append(nodeText);
                                    e.target.appendChild(nodeContainer);
                                    let noteAlert = document.createElement("p");
                                    noteAlert.setAttribute("role","alert");
                                    noteAlert.style = "display:none;"
                                    noteAlert.ariaHidden = "false";
                                    noteAlert.innerText = commentFill;
                                    document.body.appendChild(noteAlert);
                                    for(var c = 0; c < sloothPopupClose.length; c++) {
                                        sloothPopupClose[c].addEventListener("click", (e) => {
                                            e.target.parentElement.remove();
                                        })
                                    }
                                }
                                if(nodeContainer.classList.value === "slooth-popup-click" || nodeContainer.classList.value === "slooth-popup-click-header") {
                                    let topModal = document.createElement("div");
                                    topModal.classList = "slooth-popup-modal";
                                    let modalContent = document.createElement("div");
                                    modalContent.classList = "slooth-popup-modal-content";
                                    modalContent.style.border = "0.25em solid " + popupColor;
                                    let windowClose = document.createElement("span");
                                    windowClose.classList = "slooth-popup-close";
                                    windowClose.innerText = "X";
                                    windowClose.ariaLabel = "Click Here to exit the popup."
                                    var nodeText = document.createElement("p");
                                        nodeText.classList = "slooth-popup-text"
                                        nodeText.innerHTML = commentFill;
                                    modalContent.append(windowClose);
                                    modalContent.append(nodeText);
                                    topModal.append(modalContent);
                                    document.body.append(topModal);
                                    let closeButtons = document.getElementsByClassName("slooth-popup-close");
                                    for(var a3 = 0; a3 < closeButtons.length; a3++) {
                                        closeButtons[a3].addEventListener("mouseover", (e) => {
                                            let closeAriaLabel = document.createElement("p");
                                            closeAriaLabel.setAttribute("role","alert");
                                            closeAriaLabel.ariaHidden = "false";
                                            closeAriaLabel.style = "display:none;";
                                            closeAriaLabel.innerText = "Click Here to Exit the Popup."
                                            document.body.append(closeAriaLabel);
                                        })
                                        closeButtons[a3].addEventListener("click", (e) => {
                                            let popupWindow = document.getElementsByClassName("slooth-popup-modal")[0]
                                            popupWindow.remove();
                                        })
                                    }
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
                          document.body.append(screenReaderAlert);
                          activatePopup(e, false);
                        })
                        sloothCheckPopup[z].addEventListener("mouseleave", (e) => {
                            console.log("mouseleave")
                            var sloothPopup = document.getElementsByClassName("slooth-popup");
                            for(let popup = 0; popup < sloothPopup.length; popup++) {
                                sloothPopup[popup].remove();
                            }
                            let sloothPopupHeader = document.getElementsByClassName("slooth-popup-header");
                            for(let popupHeader = 0; popupHeader < sloothPopupHeader.length; popupHeader++) {
                                sloothPopupHeader[popupHeader].remove();
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
                          document.body.append(screenReaderAlert);
                          activatePopup(e, false);
                        })
                        sloothCheckPopup[z].addEventListener("mouseleave", (e) => {
                            var sloothPopup = document.getElementsByClassName("slooth-popup");
                            for(let popup = 0; popup < sloothPopup.length; popup++) {
                                sloothPopup[popup].remove();
                            }
                            let sloothPopupHeader = document.getElementsByClassName("slooth-popup-header");
                            for(let popupHeader = 0; popupHeader < sloothPopupHeader.length; popupHeader++) {
                                sloothPopupHeader[popupHeader].remove();
                            }
                        })
                        sloothCheckPopup[z].addEventListener('click', (e) => {
                            let screenReaderAlert = document.createElement("p");
                            screenReaderAlert.setAttribute("role", "alert");
                            screenReaderAlert.ariaHidden = "false"
                            screenReaderAlert.style = "display: none;"
                            screenReaderAlert.innerText = "You have clicked on a Slooth News note." + e.target.innerText + "The note has automatically displayed."
                            document.body.append(screenReaderAlert);
                            activatePopup(e, true);
                        })
                    }
                }
                console.log(sloothCheckPopup.length);
                if(sloothCheckPopup.length !== jsonResponse.length) {
                    alert("This article has changed since it was fact checked on " + jsonResponse[0].entries[0].date.split("_")[0] + ".").preventDefault();
                }
                //var styleSheet = document.createElement("style");
                //styleSheet.rel = "stylesheet";
                //styleSheet.innerText = styles;
                ////console.log(styleSheet);
                //document.head.appendChild(styleSheet);
            }
            if(document.getElementsByClassName("slooth-icon-click-owl")[0].src == "https://slooth-subscription-site.herokuapp.com/pictures/owl_eyes_open.png") {
                console.log("deactivation button")
                window.location.href = window.location.href;
            }
        });
        pageButtonAdded.addEventListener("mouseover", (e) => {
            let screenReaderAlert = document.createElement("p");
            screenReaderAlert.setAttribute("role", "alert");
            screenReaderAlert.ariaHidden = "false"
            screenReaderAlert.style = "display: none;"
            screenReaderAlert.innerText = "Click here to activate the Slooth News Fact Checker."
        })
        document.getElementsByClassName("slooth-icon-click-owl")[0].addEventListener("mouseenter", (e) => {
            if(document.getElementsByClassName("slooth-check-popup").length == 0) {
                console.log(e.target.style.backgroundImage)
                e.target.src = "https://slooth-subscription-site.herokuapp.com/pictures/main_icon_closed.png";
                let modes = [1, 2, 3, 4];
                let interval = 250;
                const loadImage = src =>
                new Promise((resolve, reject) => {
                    resolve(src)
                });

                let currentNumber = 1;
                callPics();

                function callPics() {
                    console.log(currentNumber);
                    setTimeout(() => {
                        if(currentNumber === 4) {
                            document.getElementsByClassName("slooth-icon-click-owl")[0].src = "https://slooth-subscription-site.herokuapp.com/pictures/main_icon_partiallyclosed4.png";
                        }
                        if(currentNumber < 4) {
                            if(document.getElementsByClassName("slooth-check-popup").length == 0) {
                                loadImage("https://slooth-subscription-site.herokuapp.com/pictures/main_icon_partiallyclosed" + currentNumber + ".png")
                                .then(
                                    (image) => {
                                        document.getElementsByClassName("slooth-icon-click-owl")[0].src = image;
                                        currentNumber = currentNumber + 1;
                                        callPics();
                                    }
                                )
                            }
                        }
                    }, interval)
                }
            }
        })
        document.getElementsByClassName("slooth-icon-click-owl")[0].addEventListener("mouseleave", (e) => {
            if(document.getElementsByClassName("slooth-check-popup").length == 0) {
                e.target.src = "https://slooth-subscription-site.herokuapp.com/pictures/main_icon_closed.png";
            }
        })
    }
};