var qualified_button = document.getElementById("qualify");
        var input_type = document.querySelectorAll(".input_type");

var myDiv = document.getElementById("qualify");

var x1 = document.querySelectorAll(".dropdown-content").innerText;
var subphases = document.querySelectorAll(".dropdown-content");

console.log(x1);

$("#qualify").on('click', function() {
            
    $('.input_type').click(function(e) { 
        
        if (this.checked) {
            $( '.input_type').prop( "checked", false );
        
        }

    })

$('.all-applicants-dropdown').css("alignItems", "center");

// $('.all-applicants-button').css("background-color", "#1877F2");

window.location = "http://www.worki.global/";


});

$('input[type="checkbox"]').prop("autocomplete", "off");

$('#select-all').click(function(event) {
    if(this.checked) {

        // Iterate each checkbox
        $('[name="checkb"]').each(function() {
            this.checked = true;

                
            if ($('.checkbox-jobs:checkbox:checked').length > 0) {  
                this.title = "Deselect applicant";
        
                if ($('.checkbox-jobs:checkbox:checked').length == 1) {
                    
                    $('.input_type').css("display", "flex");

                    $('.input_type').css("float", "left");
                    $('.all-applicants-dropdown').css("alignItems", "flex-start");
                    $('.move-phase-button').css("display", "block");
                    $('.move-phase-button').css("cursor", "not-allowed");
                    $('.all-applicants-dropdown').css("padding-bottom", "0px");
                    $('.all-applicants-button').css("-webkit-transition-duration", "0.4s");
                    $('.all-applicants-button').css("transition-duration", "0.4s");
                    $('.all-applicants-button').css("overflow", "hidden");
                    $('.all-applicants-dropdown-content:last').css("margin-bottom", "15px");
                                
                //     if(!$('.all-applicants-dropdown').is(':visible')) {
        
                //     // $(".all-applicants-button").after(function() {
                //     //     
                //     $('.all-applicants-button').css("background-color", "#71a6eb");
                //     $('.all-applicants-button').css("opacity", "1");
                //     $('.all-applicants-button').css("display", "block");+
        
                //     $('.all-applicants-button').css("content", "");
                //     $('.all-applicants-button').css({
                //                          transition : 'all 0.8s'
                //     });
                //     $('.all-applicants-button').toggleClass('changed');
        
                //     // });
                //     // $('.all-applicants-button').addClass('activated');
                //     // $('.activated').css("opacity", "1");
                //     // $('.activated').css("transition", "0s");
                //     // });
                // }
        
            
                    // $('.move-phase-button').css("background-color", "red");
        
        
                    // $('.input_type').css("marginLeft", "-20px");
        
                    $('#qualify').prop("onclick", null).off("click");
                                                                                                                        
                    // document.getElementById('qualify').style.pointerEvents = 'none';
                    // var x = document.createElement("input");
                    // x.setAttribute("type", "checkbox");
                    $('.input_type').click(function(e) {


                        if (this.checked) {
                            $('#qualify').prop("onclick", null).off("click");
                            $('.all-applicants-dropdown').css("alignItems", "flex-start");
                            $('.move-phase-button').css("background-color", "#1877F2");
                            $('.move-phase-button').css("color", "white");
                            // $('.move-phase-button').prop('title', 'Move to "${.dropdown-content.text()}"');
                            // $('.move-phase-button').text("Move to {$('.input_type:checked'}");
                            $('.move-phase-button').text("Move to" + " " + $('.input_type:checked').val());
                            $('.move-phase-button').prop('title', "Move to" + " " + $('.input_type:checked').val());
                            $('.move-phase-button').css("cursor", "pointer");
        
                            // $('.move-phase-button').css("border-bottom", "1px solid black)");
                            // $('.move-phase-button').css("width", "100%");
        
        
                        }
                        else {
                            $('.all-applicants-dropdown').css("alignItems", "flex-start");
                            $('.move-phase-button').css("background-color", "rgb(221, 221, 221)");
                            $('.move-phase-button').css("color", "rgb(145, 143, 143)");
                            $('.move-phase-button').prop('title', 'Select an option to click here');
                            $('.move-phase-button').css("cursor", "not-allowed");
                            $('.move-phase-button').text("Select to move");
                        }
                    })
                }
        
               }
        
        });

    } else {
        $('[name="checkb"]').each(function() {
            this.checked = false;
            this.title = "Select applicant";
            $('.input_type').css("display", "none");
        });
        this.title = "Select applicant";

        //     if ($('[name="checkb"]').is(':checked')) {
        //     if ($('.input_type').is(':checked')) {
                // document.getElementById('qualify').removeAttribute("onclick");
        //     }
        // }
    
            $('.input_type').not(this).prop('checked', false);
    
            $('.all-applicants-dropdown').css("alignItems", "flex-start");
                        $('.move-phase-button').css("background-color", "rgb(221, 221, 221)");
                        $('.move-phase-button').css("color", "rgb(145, 143, 143)");
                        // $('.move-phase-button').css("color", "rgb(146, 146, 146)");
    
                        $('.move-phase-button').prop('title', 'Select an option to click here');
                        $('.move-phase-button').css("cursor", "not-allowed");
                        $('.move-phase-button').text("Select to move");
    
            if ($('.checkbox-jobs:checkbox:checked').length > 0) { 
                $('.input_type').css("display", "flex");
                $('.input_type').css("float", "left");
                $('.all-applicants-dropdown').css("alignItems", "flex-start");
                $('.move-phase-button').css("background-color", "rgb(221, 221, 221)");
                        $('.move-phase-button').css("color", "rgb(145, 143, 143)");
                        // $('.move-phase-button').css("color", "rgb(146, 146, 146)");
    
                        $('.move-phase-button').prop('title', 'Select an option to click here');
                        $('.move-phase-button').css("cursor", "not-allowed");
                        $('.move-phase-button').text("Select to move");
                // $('.all-applicants-button').css("background-color", "#71a6eb");  
                }
            else {
            $('.all-applicants-dropdown').css("alignItems", "center");
            // if ($('.checkbox-jobs').is(':checked')) {
            $("#qualify").on('click', function() {
                
                $('.input_type').click(function(e) {
                    
                    if (this.checked) {
                        $( '.input_type').prop( "checked", false );
        
                    }
        
                })
    
            $('.all-applicants-dropdown').css("alignItems", "center");
    
            // $('.all-applicants-button').css("background-color", "#1877F2");
            
            window.location = "http://www.worki.global/";
    
            
         
            });

            $('.input_type').click(function(e) {
                $('.all-applicants-dropdown').css("alignItems", "center");
            });

    
    
        // }
        // else {
        //     document.getElementById('qualify').removeAttribute("onclick");
        // }
    
            if ($('.checkbox-jobs:checkbox:checked').length < 1) { 
                // $('.all-applicants-button').css("background-color", "#1877F2");
    
            }
            
            $('.move-phase-button').css("display", "none");
            $('.input_type').css("display", "none");
    
            if ($('.checkbox-jobs').is(':checked')) {
    
            $('.input_type').click(function(e) {
    
                    if (this.checked) {
                        $('.move-phase-button').css("display", "none");
                        $('.all-applicants-dropdown').css("alignItems", "center");
                    }
                    else {
                        $('.move-phase-button').css("display", "block");
                                            
                    }
                })
            }
            // else {
            //     $('.input_type').click(function(e) {
            //         $('.all-applicants-dropdown').css("alignItems", "center");
            //     })
            // }

            
        }
    
        
    }
    
});

var x1 = document.querySelector(".all-applicants-dropdown");
// var c = document.querySelectorAll(".checkbox-jobs");

$('[name="checkb"]').click(function(e) {   
    if ($('.checkbox-jobs:checkbox:checked').length > 0) {
        this.title = "Deselect applicant";

        if ($('.checkbox-jobs:checkbox:checked').length == 1) {
         
            $('.input_type').css("display", "flex");

            $('.input_type').css("float", "left");
            $('.all-applicants-dropdown').css("alignItems", "flex-start");
            $('.move-phase-button').css("display", "block");
            $('.move-phase-button').css("cursor", "not-allowed");
            $('.all-applicants-dropdown').css("padding-bottom", "0px");
            $('.all-applicants-button').css("-webkit-transition-duration", "0.4s");
            $('.all-applicants-button').css("transition-duration", "0.4s");
            $('.all-applicants-button').css("overflow", "hidden");
            $('.all-applicants-dropdown-content:last').css("margin-bottom", "15px");
            

            $('#qualify').prop("onclick", null).off("click");
                                                                                                                
            // document.getElementById('qualify').style.pointerEvents = 'none';
            // var x = document.createElement("input");
            // x.setAttribute("type", "checkbox");
            $('.input_type').click(function(e) {

                $('.input_type').not(this).prop('checked', false);

                if (this.checked) {
                    
                    $('#qualify').prop("onclick", null).off("click");
                    $('.all-applicants-dropdown').css("alignItems", "flex-start");
                    $('.move-phase-button').css("background-color", "#1877F2");
                    $('.move-phase-button').css("color", "white");
                    $('.move-phase-button').prop('title', "Move to" + " " + $('.input_type:checked').val());
                    // $('.move-phase-button').prop('title', 'Move to "${.dropdown-content.text()}"');
                    // $('.move-phase-button').text("Move to {$('.input_type:checked'}");
                    $('.move-phase-button').text("Move to" + " " + $('.input_type:checked').val());

                    $('.move-phase-button').css("cursor", "pointer");

                    // $('.move-phase-button').css("border-bottom", "1px solid black)");
                    // $('.move-phase-button').css("width", "100%");


                }
                else {
                    $('.all-applicants-dropdown').css("alignItems", "flex-start");
                    $('.move-phase-button').css("background-color", "rgb(221, 221, 221)");
                    $('.move-phase-button').css("color", "rgb(145, 143, 143)");
                    $('.move-phase-button').prop('title', 'Select an option to click here');
                    $('.move-phase-button').css("cursor", "not-allowed");
                    $('.move-phase-button').text("Select to move");
                }
            })
        }

       }
    else {
            this.title = "Select applicant";

    //     if ($('[name="checkb"]').is(':checked')) {
    //     if ($('.input_type').is(':checked')) {
            // document.getElementById('qualify').removeAttribute("onclick");
    //     }
    // }

        $('.input_type').not(this).prop('checked', false);

        $('.all-applicants-dropdown').css("alignItems", "flex-start");
                    $('.move-phase-button').css("background-color", "rgb(221, 221, 221)");
                    $('.move-phase-button').css("color", "rgb(145, 143, 143)");
                    // $('.move-phase-button').css("color", "rgb(146, 146, 146)");

                    $('.move-phase-button').prop('title', 'Select an option to click here');
                    $('.move-phase-button').css("cursor", "not-allowed");
                    $('.move-phase-button').text("Select to move");

        if ($('.checkbox-jobs:checkbox:checked').length > 0) {
            $('.input_type').css("display", "flex");
            $('.input_type').css("float", "left");
            $('.all-applicants-dropdown').css("alignItems", "flex-start");
            $('.move-phase-button').css("background-color", "rgb(221, 221, 221)");
                    $('.move-phase-button').css("color", "rgb(145, 143, 143)");

                    $('.move-phase-button').prop('title', 'Select an option to click here');
                    $('.move-phase-button').css("cursor", "not-allowed");
                    $('.move-phase-button').text("Select to move");
            }
        else {
        $('.all-applicants-dropdown').css("alignItems", "center");
        $('.all-applicants-dropdown-content:last').css("margin-bottom", "20px");
        // if ($('.checkbox-jobs').is(':checked')) {
        $("#qualify").on('click', function() {
            
            $('.input_type').click(function(e) { 
                
                if (this.checked) {
                    $( '.input_type').prop( "checked", false );

                }
    
            })

        $('.all-applicants-dropdown').css("alignItems", "center");

        // $('.all-applicants-button').css("background-color", "#1877F2");
        
        window.location = "http://www.worki.global/";

        });

        $('.input_type').click(function(e) {
            $('.all-applicants-dropdown').css("alignItems", "center");
        });

        if ($('.checkbox-jobs:checkbox:checked').length < 1) { 

        }
        
        $('.move-phase-button').css("display", "none");
        $('.input_type').css("display", "none");


    }

    }                                                                                                                                                                                                                                                                                 
})

$('.input_type').click(function(e) {
    $('.input_type').not(this).prop('checked', false);
});
