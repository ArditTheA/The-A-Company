var meet_with_us_form = document.querySelector(".meet-us-form-content");
var applicants_documents = document.querySelector(".documents-for-work-permit-form-content");
var work_permit = document.querySelector(".your-work-permit-is-here-form-content");
var meet_with_us_div = document.querySelectorAll(".meet-with-us-div");
var documents_div = document.querySelectorAll(".documents-div");
var work_permit_div = document.querySelectorAll(".work-permit-div");
var screening_questions_title = document.querySelector(".screening-questions-title");
var documents_for_work_permit_label_dropdown = document.querySelector(".documents-for-work-permit-label-dropdown");
var your_work_permit_is_here_label_dropdown = document.querySelector(".your-work-permit-is-here-label-dropdown");



$(".work-permit-div").click(function() {
    console.log("testtt-1231321321-321-321-3-213--213-21-3-")
    $(".meet-us-form-content").css("display","none");
    $(".your-work-permit-is-here-form-content").css("display","block");
    $(".documents-for-work-permit-form-content").css("display","none");

});



$(".documents-for-work-permit-label-dropdown").click(function(){
    $(".meet-us-form-content").css("display","none");
    $(".work-permit-div").css("display","none");
    $(".documents-for-work-permit-form-content").css("display","block");
});



$(".documents-div").click(function(){
    $(".meet-us-form-content").css("display","none");
    $(".your-work-permit-is-here-form-content").css("display","none");
    $(".documents-for-work-permit-form-content").css("display","block");
});



documents_for_work_permit_label_dropdown.addEventListener("click", function() {
    meet_with_us_form.style.display = "none";
    work_permit.style.display = "none";
    applicants_documents.style.display = "block";
})

your_work_permit_is_here_label_dropdown.addEventListener("click", function() {
            meet_with_us_form.style.display = "none";
        work_permit.style.display = "block";
        applicants_documents.style.display = "none";
})
for (let i = 0; i < work_permit_div.length; i++) {
work_permit_div[i].addEventListener("click", function() {
    meet_with_us_form.style.display = "none";
    work_permit.style.display = "block";
    applicants_documents.style.display = "none";
})
}

for (let i = 0; i < documents_div.length; i++) {
    documents_div[i].addEventListener("click", function() {
        meet_with_us_form.style.display = "none";
        work_permit.style.display = "none";
        applicants_documents.style.display = "block";
    })
}