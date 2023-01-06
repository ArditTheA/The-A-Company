var boldtext = document.querySelector('.bold-font-button');
var textareaInnerText = document.querySelector('.inner-text');

boldtext.addEventListener('click', function() {

        if (textareaInnerText.style.fontWeight == "bold") {
                textareaInnerText.style.fontWeight = "normal";
        }
        else {
                textareaInnerText.style.fontWeight = "bold";
        }
});

// document.getElementsByClassName("bold-font-button").addEventListener("click",
//   () => {

//         let text = document.getElementsByClassName("text").innerText
//         let selection = window.getSelection();
//         let boldText = "<b>" + selection + "</b>"
//         document.getElementsByClassName("text").innerHTML = text.replace(selection, boldText) //use innerhtml instead of innertext    
// });

// document.getElementById("bold-button").onclick = function() {
//         textareaInnerText.execCommand("bold");
//     }



// function escapeRegex(string) {
//         return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
//     }
    
//     function boldSearchedWord(text, search) {
//       const escapedSearch = escapeRegex(search);
    
//       // \\b: find just the words STARTING with the searched value 
//       // g: find all words and not just the first one
//       // m: find in multiple lines
//       // i: ignore case sensitive
//       const regexpExpression = new RegExp('\\b('+ escapedSearch + ')\\b', 'gmi');
      
//       let additionalIndexValue = 0;
//       let newText = text;
    
//       while ((match = regexpExpression.exec(text)) !== null) {
//         const boldMatch = '<b>'+ match[0] +'</b>';
//         const matchStart = match.index + additionalIndexValue;
//         const matchEnd = regexpExpression.lastIndex + additionalIndexValue;
        
//         newText = newText.substr(0, matchStart) + boldMatch + newText.substr(matchEnd);
        
//         // After each match, a '<b></b>' HTML element is added surround the searched string in the text
//         // Then we need to add the additional value to the index for a correct replacement
//         additionalIndexValue += 7; 
//       }
      
//       return newText;
//     }
