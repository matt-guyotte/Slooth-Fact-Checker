//let color = '#3aa757';
//let word = 'some';
//
//chrome.runtime.onInstalled.addListener(() => {
//  chrome.storage.sync.set({ word });
//  console.log("Word set to" + word);
//});

async function callJSON() {
  let jsonCall = await fetch("https://gist.githubusercontent.com/matt-guyotte-slooth/9951832892c58b25cf96d22fba01c699/raw/c9dc152d685f0bfada984732612e49c5793faa07/slooth.json", {mode: "cors"});
  let jsonRes = await jsonCall.json();
  console.log(jsonRes)
}

callJSON();

//fetch("https://raw.githubusercontent.com/sloothnews/for-mg/main/entries.json?token=GHSAT0AAAAAABRBK2MPDPZKOYKI7YIBCODAYPYLAQA", {
//  method: 'POST',
//  headers: {
//    'Accept': 'application/json',
//    'Content-Type': 'application/json'
//  },
//}).then(function (a) {
//  return a.json(); // call the json method on the response to get JSON
//})
//.then(function (json) {
//  console.log(json)
//})