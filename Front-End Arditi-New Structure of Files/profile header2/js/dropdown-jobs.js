
var multiselect = document.querySelectorAll(".selectBox");
var checkboxes = document.querySelectorAll(".selectOptions");
var second_dropdown = document.querySelectorAll("#mySelectOptions");
var overSelect = document.querySelectorAll(".overSelect");
var second_checkboxes = document.querySelectorAll(".dropdown-elements");
var labels = document.querySelectorAll('.labels-stats');
var option_0 = document.querySelectorAll('first-input-option');
var first_option = document.querySelectorAll(".first-input-option");
var selected_options = "selected";
var jobs_rows_img = document.querySelectorAll(".jobs-rows-img");

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

              $('.input_type').click(function(e) {
  
          // $('#mySelectOptions').css("display", "none");

          if (this.checked) {
              $('.input_type').not(this).prop('checked', false);
  
          }
      })


      if (checkedCheckboxes.length == 1) {
          dropdownValue = values;
      }
      else {

      }

      if ($(".input_type[value='Work and Travel']").is(':checked')) {
          $(".jobs-rows-img")[0].style.display = "none";
          $(".jobs-rows-img")[1].style.backgroundColor = "#E7F1FE";
          $(".right-jobs")[0].style.display = "none";
          $(".right-jobs")[1].style.display = "block";
          $(".jobs-rows-img")[1].style.marginTop = "0px";

      }
      else{

          $(".jobs-rows-img")[0].style.display = "flex";
          $(".right-jobs")[0].style.display = "flex";
          $(".jobs-rows-img")[1].style.backgroundColor = "white";
          $(".jobs-rows-img")[1].style.marginTop = "20px";

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
  var input_type = document.querySelectorAll(".first_input_type");
  var second_input_type = document.querySelectorAll(".second_input_type");
  var third_input_type = document.querySelectorAll(".third_input_type");
  var fourth_input_type = document.querySelectorAll(".fourth_input_type");
  var fifth_input_type = document.querySelectorAll(".fifth_input_type");
  var sixth_input_type = document.querySelectorAll(".sixth_input_type");
  var inputForm = document.querySelectorAll('.input-form');
  var all_dropdown = document.querySelector('.all-applicants-dropdown');
  var show_hide = false;
  var second_input = document.querySelector('.second-input-form');
  var img_search = document.querySelector('.search-icon-jobs');

                                              
  for (let i = 0; i < inputForm.length; i++) {
      inputForm[i].addEventListener('click', function () {
          $(checkboxes[i]).css("left", inputForm[i].offsetLeft - $(".jobs-buttons")[0].scrollLeft);
          $(inputForm[i]).parent().find(".selectOptions").attr("data-leftPos", inputForm[i].offsetLeft);
          // $(all_dropdown[i]).css("left", inputForm[i].offsetLeft - $(".jobs-buttons")[0].scrollLeft);
          // $(inputForm[i]).parent().find(".all-applicants-dropdown").attr("data-leftPos", inputForm[i].offsetLeft);
          
          if (checkboxes[i].style.display == "block") {
              checkboxes[i].style.display = "none";
          }
          else {
              checkboxes[i].style.display = "block";
              setDropdownWidth($(checkboxes[i]))
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
    // Your existing scroll handling code...

    // Get activeDropdown when scrolling
    var activeDropdown = $('.selectBox.open').find('.selectOptions');

    // Calculate left position considering scroll
    var pos = parseInt(activeDropdown.attr('data-leftPos')) - parseInt($(this).scrollLeft());

    // Apply updated position to dropdown
    activeDropdown.css("left", pos);

    // Limit dropdown width based on the container
    setDropdownWidth(activeDropdown);
});

function setDropdownWidth(dropdown) {
    if (dropdown.length == 0) return;

    const menuDiv = $('.main-buttons-div');
    console.log(menuDiv.outerWidth());
    const dropdownLeft = dropdown[0].offsetLeft;

    dropdown.css('width', 'auto');
    if (dropdownLeft + dropdown.outerWidth() > menuDiv.outerWidth()) {
        const newWidth = menuDiv.outerWidth() - dropdownLeft;
        dropdown.outerWidth(newWidth);
    }
}
    
  // $('document').click(function() {
  //     $('#mySelectOptions').hide(); //Hide the menus if visible
  // });



  // for (var i = 0; i < multiselect.length; i++)
  //     document.addEventListener('mouseup', function(er) {
  //         if (!checkboxes[i].contains(er.target)) {
  //             if (checkboxes[i].style.display == "block") {
  //             checkboxes[i].style.display = 'none';
  //             }
  //             else {
  //                 checkboxes[i].style.display = 'none';
  //             }
  //         }
  //     });
  // }



for (let i = 0; i < input_type.length; i++) {
  input_type[i].addEventListener('click', function() {
  if ($("input.input_type:checkbox").is(":checked")) {
      form_select[0].style.backgroundColor = "#1877F2";
      form_select[0].style.color = "white";
      arrow_white_icon[0].style.display = "block";
      arrow_icon[0].style.display = "none";
     // ($("input.input_type:checkbox")).siblings().css( "disabled", "disabled" );
  }
  else {
      form_select[0].style.backgroundColor = "white";
      form_select[0].style.color = "#65676B";
      multiselect[0].getElementsByTagName('option')[0];
      arrow_white_icon[0].style.display = "none";
      arrow_icon[0].style.display = "block";
      first_option[0].innerText = first_option[0].value;
     // checkboxes[0].style.display = "none";
      }
  });
};
for (let i = 0; i < second_input_type.length; i++) {
  second_input_type[i].addEventListener('click', function() {
  if ($("input.second_input_type:checkbox").is(":checked")) {
      form_select[1].style.backgroundColor = "#1877F2";
      form_select[1].style.color = "white";
      arrow_white_icon[1].style.display = "block";
      arrow_icon[1].style.display = "none";
  }
  else {
      form_select[1].style.backgroundColor = "white";
      form_select[1].style.color = "#65676B";
      multiselect[1].getElementsByTagName('option')[0];
      arrow_white_icon[1].style.display = "none";
      arrow_icon[1].style.display = "block";
      first_option[1].innerText = first_option[1].value;
     // checkboxes[0].style.display = "none";
      }
  });
};
for (let i = 0; i < third_input_type.length; i++) {
  third_input_type[i].addEventListener('click', function() {
  if ($("input.third_input_type:checkbox").is(":checked")) {
      form_select[2].style.backgroundColor = "#1877F2";
      form_select[2].style.color = "white";
      arrow_white_icon[2].style.display = "block";
      arrow_icon[2].style.display = "none";
  }
  else {
      form_select[2].style.backgroundColor = "white";
      form_select[2].style.color = "#65676B";
      multiselect[2].getElementsByTagName('option')[0];
      arrow_white_icon[2].style.display = "none";
      arrow_icon[2].style.display = "block";
      first_option[2].innerText = first_option[2].value;
     // checkboxes[0].style.display = "none";
      }
  });
};
for (let i = 0; i < fourth_input_type.length; i++) {
  fourth_input_type[i].addEventListener('click', function() {
  if ($("input.fourth_input_type:checkbox").is(":checked")) {
      form_select[3].style.backgroundColor = "#1877F2";
      form_select[3].style.color = "white";
      arrow_white_icon[3].style.display = "block";
      arrow_icon[3].style.display = "none";
  }
  else {
      form_select[3].style.backgroundColor = "white";
      form_select[3].style.color = "#65676B";
      multiselect[3].getElementsByTagName('option')[0];
      arrow_white_icon[3].style.display = "none";
      arrow_icon[3].style.display = "block";
      first_option[3].innerText = first_option[3].value;
     // checkboxes[0].style.display = "none";
      }
  });
};
for (let i = 0; i < fifth_input_type.length; i++) {
  fifth_input_type[i].addEventListener('click', function() {
  if ($("input.fifth_input_type:checkbox").is(":checked")) {
      form_select[4].style.backgroundColor = "#1877F2";
      form_select[4].style.color = "white";
      arrow_white_icon[4].style.display = "block";
      arrow_icon[4].style.display = "none";
  }
  else {
      form_select[4].style.backgroundColor = "white";
      form_select[4].style.color = "#65676B";
      multiselect[4].getElementsByTagName('option')[0];
      arrow_white_icon[4].style.display = "none";
      arrow_icon[4].style.display = "block";
      first_option[4].innerText = first_option[4].value;
     // checkboxes[0].style.display = "none";
      }
  });
};
for (let i = 0; i < sixth_input_type.length; i++) {
  sixth_input_type[i].addEventListener('click', function() {
  if ($("input.sixth_input_type:checkbox").is(":checked")) {
      form_select[5].style.backgroundColor = "#1877F2";
      form_select[5].style.color = "white";
      arrow_white_icon[5].style.display = "block";
      arrow_icon[5].style.display = "none";
  }
  else {
      form_select[5].style.backgroundColor = "white";
      form_select[5].style.color = "#65676B";
      multiselect[5].getElementsByTagName('option')[0];
      arrow_white_icon[5].style.display = "none";
      arrow_icon[5].style.display = "block";
      first_option[5].innerText = first_option[5].value;
     // checkboxes[0].style.display = "none";
      }
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


$('#mySelectOptions').multiselect({
  includeSelectAllOption: true,
  buttonWidth: '200px', 
}).parent().find("#mySelectOptions").click(function(){
// MyCode
// handle the position of the fixed div
var offSet = $(this).offset();
$(this).parent().find(".container-fluid").css({
   position:"fixed",
   top:offSet.top + $(this).outerHeight(),
   left: offSet.left
});
});

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
