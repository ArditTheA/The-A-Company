
var multiselect = document.querySelector(".selectBox");
var checkboxes = document.querySelector(".selectOptions");
var second_dropdown = document.querySelector("#mySelectOptions");
var overSelect = document.querySelector(".overSelect");
var second_checkboxes = document.querySelector(".dropdown-elements");
var labels = document.querySelectorAll('.labels-stats');
var first_option = document.querySelector(".first-input-option");
var selected_options = "selected";
var jobs_rows_img = document.querySelectorAll(".job-left-row");

function checkboxStatusChange() {
      var multiselectOption = container_fluid.getElementsByTagName('option')[0];


      console.log(multiselectOption.textContent);
      
      var values = [];
      var checkedCheckboxes = checkboxes.querySelectorAll('input[type=checkbox]:checked');



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
          else {
          }
      })


      if (checkedCheckboxes.length == 1) {
          dropdownValue = values;
      }
      else {

      }

            multiselectOption.textContent = dropdownValue;

    //   if ($(".input_type[value='Work and Travel']").is(':checked')) {
    //       $(".job-left-row")[0].style.display = "none";
    //       $(".job-left-row")[1].style.backgroundColor = "#E7F1FE";
    //       $(".right-jobs")[0].style.display = "none";
    //       $(".right-jobs")[1].style.display = "block";
    //       $(".job-left-row")[1].style.marginTop = "0px";

          
    //   }
    //   else{

    //       $(".job-left-row")[0].style.display = "flex";
    //       $(".right-jobs")[0].style.display = "flex";
    //       $(".job-left-row")[1].style.backgroundColor = "white";
    //       $(".job-left-row")[1].style.marginTop = "20px";

    //   }


  }

  


  var bodyy = document.querySelector(".header-border");
  var dropdown_remove = document.querySelector('#profile-image-button');
  var jobs_remove = document.querySelector('.jobs-icon-button');
  var container_fluid = document.querySelector('.container-fluid');
  var form_select_2 = document.getElementById('second_form_select');
  var form_select = document.querySelector('.form-select');
  var arrow_icon = document.querySelector('.icon');
  var arrow_white_icon = document.querySelector('.white-icon');
  var input_type = document.querySelectorAll(".first_input_type");
  var inputForm = document.querySelector('.input-form');
  var all_dropdown = document.querySelector('.all-applicants-dropdown');
  var show_hide = false;
  var second_input = document.querySelector('.second-input-form');
  var img_search = document.querySelector('.search-icon-jobs');

                                              
      inputForm.addEventListener('click', function () {
          $(checkboxes).css("left", inputForm.offsetLeft - $(".jobs-buttons")[0].scrollLeft);
          $(inputForm).parent().find(".selectOptions").attr("data-leftPos", inputForm.offsetLeft);
          // $(all_dropdown[i]).css("left", inputForm[i].offsetLeft - $(".jobs-buttons")[0].scrollLeft);
          // $(inputForm[i]).parent().find(".all-applicants-dropdown").attr("data-leftPos", inputForm[i].offsetLeft);
          
          if (checkboxes.style.display == "block") {
              checkboxes.style.display = "none";
          }
          else {
              checkboxes.style.display = "block";
              setDropdownWidth($(checkboxes))
              $(".open").removeClass("open")
              $(checkboxes).closest(".selectBox").addClass("open");
          }
          document.addEventListener('click', function(e) {
              if (!checkboxes.contains(e.target) && !container_fluid.contains(e.target)) {
                  checkboxes.style.display = 'none';
              }
          });    
          
      });

  $(".jobs-buttons").on("scroll", function() {

      var activeDropdown = $('.selectBox.open').find('.selectOptions');
      if (activeDropdown.length == 0)
          return
      // subtract scroll position from buttons offset position
      var pos = parseInt(activeDropdown.attr('data-leftPos')) - parseInt($(this).scrollLeft());
      // appply updated position to dropdown
      activeDropdown.css("left", pos)
      
      // Set width dynamically based on scroll position
      setDropdownWidth(activeDropdown)
    });

    function setDropdownWidth(dropdown) {
      if (dropdown.length == 0)
          return
      const menuDiv = $('.main-buttons-div')
      const dropdownLeft = dropdown[0].offsetLeft   // discutions with Agon for [0]  //
      dropdown.css('width', 'auto')
      if(dropdownLeft + dropdown.outerWidth() > menuDiv.outerWidth()) {
          const newWidth = menuDiv.outerWidth() - dropdownLeft
          dropdown.outerWidth(newWidth)
      }
    }

    $(".all-aplicants-main-div").on("scroll", function() {

      var activeDropdown = $('.all-applicants-over-main.open').find('.all-applicants-dropdown');
      if (activeDropdown.length == 0)
          return
      // subtract scroll position from buttons offset position
      var pos = parseInt(activeDropdown.attr('data-leftPos')) - parseInt($(this).scrollLeft());
      // appply updated position to dropdown
      activeDropdown.css("left", pos)
      
      // Set width dynamically based on scroll position
      setDropdownWidth(activeDropdown)
    });

    function setDropdownWidth(dropdown) {
      if (dropdown.length == 0)
          return
      const menuDiv = $('.main-buttons-div')
      const dropdownLeft = dropdown[0].offsetLeft   // discutions with Agon for [0]  //
      dropdown.css('width', 'auto')
      if(dropdownLeft + dropdown.outerWidth() > menuDiv.outerWidth()) {
          const newWidth = menuDiv.outerWidth() - dropdownLeft
          dropdown.outerWidth(newWidth)
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
      form_select.style.backgroundColor = "#1877F2";
      form_select.style.color = "white";
      arrow_white_icon.style.display = "block";
      arrow_icon.style.display = "none";
     // ($("input.input_type:checkbox")).siblings().css( "disabled", "disabled" );
  }
  else {
      form_select.style.backgroundColor = "white";
      form_select.style.color = "#65676B";
      multiselect.getElementsByTagName('option')[0];
      arrow_white_icon.style.display = "none";
      arrow_icon.style.display = "block";
      first_option.innerText = first_option.value;
      console.log(first_option[0].value);
    //   var multiselectOption = container_fluid.getElementsByTagName('option')[0];
    //   multiselectOption.textContent = first_option.value;
     // checkboxes.style.display = "none";
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
