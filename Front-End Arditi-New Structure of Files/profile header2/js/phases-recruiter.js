async function getUser(id) {

    post_id = id;

var elements = document.getElementsByClassName('pixel'); // get all elements

for(var i = 0; i < elements.length; i++){
elements[i].style.backgroundColor = "white";
}
        


        
        
        document.getElementById("Stat").innerHTML = data["Status"];
        document.getElementById("fname").innerHTML= data["fname"]+" "+data["lname"];
        document.getElementById("email").innerHTML= data["email"];
        document.getElementById("phone").innerHTML= data["phone"];
        document.getElementById("location").innerHTML= data["city"];
        document.getElementById("appdate").innerHTML= data["applyDate"];
        var beforeNewDiv1 = "";
        var beforeNewDiv2 = "";
        var div_Replacement = "";
        var Images = "";
        var Img_First = "";
        var Img_Second = "";
        var newDiv1 = "";
        var newDiv2 ="";
        var newDiv3 ="";
        var newDiv4 = "";
        var newDiv5 = "";
        var newDiv6 = "";
        var newDiv7 = "";

        // Documents
        var newDiv = '<input type="hidden" id="applicantID">';
            console.log("testtsad-0a-ds");
            beforeNewDiv1 = '<img class="imgs-three-dots-zip-img three-dots-document" style="" src="../img/Three-dots.svg">';
            beforeNewDiv2 = '<img class="imgs-three-dots-zip-img img-zip-download" style="" src="../img/Zip-img-download-all.svg">';
            if (data["passaportExists"] === true) {
            newDiv1 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div id="passport" class="main-divs-color mutual-titles-color">Passport</div>' +
                '<img style="display: none;" class="img-after-done" src="../img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="../img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="1" data-document-id="1" title="Download Passport" class="passport-img open-popup downloadImg" src="../img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between;">' +
                    '<img class="img-done" src="../img/before-done-img.svg">' +
                '<img class = "img-fail" src="../img/img-fail.svg">' +
            '</div>'
            '</div>';
            }
            else {
            newDiv1 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div id="passport" class="main-divs-color mutual-titles-color">Passport</div>' +
                '<img style="display: none;" class="img-after-done" src="../img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="../img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="1" title="Upload Passport" class="passport-img open-popup" src="../img/documents-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="../img/before-done-img.svg">' +
                '<img class="img-fail" src="../img/img-fail.svg">'
                 +
            '</div>'
            '</div>';
            }
            if (data["studentStatusExists"] === true) {
            newDiv2 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div id="passport" class="main-divs-color mutual-titles-color">Student status</div>' +
                '<img style="display: none;" class="img-after-done" src="../img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="../img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="2" title="Download Student status" class="open-popup" src="../img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="../img/before-done-img.svg">' +
                '<img class="img-fail" src="../img/img-fail.svg">' +
            '</div>'
            '</div>';
                }
                else {
            newDiv2 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div id="passport" class="main-divs-color mutual-titles-color">Student status</div>' +
                '<img style="display: none;" class="img-after-done" src="../img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="../img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="2" title="Upload Student status" class="open-popup" src="../img/documents-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="../img/before-done-img.svg">' +
                '<img class="img-fail" src="../img/img-fail.svg">'
                 +
            '</div>'
            '</div>';
            }
            if (data["certificateOfEnrolmentExists"] === true) {
            newDiv3 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="docs-nike-fails" style=display: flex;">' +
                '<div class="main-divs-color mutual-titles-color">Certificate of Enrolment</div>' +
                '<img style="display: none;" class="img-after-done" src="../img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="../img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="3" title="Download Certificate of Enrolment" class="open-popup" onclick="getDocument(this)"  src="../img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="../img/before-done-img.svg">' +
                '<img class="img-fail" src="../img/img-fail.svg">' +
            '</div>'
            '</div>';
            }
            else {
            newDiv3 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color">Certificate of Enrolment</div>' +
                '<img style="display: none;" class="img-after-done" src="../img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="../img/fail-red.svg" alt="">' +
                '</div>' +   
                '<img data-number="3" title="Upload Certificate of Enrolment" class="open-popup"  src="../img/documents-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="../img/before-done-img.svg">' +
                '<img class="img-fail" src="../img/img-fail.svg">'
                 +
            '</div>'
            '</div>';
            }
            if (data["studentIdExists"] === true){
            newDiv4 =  '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color">Student ID</div>' +
                '<img style="display: none;" class="img-after-done" src="../img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="../img/fail-red.svg" alt="">' +
                '</div>' +   
                '<img data-number="4" title="Download Student ID" class="open-popup" src="../img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="../img/before-done-img.svg">' +
                '<img class="img-fail" src="../img/img-fail.svg">' +
            '</div>'
            }
            else {
            '</div>';
            newDiv4 =  '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color">Student ID</div>' +
                '<img style="display: none;" class="img-after-done" src="../img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="../img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="4" title="Upload Student ID" class="open-popup"  src="../img/documents-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="../img/before-done-img.svg">' +
                '<img class="img-fail" src="../img/img-fail.svg">'
                 +
            '</div>'
            '</div>';
            }
            if(data["photoExists"] === true){

            var newDiv5 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color">Photo</div>' +
                '<img style="display: none;" class="img-after-done" src="../img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="../img/fail-red.svg" alt="">' +
                '</div>' +   
            '<img data-number="5" title="Download Photo" class="open-popup" src="../img/documents-second-icon.svg" alt="">' +
            '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="../img/before-done-img.svg">' +
                '<img class="img-fail" src="../img/img-fail.svg">'
                 +
            '</div>'

        '</div>';
            }
            else {
            var newDiv5 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color">Photo</div>' +
                '<img style="display: none;" class="img-after-done" src="../img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="../img/fail-red.svg" alt="">' +
                '</div>' +
            '<img data-number="5" title="Upload Photo" class="open-popup" src="../img/documents-icon.svg" alt="">' +
            '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="../img/before-done-img.svg">' +
                '<img class="img-fail" src="../img/img-fail.svg">'
                 +
            '</div>'
            
        '</div>';
        }
        url = "/download-cv/"+id
        if(data["ResumeExists"] === true){

        var newDiv6 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
            '<div class="docs-nike-"fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color">Resume</div>' +
                '<img style="display: none;" class="img-after-done" src="../img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="../img/fail-red.svg" alt="">' +
                '</div>' +
            '<a"><img data-number="6" title="Download Resume" class="open-popup" src="../img/documents-icon.svg" alt=""></a>' +
            '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="../img/before-done-img.svg">' +
                '<img class="img-fail" src="../img/img-fail.svg">'
                 +
            '</div>'
        '</div>';
        }   
        else {
            var newDiv6 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
            '<div class="docs-nike-"fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color">Resume</div>' +
                '<img style="display: none;" class="img-after-done" src="../img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="../img/fail-red.svg" alt="">' +
                '</div>' +
            '<a"><img data-number="6" title="Download Resume" class="open-popup" src="../img/documents-icon.svg" alt=""></a>' +
            '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="../img/before-done-img.svg">' +
                '<img class="img-fail" src="../img/img-fail.svg">'
                 +
            '</div>'
        '</div>';
        }
        if(data["serviceContractExists"] === true){

            var newDiv7 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; ">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color">Service contract</div>' +
                '<img style="display: none;" class="img-after-done" src="../img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="../img/fail-red.svg" alt="">' +
                '</div>' +  
                '<img data-number="7" title="Download Service contract"  class="open-popup" src="../img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="../img/before-done-img.svg">' +
                '<img class="img-fail" src="../img/img-fail.svg">'
                 +
            '</div>'

            '</div>';
            }
            else {
            var newDiv7 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; ">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color">Service contract</div>' +
                '<img style="display: none;" class="img-after-done" src="../img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="../img/fail-red.svg" alt="">' +
                '</div>' +   
                '<img data-number="7" title="Upload Service contract"  class="open-popup" src="../img/documents-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="../img/before-done-img.svg">' +
                '<img class="img-fail" src="../img/img-fail.svg">'
                 +
            '</div>'
            '</div>'
                }
            $(".main-div-docs").empty();
        $('#documentList').empty();
        // Append the new div elements to the documentList
        $('#documentList').append(newDiv,newDiv1,newDiv2,newDiv3,newDiv4,newDiv5,newDiv6,newDiv7);
        $('.parent-img-zip').empty();
        $('.parent-img-zip').append(beforeNewDiv1,beforeNewDiv2);
        // $(".main-div-docs").append($(".div_replacement"));
        
        var newDiv8 = ""
        var newDiv9 = ""
        if(data["jobOfferExists"] === true){
            var newDiv8 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Job Offer</div>' +
                '<img style="display: none;" class="img-after-done" src="../img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="../img/fail-red.svg" alt="">' +
                '<img data-number="8" title="Download Job Offer"  class="open-popup"  src="../img/documents-second-icon.svg" alt="">' +
            '</div>';
        }else{
            var newDiv8 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="main-divs-color mutual-titles-color">Job Offer</div>' +
                '<img style="display: none;" class="img-after-done" src="../img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="../img/fail-red.svg" alt="">' +
                '<img data-number="8" title="Download Upload Job Offer"  class="open-popup" src="../img/documents-icon.svg" alt="">' +
            '</div>';
        }
        if(data["workPermitExists"] === true){
            var newDiv9 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; ">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Work Permit</div>' +
                '<img data-number="9" title="Download Work Permit"  class="open-popup"  src="../img/fail-red.svg" alt="">' +
            '</div>';
        }else{
            var newDiv9 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; ">' +
                '<div class="main-divs-color mutual-titles-color">Work Permit</div>' +
                '<img data-number="9" title="Upload Work Permit"  class="open-popup" src="../img/fail-red.svg" alt="">' +
            '</div>';

            
        }
        

$('.three-dots-document').click(function() {
    if ($(".open-popup").css("display") === "block") {
        $(".open-popup").css("display", "none");
        $(".div_replacement").css("display", "block");
        $(".img-zip-download").hide();
    } else {
        $(".open-popup").css("display", "block");
        $(".div_replacement").css("display", "none");
        $(".img-zip-download").show();

    }
});

// Function to toggle image source

        $(document).ready(function() {

$('.open-popup').click(function() {

    var number = $(this).data('number');
    $('#document_id').val(number);
    $('.bg-add-and-edit, .popup').css("display", "flex");
    var titleValue = $(this).attr('title');
    console.log(titleValue);

    // Store the selected "open-popup" element
    selectedPopup = $(this);

    // Update the text and attributes of the selectedPopup
    $('.name-document').text(titleValue);
    console.log(number);

    $('.save-submit-input').off('click').on('click', function() {
        if (selectedPopup) {
            if ($("#id_document")[0].files.length > 0) {
                $('.bg-add-and-edit, .popup').css("display", "none");
                var titleText = $(selectedPopup).attr('title');
                var modifiedTitleText = titleText.replace("Upload", "Download");

                // Set a data attribute on the selectedPopup to store the uploaded file
                selectedPopup.data('uploadedFile', $("#id_document")[0].files[0]);

                selectedPopup.closest('.main-div-docs').find('.mutual-titles-color').addClass("blue-text");
                selectedPopup.attr('src', '../img/documents-second-icon.svg');
                selectedPopup.attr('title', modifiedTitleText);

                // Create the download link if it doesn't exist
                
                // Set the download link properties
                $(selectedPopup).on('click', function() {
                    $('.bg-add-and-edit, .popup').css("display", "none");
                    var uploadedFile = selectedPopup.data('uploadedFile');
                    if (uploadedFile) {
                        var downloadLink = document.createElement('a');
                        downloadLink.href = URL.createObjectURL(uploadedFile);
                        downloadLink.download = uploadedFile.name;
                        downloadLink.style.display = 'none';
            
                        document.body.appendChild(downloadLink);
                        downloadLink.click();

                        const mainDiv = this.closest('.main-div-docs');

const imgDone = mainDiv.querySelector('.img-done');
const imgFail = mainDiv.querySelector('.img-fail');
  
  // Changing the 'src' attribute of the found image

  // Adding a click event listener to the 'imgDone' element
  imgDone.addEventListener("click", function() {

// Preventing propagation of the click event to other elements

// Check if the clicked element's 'src' attribute ends with "before-done-img.svg"
if ($(this).attr("src").endsWith("before-done-img.svg")) {
    // Change the source of 'img-done' only within the current 'main-div-docs'
    $(this).attr("src", "../img/nike-img-done.svg");
    // Change the corresponding 'img-fail' within the same 'main-div-docs'
    $(this).closest('.main-div-docs').find('.img-fail').attr("src", "../img/img-fail.svg");
    $(this).closest('.main-div-docs').find('.img-after-done').css("display", "none");
    selectedPopup.closest('.main-div-docs').find('.mutual-titles-color').addClass("blue-text");
}
else {
    $(imgDone).attr("src", "../img/before-done-img.svg");
}
});

imgFail.addEventListener("click", function() {
// Preventing propagation of the click event to other elements

if ($(this).attr("src").endsWith("img-fail.svg")) {


        $(imgDone).closest('.main-div-docs').find('.img-done').attr("src", "../img/before-done-img.svg");

// Set a data attribute on the selectedPopup to store the uploaded file
    
    // Change the source of 'img-fail' only within the current 'main-div-docs'
    $(this).attr("src", "../img/fail-red.svg");
    // Change the source of 'img-fail' only within the current 'main-div-docs'
    $(this).closest('.main-div-docs').find('.img-done').attr("src", "../img/before-done-img.svg");
    $(this).closest('.main-div-docs').find('.img-after-failed').css("display", "none");
    selectedPopup.closest('.main-div-docs').find('.mutual-titles-color').removeClass("blue-text");
    
    // Change the corresponding 'img-done' within the same 'main-div-docs'
}
else {
    $(imgFail).attr("src", "../img/img-fail.svg");
    selectedPopup.closest('.main-div-docs').find('.mutual-titles-color').addClass("blue-text");
}
});

$('.three-dots-document').click(function() {


if ($(imgDone).attr("src") === "../img/nike-img-done.svg") {
            // selectedPopup.data('uploadedFile', $("#id_document")[0].files[0]);
            // $('.bg-add-and-edit, .popup').css("display", "none");
            $(imgDone).closest('.main-div-docs').find('.img-after-done').css("display", "none");
            $(imgFail).closest('.main-div-docs').find('.img-fail').attr("src", "../img/img-fail.svg");
        if ($(".open-popup").css("display") === "block") {
            $(imgDone).closest('.main-div-docs').find('.img-after-done').css("display", "flex");
            $(imgFail).closest('.main-div-docs').find('.img-after-failed').css("display", "none");
            $(imgFail).closest('.main-div-docs').find('.img-fail').attr("src", "../img/img-fail.svg");

    }
    }


    else if ($(imgFail).attr("src") === "../img/fail-red.svg") {
            $(imgFail).closest('.main-div-docs').find('.img-after-failed').css("display", "none");
            $(imgDone).closest('.main-div-docs').find('.img-done').attr("src", "../img/before-done-img.svg");

        if ($(".open-popup").css("display") === "block") {
            $(imgFail).closest('.main-div-docs').find('.img-after-failed').css("display", "flex");
            $(imgDone).closest('.main-div-docs').find('.img-after-done').css("display", "none");
    }

    }

});

                        document.body.removeChild(downloadLink);
                    }
                        
                });
            }
        }
    });

    // Unbind previous click event handlers and add a new one
});
});

    }

        $('#recdocumentList').empty();
        $('#recdocumentList').append(newDiv8,newDiv9);

        const mediaQuery_applicant = window.matchMedia('(min-width: 768px)');

if (mediaQuery_applicant.matches) {
var select = document.getElementById('select_11'+post_id);
select.style.backgroundColor = "#E7F1FE";

};

function resetProcess() {
    selectedPopup.data('uploadedFile', null);
    selectedPopup.closest('.main-div-docs').find('.img-done').attr("src", "../img/before-done-img.svg");
    selectedPopup.closest('.main-div-docs').find('.img-fail').attr("src", "../img/img-fail.svg");
    selectedPopup.closest('.main-div-docs').find('.img-after-done').css("display", "none");
}

function ClickDoneButton() {

imgDone.addEventListener("click", function() {
    // Preventing propagation of the click event to other elements

    // Check if the clicked element's 'src' attribute ends with "before-done-img.svg"
    if ($(this).attr("src").endsWith("before-done-img.svg")) {
        // Change the source of 'img-done' only within the current 'main-div-docs'
        $(this).attr("src", "../img/nike-img-done.svg");
        // Change the corresponding 'img-fail' within the same 'main-div-docs'
        $(this).closest('.main-div-docs').find('.img-fail').attr("src", "../img/img-fail.svg");
        $(this).closest('.main-div-docs').find('.img-after-done').css("display", "none");
        $('.three-dots-document').click(function() {
        if ($(imgDone).attr("src", "../img/nike-img-done.svg")) {
            $('.bg-add-and-edit, .popup').css("display", "none");
            $(imgDone).closest('.main-div-docs').find('.img-after-done').css("display", "none");
            $(imgFail).closest('.main-div-docs').find('.img-fail').attr("src", "../img/img-fail.svg");
        if ($(".open-popup").css("display") === "block") {
            $(imgDone).closest('.main-div-docs').find('.img-after-done').css("display", "flex");
            $(imgFail).closest('.main-div-docs').find('.img-after-failed').css("display", "none");
            $(imgFail).closest('.main-div-docs').find('.img-fail').attr("src", "../img/img-fail.svg");

    }
    }
    
    });
    }
});
}
