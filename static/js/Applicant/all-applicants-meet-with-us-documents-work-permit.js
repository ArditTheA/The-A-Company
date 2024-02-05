var meet_with_us_form = document.querySelector(".application-update-form-content");
var visa_appointment_second = document.querySelector(".visa-appointment");
var applicants_documents = document.querySelector(".documents-for-work-permit-form-content");
var work_permit = document.querySelector(".your-work-permit-is-here-form-content");
var meet_with_us_div = document.querySelectorAll(".meet-with-us-div");
var documents_div = document.querySelectorAll(".documents-div");
var work_permit_div = document.querySelectorAll(".work-permit-div");
var visa_appointment = document.querySelectorAll(".visa-appointment-div");
var screening_questions_title = document.querySelector(".screening-questions-title");
var documents_for_work_permit_label_dropdown = document.querySelector(".documents-for-work-permit-label-dropdown");
var your_work_permit_is_here_label_dropdown = document.querySelector(".your-work-permit-is-here-label-dropdown");

$(".documents-for-work-permit-label-dropdown").click(function(){
    $(".application-update-form-content").css("display","none");
    $(".work-permit-div").css("display","none");
    $(".documents-for-work-permit-form-content").css("display","block");
});

$(".documents-div").click(function(){
    $(".application-update-form-content").css("display","none");
    $(".your-work-permit-is-here-form-content").css("display","none");
    $(".documents-for-work-permit-form-content").css("display","block");
});

$(".work-permit-div").click(function() {
    console.log("testtt-1231321321-321-321-3-213--213-21-3-")
    $(".application-update-form-content").css("display","none");
    $(".documents-for-work-permit-form-content").css("display","none");
    $(".your-work-permit-is-here-form-content").css("display","block");

});

$(".your-work-permit-is-here-label-dropdown").click(function() {
        $(".meet_with_us_form").css("display", "none");
        $(".your-work-permit-is-here-form-content").css("display", "block");
        $(".documents-for-work-permit-form-content").css("display", "none");
});

$(".application-update-div").click(function() {
    $(".application-update-form-content").css("display", "block");
    $(".your-work-permit-is-here-form-content").css("display", "none");
    $(".documents-for-work-permit-form-content").css("display", "none");
});