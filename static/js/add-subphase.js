var add_subphase = document.querySelector(".add-subphase-button");
var all_applicants_dropdown = document.querySelector(".all-applicants-dropdown");

add_subphase.addEventListener("click", function() {

    // var pencil = document.createElement("i");
    // pencil.className = "fas fa-pencil-alt";
    // pencil.id = "penIc";
    // pencil.classList.add("penClass");
    // pencil.style.display = "none";
    // pencil.title = "Edit Subphase";

    // var wrappingDiv = document.createElement("div");

    // all_applicants_dropdown.appendChild(pencil);

var newInput = document.createElement("input");

all_applicants_dropdown.appendChild(newInput);

newInput.style.display = "flex";
newInput.style.flexDirection = "column";
newInput.style.justifyContent = "center";
newInput.classList.add("newInput");
newInputValue = newInput.value;
newInput.style.fontSize = "18px";
newInput.style.width = "100px";
newInput.style.outline = "none";
// all_applicants_dropdown.style.display = "flex";
// all_applicants_dropdown.style.flexDirection = "column";
// all_applicants_dropdown.style.alignItems = "center";
var twoDivs = document.createElement("div");
all_applicants_dropdown.appendChild(twoDivs);

twoDivs.style.display = "flex";
twoDivs.style.flexDirection = "column-reverse";
twoDivs.style.alignItems = "center"
newInput.style.marginBottom = "15px";

var div = document.createElement("div");

div.classList.add("newDivs");
twoDivs.appendChild(add_subphase);
twoDivs.appendChild(newInput);
twoDivs.appendChild(div);

all_applicants_dropdown.appendChild(div);

newInput.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
        var vleraInputit = newInput.value;
        div.textContent = vleraInputit;
        newInput.style.display = "none";
        var two_divs = document.createElement("div");
        two_divs.appendChild(add_subphase);
        two_divs.appendChild(newInput);
        all_applicants_dropdown.appendChild(two_divs);
        two_divs.style.display = "flex";
        twoDivs.style.flexDirection = "column";
        div.style.marginBottom = "15px";
        newInput.style.paddingTop = "0";
        newInput.style.paddingBottom = "0";
        // div.offsetWidth = "40px";

        div.addEventListener("click", function () {

            if (newInput.style.display == 'none') {
                div.style.display = 'none';
                newInput.style.display = 'flex';
                var main_div = document.createElement("div");
                main_div.appendChild(div);
                main_div.appendChild(add_subphase);
                main_div.style.display = "flex";
                main_div.style.flexDirection = "column-reverse";
                div.style.fontSize = "18px";

                    all_applicants_dropdown.appendChild(main_div);

                    newInput.addEventListener("keydown", function(enter) {
                        if (enter.key == "Enter") {
                            var vleraInputit = newInput.value;
                            var div2 = document.createElement("div");
                            div.textContent = vleraInputit;
                            div.style.display = "flex";

                            if (newInput.value == "") {
                                pencil.style.display = "none";
                                add_subphase.addEventListener("click", function() {
                                    add_subphase.style.marginTop = "0px";
                                })
                            }

                        }
                    })
            }

        });

    }
});

// sessionStorage.setItem('key', 'value');


})
