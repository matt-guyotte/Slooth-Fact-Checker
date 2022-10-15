async function callJSON() {
  let jsonCall = await fetch("https://gist.githubusercontent.com/matt-guyotte-slooth/9951832892c58b25cf96d22fba01c699/raw/c9dc152d685f0bfada984732612e49c5793faa07/slooth.json", {mode: "cors"});
  let jsonRes = await jsonCall.json();
  console.log(jsonRes)
}

callJSON();
