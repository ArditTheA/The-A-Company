
    function present(){
        var textbox = document.getElementById('id_end_date')
        if (textbox.disabled) {
            textbox.disabled = false;
            textbox.placeholder = "End Date dd/mm/yyyy";
        }else{
            textbox.disabled = true;
            textbox.placeholder = "Present";
            textbox.value = "";
            document.getElementById("edateError").style.display = "none";
            document.getElementById("id_end_date").style.borderColor = "#9E9E9E";
        }
    }
    function presentEnd(){
        var textbox = document.getElementById('id_end_year')
        if (textbox.disabled) {
            textbox.disabled = false;
            textbox.placeholder = "End Year dd/mm/yyyy";
        }else{
            textbox.disabled = true;
            textbox.placeholder = "Present";
            textbox.value = "";
            document.getElementById("eYear").style.display = "none";
            document.getElementById("id_end_year").style.borderColor = "#9E9E9E";
        }
    }
