
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
    for (let i = 0; i < container_fluid.length; i++){
        var multiselectOption = container_fluid[i].getElementsByTagName('option')[0];
  
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
    var second_input = document.querySelector('.second-input-form');
    var img_search = document.querySelector('.search-icon-jobs');


    for (let i = 0; i < inputForm.length; i++) {
        inputForm[i].addEventListener('click', function () {
            $(checkboxes[i]).css("left", inputForm[i].offsetLeft - $(".jobs-buttons")[0].scrollLeft);
            $(inputForm[i]).parent().find(".selectOptions").attr("data-leftPos", inputForm[i].offsetLeft);
            if (checkboxes[i].style.display == "block") {
                checkboxes[i].style.display = "none";
            }
            else {
                checkboxes[i].style.display = "block";
                $(".open").removeClass("open")
                $(checkboxes[i]).closest(".selectBox").addClass("open")
            }
            document.addEventListener('click', function(e) {
                if (!checkboxes[i].contains(e.target) && !container_fluid[i].contains(e.target)) {
                    checkboxes[i].style.display = 'none';
                }
            });    
        });
    };

    $(".jobs-buttons").on("scroll", function() {
        var activeDropdown = $('.selectBox.open').find('.selectOptions')
        // subtract scroll position from buttons offset position
        var pos = parseInt(activeDropdown.attr('data-leftPos')) - parseInt($(this).scrollLeft());
        // appply updated position to dropdown
        activeDropdown.css("left", pos);
      });

    


