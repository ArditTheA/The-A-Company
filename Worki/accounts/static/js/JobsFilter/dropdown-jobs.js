window.onload = (event) => {
    initMultiselect();
  };
  
  

  var multiselect = document.querySelectorAll(".selectBox");
  var checkboxes = document.querySelectorAll(".selectOptions");
  var second_dropdown = document.querySelectorAll("#mySelectOptions");
  var overSelect = document.querySelectorAll(".overSelect");
  var second_checkboxes = document.querySelectorAll(".dropdown-elements");
  var labels = document.querySelectorAll('.labels-stats');
  var option_0 = document.querySelectorAll('first-input-option');
  var first_option = document.querySelectorAll(".first-input-option");
  var selected_options = "selected";
  function checkboxStatusChange() {
    for (let i = 0; i < multiselect.length; i++){
        var multiselectOption = multiselect[i].getElementsByTagName('option')[0];
  
        console.log(multiselectOption.textContent);
        
        var values = [];
        var checkedCheckboxes = checkboxes[i].querySelectorAll('input[type=checkbox]:checked');
      
        for (const item of checkedCheckboxes) {
          var checkboxValue = item.getAttribute('value');

          values.push(checkboxValue);
        }
      
        var dropdownValue = multiselectOption.innerHTML;

        if (checkedCheckboxes.length == 1) {
            dropdownValue = values;
        }
        else if (checkedCheckboxes.length > 1) {
            dropdownValue = selected_options + " (" + checkedCheckboxes.length + ")";
        }
        multiselectOption.textContent = dropdownValue;
        

      }    
    }

    var bodyy = document.querySelector(".header-border");
    var dropdown_remove = document.querySelector('#profile-image-button');
    var jobs_remove = document.querySelector('.jobs-icon-button');
    var container_fluid = document.querySelectorAll('.container-fluid');
    var form_select_2 = document.getElementById('second_form_select');
    var form_select = document.querySelectorAll('.form-select');
    var arrow_icon = document.querySelectorAll('.icon');
    var arrow_white_icon = document.querySelectorAll('.white-icon');
    var input_type = document.querySelectorAll(".input_type");
    var second_input_type = document.querySelectorAll(".second_input_type");
    var third_input_type = document.querySelectorAll(".third_input_type");
    var fourth_input_type = document.querySelectorAll(".fourth_input_type");
    var fifth_input_type = document.querySelectorAll(".fifth_input_type");
    var sixth_input_type = document.querySelectorAll(".sixth_input_type");
    var inputForm = document.querySelectorAll('.input-form');
    var show_hide = false;

    for (let i = 0; i < container_fluid.length; i++) {
        inputForm[i].addEventListener('click', function () {

            if (checkboxes[i].style.display == "block") {
                checkboxes[i].style.display = "none";
            }
            else {
                checkboxes[i].style.display = "block";
            }
            document.addEventListener('click', function(e) {
                if (!checkboxes[i].contains(e.target) && !inputForm[i].contains(e.target)) {
                    checkboxes[i].style.display = 'none';
                }
            });    
        });
    };
    



    selected_translation    = params.selected_translation   ? params.selected_translation   : "selected",
    
    $_ul = $("<ul />");


    var selected = [];

    for (let i = 0; i < inputForm.length; i++) {


    $_ul.find("input:checked").each(
                                                
        function()
        {
            selected.push($(this).val());
        }
    );


    currently_selected = selected;


    if (selected.length == 0)
    {
            input_type[i].text( "Ardit" );
            inputForm[i].style.backgroundColor = "white";
            inputForm[i].style.color = "#65676B";
        }       

    else if(selected.length == 1)
    {
        inputForm[i].text( "Ardit");

    }
    else if (selected.length > 1) {

        $_select_anchor.text( selected_translation + " (" + selected.length + ")");
    }
    else
    {
        $_select_anchor.text( selected.length + " " + selected_translation );
            
    };

}
// #65676B


        // function toggleCheckboxArea() {
        //     for (var i = 0; i < checkboxes.length; i++) {
        //     var displayValue = checkboxes[i].style.display;
          
        //     if (checkboxes[i] == "block") {
        //         checkboxes.style.display = "none";
        //       }
        //     else {
        //       checkboxes[i].style.display = "none";
        //     }
        //   }          
        // }

        // container_fluid[i].childNodes('[class*="selectOptions"]').style.display = "block";
                // $(container_fluid[i]).siblings().find('[class*="selectOptions"]').css("display", "none");       


        

    
    //     for (let i = 0; i < input_type.length; i++) {
    //         input_type[i].addEventListener('click', function() {
    //         if (input_type[i].checked == true) {
    //             form_select[0].style.backgroundColor = "blue";
    //             form_select[0].style.color = "white";
    //         }
    //         else {
    //             form_select[0].style.backgroundColor = "white";
    //             form_select[0].style.color = "#65676B";
    //          }
    //     });
    // };

//     for (let i = 0; i < checkboxes.length; i++) {
//     body.addEventListener('click', function(event) {
//         if (event.target == checkboxes[i]) {
//             checkboxes[i].style.display = "none";
//         }
//     });
// }; 

