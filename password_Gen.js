var buttonPressed = document.getElementById("generateButton"); //all global variables here
var dropDown = document.getElementById("dropDownButton");
var allSymbols = document.getElementById("allSymbols");
var capitalLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var lowerLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
    "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{",
    "[", "}", "]", "|", ":", ";", "'", '"', "<", ",", ">", ".", "?", "/"];
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var elements = [];
var prevLength = [];
var droppedDown = false;

allSymbols.addEventListener("click", revealSymbols); //placed event listeners in order of how a client would use them
dropDown.addEventListener("click", revealSymbols);

function revealSymbols() {  //menu to exclude symbols
    
    if (!droppedDown) {

        droppedDown = true;
        document.getElementById("dropDownArrow").src = "images.png";

        for (var idx = 0; idx < symbols.length; idx++) {

            var listOfSymbols = document.getElementById("underAllSymbols");
            var package = document.createElement("label");
            var aSymbol = document.createElement("input");
            aSymbol.setAttribute("type", "checkbox");
            var newLabel = document.createElement("label");
            newLabel.textContent = symbols[idx];
            aSymbol.value = newLabel.textContent;
            package.append(aSymbol);
            package.append(newLabel);
            package.style.display = "in-line"; // unsure of how to vertically align all the checkboxes in the center
            // aSymbol.style.verticalAlign = "middle";
            // listOfSymbols.style.margin = "in-line";
            // newLabel.style.verticalAlign = "middle";
            newLabel.style.marginLeft = "5px";
            if (allSymbols.checked) {
                aSymbol.checked = true;
            }
            listOfSymbols.append(package);
            listOfSymbols.append(document.createElement("br"));
        }

        document.getElementById("underAllSymbols").append(document.createElement("br"));

    } else {

        droppedDown = false;
        document.getElementById("dropDownArrow").src = "680612_arrows_512x512.png";

        document.getElementById("underAllSymbols").remove();
        var newUnderAllSymbols = document.createElement("div");
        newUnderAllSymbols.id = "underAllSymbols";
        document.getElementById("excludeElements").append(newUnderAllSymbols);   
        
    }

}

//when Generate is pressed, two functions are executed
buttonPressed.addEventListener("click", scrambleElements);
buttonPressed.addEventListener("click", generatePassword);

function scrambleElements() { //why? because I might as well practice
    // O(log n), concise, and not buggy :D

    console.log(document.getElementById("underAllSymbols"));
    var checkboxes = document.getElementById("underAllSymbols").querySelectorAll('input[type=checkbox]', 'checked'); //can get all input, iterate through to check if checked, then add to symbolsForRemoval
    var input = Array.from(checkboxes);
    var symbolsTemp = [];
    
    for (var idx = 0; idx < input.length; idx++) {
        if (!checkboxes[idx].checked) {
            console.log(input[idx].value);
            symbolsTemp.push(input[idx].value);
        }
    }
    
    if (symbolsTemp.length > 0 || document.getElementById("allSymbols").checked) {
        elements = [].concat(capitalLetters, lowerLetters, symbolsTemp, numbers);
    } else {
        elements = [].concat(capitalLetters, lowerLetters, symbols, numbers);
    }        
    
    for (var i = 0; i < elements.length / 2; i++) {
        var switchIdx = Math.floor(Math.random() * elements.length);
        var val = elements[switchIdx];
        elements[switchIdx] = elements[i];
        elements[i] = val;
    }

}

function generatePassword() {
    var password = "";
    document.getElementById("generatedPassword").textContent = "";
    var num = document.getElementById("inputBox").value;
    
    if (num == "" && prevLength.length > 0) {
        num = prevLength[prevLength.length - 1];
    } else if (num == "") {
        num = 8;
    } 

    if (!Number.isInteger(parseInt(num)) || num < 8 || num > 20) {
        document.getElementById("question").textContent = "Please type in a valid number.";
    } 
    else {
        prevLength.push(num);
        document.getElementById("question").textContent = "Length: " + num;
        var idx = 0;
            while (idx < num) {
                //random int from 0 to elements length
                var j = Math.floor(Math.random() * elements.length);
                password += elements[j];
                idx++;
        }
        document.getElementById("inputBox").value = "";
        document.getElementById("generatedPassword").textContent = password;
    }
    // console.log(password);
    // console.log(elements);
    
}
