var mainDiv = document.querySelector(".bg-add-and-edit");
var add = document.querySelector(".add-experience");
var btn = document.querySelector(".add-experience-button");
var btn2 = document.querySelector(".add-languages-button");
var btn3 = document.querySelector(".add-education-button");
var underBg = document.querySelector(".add-languages");
var uBgEducation = document.querySelector(".add-education");
var header_border = document.querySelector(".header-border");
const mediaQueryThree = window.matchMedia('(max-width: 480px)');
var delete_popup = document.querySelector(".delete-languages");
// Add's popup open button
btn.addEventListener('click', function() {
    mainDiv.style.display = "flex";
    underBg.style.display = "none";
    uBgEducation.style.display = "none";
    add.style.display = "flex";
    document.body.style.overflow = "hidden";
    $(".add-user-experience").attr("id", "add-user-experience");
    $('.mutual-titles-pop-ups-stats').text('Add Experience');
    $("#add-user-experience")[0].reset();
    $("#editUserExp").css("display", "none");
    $("#addUserExp").css("display", "block");
    $(delete_popup).css("display", "none");
});

btn2.addEventListener('click', function() {
    mainDiv.style.display = "flex";
    add.style.display = "none";
    uBgEducation.style.display = "none";
    underBg.style.display = "block";
    document.body.style.overflow = "hidden";
    $(".add-user-language").attr("id", "add-user-language");
    $(".add-language-title").text("Add Language")
    $("#add-user-language")[0].reset();
    $("#EditUserLang").css("display","none")
    $("#AddUserLang").css("display","block")
    $(delete_popup).css("display", "none");
});

btn3.addEventListener('click', function() {
    mainDiv.style.display = "flex";
    underBg.style.display = "none";
    add.style.display = "none";
    $('.add-education-title').text('Add Education');
    uBgEducation.style.display = "flex";
    document.body.style.overflow = "hidden";
    $("#editUserEdu").css("display","none");
    $("#addUserEdu").css("display","block");
    $(delete_popup).css("display", "none");
    $(".education-popup")[0].reset();
});

window.addEventListener('click', function(event) {
    if (event.target == mainDiv) {
        mainDiv.style.display = "none";
        document.body.style.overflow = "scroll";
    }
});



// Add's Functions


function AddUserExperience() {
        $.ajax({
            type: 'POST',
            url: '/add_user_experience/',  // Update with your actual URL
            data: {
                id_title: $('#id_title').val(),
                id_company: $('#id_company').val(),
                id_Country: $('#id_Country').val(),
                id_city_usExp: $('#id_city_usExp').val(),
                id_start_date: $('#id_start_date').val(),
                id_end_date: $('#id_end_date').val(),
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
            },
            success: function (response){
                console.log(response.message);
                window.location = "/profile/"
            },
            error: function (response){
                console.log(response.responseJSON.error)
            }
        });
    }





function AddUserEducation() {
    console.log("testtt");
        $.ajax({
            type: 'POST',
            url: '/add_user_education/',  // Update with your actual URL
            data: {
                id_university: $('#id_university').val(),
                id_degree: $('#id_degree').val(),
                id_country_e: $('#id_country_e').val(),
                id_city_e: $('#id_city_e').val(),
                id_field_of_study: $('#id_field_of_study').val(),
                id_start_year: $('#id_start_year').val(),
                id_end_year: $('#id_end_year').val(),
                id_total_examples_passed: $('#id_total_examples_passed').val(),
                id_GPA: $('#id_GPA').val(),
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
            },
            success: function (response) {
                console.log(response.message);
                window.location = "/profile/"
            },
            error: function (response) {
                console.log(response.responseJSON.error)
            }
        });
    }


function AddUserLanguages(){
        if($("#id_language").val() && $("#id_level").val()){

            $.ajax({
                type: "POST",
                url: '/add_user_languages/',
                data: {
                    id_language: $("#id_language").val(),
                    id_level: $("#id_level").val(),
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),

                },
                success: function (response){
                    console.log(response.message);
                    window.location = "/profile/"
                },
                error: function (response){
                    console.log(response.responseJSON.error)
                }
            })
        }
    }

$(document).ready(function () {
        $('#edit-user-cover').submit(function (e) {
            e.preventDefault();

            var formData = new FormData();
            formData.append('id_cover', $('#id_cover')[0].files[0]);
            formData.append('csrfmiddlewaretoken', $('input[name=csrfmiddlewaretoken]').val());

            $.ajax({
                type: "POST",
                url: '/edit_user_cover/',
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    console.log(response.message);
                    window.location = "/profile/";
                },
                error: function (response) {
                    console.log(response.responseJSON.error);
                }
            });
        });
    });

function editUserProfile(){

            var formData = new FormData();
            formData.append('id_profile', $('#id_profile')[0].files[0]);
            formData.append('csrfmiddlewaretoken', $('input[name=csrfmiddlewaretoken]').val());

            $.ajax({
                type: "POST",
                url: '/edit_user_profile/',
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    console.log(response.message);
                    window.location = "/profile/"
                },
                error: function (response) {
                    console.log(response.responseJSON.error);
                }
            });
        }

function UpdateUserDetails(){
            $.ajax({
                type: "POST",
                url: '/edit_user_details/',  // Replace with your server endpoint
                data: {
                        id_first_name: $("#id_first_name").val(),
                        id_last_name: $("#id_last_name").val(),
                        id_country: $("#id_country").val(),
                        id_city: $("#id_city").val(),
                        id_phone_number: $("#id_phone_number").val(),
                        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
                },
                success: function (response){
                    window.location = "/profile/";
                },
                error: function (response){
                    console.log(response.responseJSON.error)
                }
            });
    }



// GET's

        function getExpDetails(experienceId) {
            // Make an AJAX request to fetch job details
            $.ajax({
                url: '/get_exp_details/',  // Update the URL to match your Django view
                type: 'GET',
                data: {'experience_id': experienceId},
                success: function (data) {
                    // Log job details to the console

                    console.log('Job Details:', data.experience);
                    $('.mutual-titles-pop-ups-stats').text('Edit Experience');

                    mainDiv.style.display = "flex";
                    underBg.style.display = "none";
                    uBgEducation.style.display = "none";
                    add.style.display = "flex";
                    document.body.style.overflow = "hidden";
                    $("#id-experience").val(experienceId);
                    $("#id_title").val(data.experience.title);
                    $("#id_company").val(data.experience.company);
                    $("#id_city_usExp").val(data.experience.city_usExp);
                    $("#id_Country").val(data.experience.Country);
                    $("#id_start_date").val(data.experience.start_date);
                    $("#id_end_date").val(data.experience.end_date);
                    $(".add-user-experience").attr("id", "edit-user-experience");
                    $("#addUserExp").css("display", "none");
                    $("#editUserExp").css("display", "block");
                    $(delete_popup).css("display", "none");
                    var checkbox = $("#experienceCheck");
                    if (data.experience.end_date === null) {
                        checkbox.prop("checked", true);
                        present();
                    } else {
                        checkbox.prop("checked", false);
                    }
                    
                },
                error: function (error) {
                    console.log('Error:', error);
                }
            });
        }
    
        function getEduDetails(education_id){
            
            $.ajax({
                url: '/get_edu_details/',
                type: 'GET',
                data: {"education_id":education_id},
                success: function (data){
                    mainDiv.style.display = "flex";
                    underBg.style.display = "none";
                    add.style.display = "none";
                    uBgEducation.style.display = "flex";
                    document.body.style.overflow = "hidden";
                    $('.add-education-title').text('Edit Education');
                    $(".add-user-education").attr("id", "edit-user-education");
                    $("#id_edu").val(education_id);
                    $("#id_university").val(data.education.university);
                    $("#id_degree").val(data.education.degree);
                    $("#id_field_of_study").val(data.education.field_of_study);
                    $("#id_country_e").val(data.education.country_e);
                    $("#id_city_e").val(data.education.city_e);
                    $("#id_city_e").val(data.education.city_e);
                    $("#id_total_examples_passed").val(data.education.total_examples_passed);
                    $("#id_GPA").val(data.education.GPA);
                    $("#id_start_year").val(data.education.start_year);
                    $("#id_end_year").val(data.education.end_year);
                    $("#editUserEdu").css("display","block")
                    $("#addUserEdu").css("display","none");
                    $(delete_popup).css("display", "none");
                    var checkbox = $("#educationCheck");
                    if (data.education.end_year === null) {
                        checkbox.prop("checked", true);
                        presentEnd();
                    } else {
                        checkbox.prop("checked", false);
                    }
                },
                error: function (error) {
                    console.log('Error:', error);
                }
            })
        };
        function getLangDetails(language_id){
            $.ajax({
                url : '/get_lang_details/',
                type: 'GET',
                data:{'language_id':language_id},
                success: function(data){
                    mainDiv.style.display = "flex";
                    add.style.display = "none";
                    uBgEducation.style.display = "none";
                    underBg.style.display = "block";
                    document.body.style.overflow = "hidden";
                    console.log(data.language);
                    $(".add-language-title").text("Edit Language")
                    $("#id_language").val(data.language.language.toLowerCase());
                    $("#id_level").val(data.language.level);
                    $("#EditUserLang").css("display","block")
                    $("#AddUserLang").css("display","none")
                    $("#id_lang").val(language_id)
                    $(delete_popup).css("display", "none");
                    
                    $(".add-user-language").attr("id", "edit-user-language");

                },
                error: function (error) {
                    console.log('Error:', error);
                }
            })
        };





function editUserExperience() {
        console.log("testtttttttttttttttttt");
        $.ajax({
            type: 'POST',
            url: '/edit_user_experience/',  // Update with your actual URL
            data: {
                id_exp: $("#id-experience").val(),
                id_title: $('#id_title').val(),
                id_company: $('#id_company').val(),
                id_Country: $('#id_Country').val(),
                id_city_usExp: $('#id_city_usExp').val(),
                id_start_date: $('#id_start_date').val(),
                id_end_date: $('#id_end_date').val(),
                
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
            },
            success: function (response){
                window.location = "/profile/";
            },
            error: function (response){
                console.log(response.responseJSON.error)
            }
        });
    }


function EditUserEducation() {


        $.ajax({
            type: 'POST',
            url: '/edit_user_education/',  // Update with your actual URL
            data: {
                id_edu:$("#id_edu").val(),
                id_university: $('#id_university').val(),
                id_degree: $('#id_degree').val(),
                id_country_e: $('#id_country_e').val(),
                id_city_e: $('#id_city_e').val(),
                id_field_of_study: $('#id_field_of_study').val(),
                id_start_year: $('#id_start_year').val(),
                id_end_year: $('#id_end_year').val(),
                id_total_examples_passed: $('#id_total_examples_passed').val(),
                id_GPA: $('#id_GPA').val(),
                
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
            },
            success: function (response) {
                window.location = "/profile/";
            },
            error: function (response) {
                console.log(response.responseJSON.error)
            }
        });
    }


function EditUserLanguages(){
        console.log("testttt");
        $.ajax({
            type: "POST",
            url: '/edit_user_languages/',
            data: {
                id_lang : $("#id_lang").val(),
                id_language: $("#id_language").val(),
                id_level: $("#id_level").val(),
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),

            },
            success: function (response){
                window.location = "/profile/";
            },
            error: function (response){
                console.log(response.responseJSON.error)
            }
        })
    }


function deleteUserLanguage(){

    $.ajax({
        type: "POST",
        url: '/delete_user_languages/',
        data: {
            delete_id : $("#delete_id").val(),
            
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),

        },
        success: function (response){
            window.location = "/profile/";
        },
        error: function (response){
            console.log(response.responseJSON.error)
        }
    })

}
function deleteUserExperience(){

    $.ajax({
        type: "POST",
        url: '/delete_user_experience/',
        data: {
            delete_id : $("#delete_id").val(),
            
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),

        },
        success: function (response){
            window.location = "/profile/";
            
        },
        error: function (response){
            console.log(response.responseJSON.error)
        }
    })

}
function deleteUserEducation(){

    $.ajax({
        type: "POST",
        url: '/delete_user_education/',
        data: {
            delete_id : $("#delete_id").val(),
            
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),

        },
        success: function (response){
            window.location = "/profile/";
        },
        error: function (response){
            console.log(response.responseJSON.error)
        }
    })

}


function deleteUserLanguagesPopUp(language_id) {
    $("#delete-title").text("Are you sure you want to delete this language?");
    $(mainDiv).css("display", "flex");
    $(delete_popup).css("display", "flex");
    $(delete_popup).siblings().css("display", "none");
    $("#experience-delete-button").css("display","none");
    $("#education-delete-button").css("display","none");
    $("#language-delete-button").css("display","block");
    $("#delete_id").val(language_id);
    document.body.style.overflow = "hidden";
    
}

function deleteUserExperiencePopUp(experience_id) {
    $("#delete-title").text("Are you sure you want to delete this experience?");
    $(mainDiv).css("display", "flex");
    $(delete_popup).css("display", "flex");
    $(delete_popup).siblings().css("display", "none");   
    $("#experience-delete-button").css("display","block");
    $("#education-delete-button").css("display","none");
    $("#language-delete-button").css("display","none");
    $("#delete_id").val(experience_id);
    document.body.style.overflow = "hidden";

}


function deleteUserEducationPopUp(education_id) {
    $("#delete-title").text("Are you sure you want to delete this education?");
    $(mainDiv).css("display", "flex");
    $(delete_popup).css("display", "flex");
    $(delete_popup).siblings().css("display", "none");   
    $("#experience-delete-button").css("display","none");
    $("#education-delete-button").css("display","block");
    $("#language-delete-button").css("display","none");
    $("#delete_id").val(education_id);
    document.body.style.overflow = "hidden";

}