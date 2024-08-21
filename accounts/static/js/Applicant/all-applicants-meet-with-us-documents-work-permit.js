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
    $(".start-work-form-content").css("display", "none");
    $(".payment-form-content").css("display", "none");
    $(".meet-us-form-content").css("display", "none");
    $(".work-permit-div").css("display","none");
    $(".documents-for-work-permit-form-content").css("display","block");
    $(".sign-the-job-offer-form-content").css("display", "none");
    $(".second-payment-form-content").css("display", "none");
    $(".third-payment-form-content").css("display", "none");
});

$(".documents-div").click(function(){
    $(".application-update-form-content").css("display","none");
    $(".start-work-form-content").css("display", "none");
    $(".payment-form-content").css("display", "none");
    $(".meet-us-form-content").css("display", "none");
    $(".your-work-permit-is-here-form-content").css("display","none");
    $(".second-payment-form-content").css("display", "none");
    $(".third-payment-form-content").css("display", "none");
    $(".documents-for-work-permit-form-content").css("display","block");
    $(".sign-the-job-offer-form-content").css("display", "none");
    $(".job-interview-form-content").css("display", "none");
    $(".documents-for-us-embassy-form-content").css("display", "none");
    $(".your-j1-visa-is-here-form-content").css("display", "none");
});

$(".work-permit-div").click(function() {
    console.log("testtt-1231321321-321-321-3-213--213-21-3-")
    $(".start-work-form-content").css("display", "none");
    $(".application-update-form-content").css("display","none");
    $(".documents-for-us-embassy-form-content").css("display", "none");
    $(".your-j1-visa-is-here-form-content").css("display", "none");
    $(".payment-form-content").css("display", "none");
    $(".meet-us-form-content").css("display", "none");
    $(".sign-the-job-offer-form-content").css("display", "none");
    $(".second-payment-form-content").css("display", "none");
    $(".third-payment-form-content").css("display", "none");
    $(".documents-for-work-permit-form-content").css("display", "none");
    $(".your-work-permit-is-here-form-content").css("display","block");
    $(".job-interview-form-content").css("display", "none");

});

$(".your-work-permit-is-here-label-dropdown").click(function() {
        $(".payment-form-content").css("display", "none");
        $(".start-work-form-content").css("display", "none");
        $(".meet-us-form-content").css("display", "none");
        $(".your-work-permit-is-here-form-content").css("display", "block");
        $(".documents-for-us-embassy-form-content").css("display", "none");
        $(".second-payment-form-content").css("display", "none");
        $(".third-payment-form-content").css("display", "none");    
        $(".your-j1-visa-is-here-form-content").css("display", "none");    
        $(".sign-the-job-offer-form-content").css("display", "none");
        $(".documents-for-work-permit-form-content").css("display", "none");
});

$(".application-update-div").click(function() {
    $(".application-update-form-content").css("display", "block");
    $(".start-work-form-content").css("display", "none");
    $(".documents-for-us-embassy-form-content").css("display", "none");
    $(".your-j1-visa-is-here-form-content").css("display", "none");
    $(".payment-form-content").css("display", "none");
    $(".meet-us-form-content").css("display", "none");
    $(".second-payment-form-content").css("display", "none");
    $(".third-payment-form-content").css("display", "none");
    $(".your-work-permit-is-here-form-content").css("display", "none");
    $(".sign-the-job-offer-form-content").css("display", "none");
    $(".documents-for-work-permit-form-content").css("display", "none");
    $(".job-interview-form-content").css("display", "none");
});

$(".meet-with-us-div").click(function() {
    $(".meet-us-form-content").css("display", "block");
    $(".second-payment-form-content").css("display", "none");
    $(".third-payment-form-content").css("display", "none");
    $(".start-work-form-content").css("display", "none");
    $(".documents-for-us-embassy-form-content").css("display", "none");
    $(".your-j1-visa-is-here-form-content").css("display", "none");
    $(".payment-form-content").css("display", "none");
    $(".application-update-form-content").css("display", "none");
    $(".your-work-permit-is-here-form-content").css("display", "none");
    $(".sign-the-job-offer-form-content").css("display", "none");
    $(".documents-for-work-permit-form-content").css("display", "none");
    $(".job-interview-form-content").css("display", "none");
});

$(".payment-div").click(function() {
    $(".payment-form-content").css("display", "block");
    $(".second-payment-form-content").css("display", "none");
    $(".third-payment-form-content").css("display", "none");
    $(".start-work-form-content").css("display", "none");
    $(".documents-for-us-embassy-form-content").css("display", "none");
    $(".your-j1-visa-is-here-form-content").css("display", "none");
    $(".meet-us-form-content").css("display", "none");
    $(".application-update-form-content").css("display", "none");
    $(".your-work-permit-is-here-form-content").css("display", "none");
    $(".documents-for-work-permit-form-content").css("display", "none");
    $(".sign-the-job-offer-form-content").css("display", "none");
    $(".job-interview-form-content").css("display", "none");

})

$(".job-interview-div").click(function() {
    $(".job-interview-form-content").css("display", "block");
    $(".second-payment-form-content").css("display", "none");
    $(".third-payment-form-content").css("display", "none");
    $(".start-work-form-content").css("display", "none");
    $(".documents-for-us-embassy-form-content").css("display", "none");
    $(".your-j1-visa-is-here-form-content").css("display", "none");
    $(".payment-form-content").css("display", "none");
    $(".meet-us-form-content").css("display", "none");
    $(".application-update-form-content").css("display", "none");
    $(".your-work-permit-is-here-form-content").css("display", "none");
    $(".sign-the-job-offer-form-content").css("display", "none");
    $(".documents-for-work-permit-form-content").css("display", "none");

});

$(".job-offer-div").click(function() {
    $(".sign-the-job-offer-form-content").css("display", "block");
    $(".second-payment-form-content").css("display", "none");
    $(".third-payment-form-content").css("display", "none");
    $(".start-work-form-content").css("display", "none");
    $(".documents-for-us-embassy-form-content").css("display", "none");
    $(".your-j1-visa-is-here-form-content").css("display", "none");
    $(".job-interview-form-content").css("display", "none");
    $(".payment-form-content").css("display", "none");
    $(".meet-us-form-content").css("display", "none");
    $(".application-update-form-content").css("display", "none");
    $(".your-work-permit-is-here-form-content").css("display", "none");
    $(".documents-for-work-permit-form-content").css("display", "none");
});

$(".documents-for-us-embassy-div").click(function() {
    $(".documents-for-us-embassy-form-content").css("display", "block");
    $(".start-work-form-content").css("display", "none");
    $(".your-j1-visa-is-here-form-content").css("display", "none");
    $(".second-payment-form-content").css("display", "none");
    $(".third-payment-form-content").css("display", "none");
    $(".sign-the-job-offer-form-content").css("display", "none");
    $(".job-interview-form-content").css("display", "none");
    $(".payment-form-content").css("display", "none");
    $(".meet-us-form-content").css("display", "none");
    $(".application-update-form-content").css("display", "none");
    $(".your-work-permit-is-here-form-content").css("display", "none");
    $(".documents-for-work-permit-form-content").css("display", "none");
})

$(".your-j1-visa-is-here-div").click(function() {
    $(".your-j1-visa-is-here-form-content").css("display", "block");
    $(".start-work-form-content").css("display", "none");
    $(".documents-for-us-embassy-form-content").css("display", "none");
    $(".sign-the-job-offer-form-content").css("display", "none");
    $(".job-interview-form-content").css("display", "none");
    $(".payment-form-content").css("display", "none");
    $(".meet-us-form-content").css("display", "none");
    $(".application-update-form-content").css("display", "none");
    $(".your-work-permit-is-here-form-content").css("display", "none");
    $(".documents-for-work-permit-form-content").css("display", "none");
})

$(".start-work-div").click(function() {
    $(".start-work-form-content").css("display", "block");
    $(".your-j1-visa-is-here-form-content").css("display", "none");
    $(".documents-for-us-embassy-form-content").css("display", "none");
    $(".sign-the-job-offer-form-content").css("display", "none");
    $(".job-interview-form-content").css("display", "none");
    $(".payment-form-content").css("display", "none");
    $(".meet-us-form-content").css("display", "none");
    $(".application-update-form-content").css("display", "none");
    $(".your-work-permit-is-here-form-content").css("display", "none");
    $(".documents-for-work-permit-form-content").css("display", "none");
});

$(".second-payment-div").click(function() {
    $(".second-payment-form-content").css("display", "block");
    $(".third-payment-form-content").css("display", "none");
    $(".payment-form-content").css("display", "none");
    $(".start-work-form-content").css("display", "none");
    $(".your-j1-visa-is-here-form-content").css("display", "none");
    $(".documents-for-us-embassy-form-content").css("display", "none");
    $(".sign-the-job-offer-form-content").css("display", "none");
    $(".job-interview-form-content").css("display", "none");
    $(".payment-form-content").css("display", "none");
    $(".meet-us-form-content").css("display", "none");
    $(".application-update-form-content").css("display", "none");
    $(".your-work-permit-is-here-form-content").css("display", "none");
    $(".documents-for-work-permit-form-content").css("display", "none");
});
$(".third-payment-div").click(function() {
    $(".third-payment-form-content").css("display", "block");
    $(".second-payment-form-content").css("display", "none");
    $(".payment-form-content").css("display", "none");
    $(".start-work-form-content").css("display", "none");
    $(".your-j1-visa-is-here-form-content").css("display", "none");
    $(".documents-for-us-embassy-form-content").css("display", "none");
    $(".sign-the-job-offer-form-content").css("display", "none");
    $(".job-interview-form-content").css("display", "none");
    $(".payment-form-content").css("display", "none");
    $(".meet-us-form-content").css("display", "none");
    $(".application-update-form-content").css("display", "none");
    $(".your-work-permit-is-here-form-content").css("display", "none");
    $(".documents-for-work-permit-form-content").css("display", "none");
});