    
   function showElements1(shouldShowLeftJobs) {
    const elementsToShow = shouldShowLeftJobs ? '.job-left, .profileHeader, .header-wishes, .jobs-buttons' : '.right-jobs, .right-jobs-main-div';
 
    if (window.matchMedia('(max-width: 480px)').matches) {
        if (shouldShowLeftJobs) {
            $('.profileHeader').css("display","flex")
            $('.job-left, .header-wishes, .jobs-buttons').show();
            $('.right-jobs, .right-jobs-main-div').hide();
        } else {
            $('.job-left, .profileHeader, .header-wishes, .jobs-buttons').hide();
            $('.right-jobs, .right-jobs-main-div').show();
        }
    } else {
        $(elementsToShow).show();
    }
}


function initialize() {
    const post_id = getElementById("PostID").value;



    // Add more event handlers as needed
}

$('.myjob-right-exit').click(function() {
    showElements1(true);
});

 // Handle popstate for mobile
 window.addEventListener('popstate', function(event) {
    if (event.state !== null) {
        showElements1(event.state.showJobLeft);
    }
});

// Initial setup based on the screen width
if (window.matchMedia('(max-width: 480px)').matches) {
    showElements1(true); // Ensure right jobs are initially hidden on mobile

    initialize();
} else {
    $(document).ready(initialize);
}

// Additional code to handle initial history state
window.addEventListener('load', function() {
    showElements1(history.state && history.state.showJobLeft !== true);
});


    async function getMyJobs(id,show=0) {

        console.log("getMyJobs2")

        var elements = document.getElementsByClassName('pixel'); // get all elements

        for(var i = 0; i < elements.length; i++){
            elements[i].style.backgroundColor = "white";
        };

        post_id=id;
        $("#current-job-id").val(id)


        var response = await fetch('/my-jobs/get-job-details/',{

            method: "get",

            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": 'application/json',
                text: post_id,
            }

        }

        );

        let data =  await response.json();
        if(data["StatusApp"] === "Qualified"){

        if (data["user_document"] === 4) {
            document.querySelectorAll(".phase").forEach(element => {
                element.style.display = "block";
                
            });
            if (data["phase_second_main"] != 2) {
                document.querySelectorAll(".second-progress-phase_myjobs").forEach(element => {
                    element.style.display = "block";
                    
                });
            }
            
        }
        else {
            document.querySelectorAll(".progress-phase_myjobs").forEach(element => {
                element.style.display = "block";
                
            });
            document.querySelectorAll(".second-progress-phase_myjobs").forEach(element => {
                element.style.display = "none";
                
            });        

        }
        if (data["phase_second_main"] === 2) {
            if (data["user_document"] === 4) {
            document.querySelectorAll(".phase_two").forEach(element => {
                element.style.display = "block";
            });
        }
        else {
            document.querySelectorAll(".phase_two").forEach(element => {
                element.style.display = "none";
            });
            document.querySelectorAll(".second-progress-phase_myjobs").forEach(element => {
                element.style.display = "none";
                
            });
        }
        
}
        }
    else {
        document.querySelectorAll(".phase").forEach(element => {
            element.style.display = "none";
        });
        document.querySelectorAll(".phase_two").forEach(element => {
            element.style.display = "none";
        });
        document.querySelectorAll(".second-progress-phase_myjobs").forEach(element => {
            element.style.display = "none";
            
        });
    }

        if (show === 1) {
            $(".application-update-form-content").css("display","none");
            $(".documents-for-work-permit-form-content").css("display","block");
            $(".your-work-permit-is-here-form-content").css("display", "none");
        }else if (show == 2){
            $(".application-update-form-content").css("display","none");
            $(".documents-for-work-permit-form-content").css("display","none");
            $(".your-work-permit-is-here-form-content").css("display", "block");
        }
        else{
        $(".application-update-form-content").css("display","block");
        $(".documents-for-work-permit-form-content").css("display","none");
        $(".your-work-permit-is-here-form-content").css("display", "none");
        }
        if(data["StatusApp"]){
            if(data["StatusApp"] != "Qualified"){
                
                $(".second-screening-question-div").css("pointer-events", "none");
                document.querySelectorAll(".block-this").forEach(newElement => {
                    newElement.style.display = "none";
                })

            }else{
                $(".second-screening-question-div").css("pointer-events", "auto");
                document.querySelectorAll(".block-this").forEach(newElement => {
                    newElement.style.display = "block";
                })
            }
        }
        $("#user_id").val(data["userid"]);

        // Docs
        var newDiv1 = "";
        var newDiv2 ="";
        var newDiv3 ="";
        var newDiv4 = "";
        var newDiv5 = "";
        var newDiv6 = "";
        var newDiv7 = "";
var beforeNewDiv2 = '<img class="imgs-three-dots-zip-img img-zip-download" style="" src="/static/img/zipDown2.svg" onclick="downloadDocForWorkPermitFolder('+data["useremail"]+')">';
        
        $('.parent-img-zip').empty();
        $('.parent-img-zip').append(beforeNewDiv2);
        
        // Documents
        var newDiv = '<input type="hidden" id="applicantID">';
        if (data["passaportExists"] === true) {
            if(data["passaportStatus"] === "A"){
                newDiv1 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Passport</div>' +
                
                '<img style="display: block;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
            
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="1" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
                 
                '</div>' +
                '<div style="width: calc(100% - 40px);" class="main-divs-color mutual-titles-color">Government issued travel document</div>' +
                '</div';
            }else if(data["passaportStatus"] === "R"){
                newDiv1 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div id="passport" class="main-divs-color mutual-titles-color ">Passport</div>' +
                
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
            
                '<img style="display: block;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="1" title="Upload Passport" onclick="openPopUp(this)" class="passport-img open-popup" src="/static/img/documents-icon.svg" alt="">' +
                 
                '</div>' +
                '<div style="width: calc(100% - 40px);" class="main-divs-color mutual-titles-color">Government issued travel document</div>' +
                '</div';
            }else{
                newDiv1 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Passport</div>' +
                
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
            
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="1" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
                 
                '</div>';
            }
        } else {
            newDiv1 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
            '<div class="docs-nike-fails" style="display: flex;">' +
                '<div id="passport" class="main-divs-color mutual-titles-color">Passport</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="1" title="Upload Passport" onclick="openPopUp(this)" class="passport-img open-popup" src="/static/img/documents-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="/static/img/before-done-img.svg">' +
                '<img class="img-fail" src="/static/img/img-fail.svg">' +
                '</div>' +
                '</div>' +
                '<div style="width: calc(100% - 40px);" class="main-divs-color mutual-titles-color">Government issued travel document</div>' +
                '</div>';
            }

        if (data["studentStatusExists"] === true) {
            if(data["studentStatus"] === "A"){
                newDiv2 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                    '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Student Status</div>' +
                    '<img style="display: block;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                    '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                    '</div>' +
                    '<img data-number="2" title="Download Student Status" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                    
                    '</div>' +
                    '<div class="main-divs-color mutual-titles-color" style="width: calc(100% - 40px);">Official confirmation of enrollment in a university</div>' +
                    '</div';
                }else if(data["studentStatus"] === "R"){
                    newDiv2 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                    '<div class="docs-nike-fails" style="display: flex;">' +
                    '<div id="passport" class="main-divs-color mutual-titles-color ">Student Status</div>' +
                    '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                    '<img style="display: block;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                    '</div>' +
                    '<img data-number="2" title="Upload Student Status" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                    
                    '</div>' +
                        '<div class="main-divs-color mutual-titles-color" style="width: calc(100% - 40px);">Official confirmation of enrollment in a university</div>' +
                    '</div';
                    
                }else{
                newDiv2 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                    '<div class="docs-nike-fails" style="display: flex;">' +
                    '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Student Status</div>' +
                    '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                    '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                    '</div>' +
                    '<img data-number="2" title="Download Student Status" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                    
                    '</div>';
            }
        }else{
            newDiv2 = '<div class="" style="padding-bottom: 20px;">' +'<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
            '<div class="docs-nike-fails" style="display: flex;">' +
                    '<div id="passport" class="main-divs-color mutual-titles-color">Student Status</div>' +
                    '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                    '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                    '</div>' +
                    '<img data-number="2" title="Upload Student Status" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                    
                    '</div>' +
                    '</div>' +
                    '<div style="width: calc(100% - 40px);" class="main-divs-color mutual-titles-color">Government issued travel document</div>' +
                    '</div>';
            }

        if (data["certificateOfEnrolmentExists"] === true) {
            if(data["certificateStatus"] === "A"){
                newDiv3 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Certificate of Enrolment</div>' +
                '<img style="display: block;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +   
                '<img data-number="3" title="Download Certificate of Enrolment" class="open-popup" onclick="getDocument(this)"  src="/static/img/documents-second-icon.svg" alt="">' +
                
            '</div>' +
            '<div class="main-divs-color mutual-titles-color" style="width: calc(100% - 40px);">Official document from ZAV signed and sealed by university</div>' +
            '</div';
        }else if(data["certificateStatus"] === "R"){
            newDiv3 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
            '<div class="docs-nike-fails" style="display: flex;">' +
                        '<div class="main-divs-color mutual-titles-color ">Certificate of Enrolment</div>' +
                        '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                        '<img style="display: block;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                        '</div>' +   
                        '<img data-number="3" title="Upload Certificate of Enrolment" onclick="openPopUp(this)" class="open-popup"  src="/static/img/documents-icon.svg" alt="">' +
                        
                    '</div>' +
                    '<div class="main-divs-color mutual-titles-color" style="width: calc(100% - 40px);">Official document from ZAV signed and sealed by university</div>' +
                    '</div';
                }
            else{
                newDiv3 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                        '<div class="main-divs-color mutual-titles-color blue-text">Certificate of Enrolment</div>' +
                        '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                        '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                        '</div>' +   
                        '<img data-number="3" title="Download Certificate of Enrolment" class="open-popup" onclick="getDocument(this)"  src="/static/img/documents-second-icon.svg" alt="">' +
                        
                        '</div>';
                }
        }else{
            newDiv3 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                        '<div class="docs-nike-fails" style="display: flex;">' +
                        '<div class="main-divs-color mutual-titles-color">Certificate of Enrolment</div>' +
                        '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                        '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                        '</div>' +   
                        '<img data-number="3" title="Upload Certificate of Enrolment" onclick="openPopUp(this)" class="open-popup"  src="/static/img/documents-icon.svg" alt="">' +
                        
                        '</div>' +
                        '</div>' +
                    '<div class="main-divs-color mutual-titles-color" style="width: calc(100% - 40px);">Official document from ZAV signed and sealed by university</div>' +
                    '</div>'
        }

        if (data["studentIdExists"] === true){
            if(data["studentIdStatus"]==="A"){
                newDiv4 = '<div class="" style="";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                            '<div class="main-divs-color mutual-titles-color blue-text">Student ID</div>' +
                            '<img style="display: block;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                            '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                            '</div>' +
                            '<img data-number="4" title="Download Student ID" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                            
                            '</div>' +
                            '<div style="width: calc(100% - 40px);" class="main-divs-color mutual-titles-color">Official identification card issued by a university</div>' +
                            '</div';
                    }
                    
            else if(data["studentIdStatus"] === "R"){
                newDiv4 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                            '<div class="docs-nike-fails" style="display: flex;">' +
                            '<div class="main-divs-color mutual-titles-color ">Student ID</div>' +
                            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                            '<img style="display: blockx;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                            '</div>' +
                            '<img data-number="4" title="Upload Student ID" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                            
                        '</div>' +
                        '<div style="width: calc(100% - 40px);" class="main-divs-color mutual-titles-color">Official identification card issued by a university</div>' +
                        '</div';
        
            }
            else{
                newDiv4 =  '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Student ID</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="4" title="Download Student ID" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                
            '</div>';
            }
            
        }else{
            newDiv4 = '<div class="" style="";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
            '<div class="docs-nike-fails" style="display: flex;">' +
            '<div class="main-divs-color mutual-titles-color">Student ID</div>' +
            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
            '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
            '</div>' +
            '<img data-number="4" title="Upload Student ID" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
            '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
            '<img class="img-done" src="/static/img/before-done-img.svg">' +
            '<img class="img-fail" src="/static/img/img-fail.svg">'
             +
             '</div>' +
             '</div>' +
             '<div style="width: calc(100% - 40px);" class="main-divs-color mutual-titles-color">Official identification card issued by a university</div>' +
             '</div';
 }


        // if(data["photoExists"] === true){
        //     if(data["photoStatus"] === "A"){
        //         var newDiv5 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
        //                         '<div class="docs-nike-fails" style="display: flex;">' +
        //                         '<div class="main-divs-color mutual-titles-color blue-text">Photo</div>' +
        //                         '<img style="display: block;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
        //                         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
        //                         '</div>' +
        //                         '<img data-number="5" title="Download Photo" class="open-popup" onclick="getDocument(this)" src="/static/img/documents-second-icon.svg" alt="">' +
                            
                            
        //                 '</div>';
        //     }
        //     else if(data["photoStatus"] === "R"){
        //         var newDiv5 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
        //                         '<div class="docs-nike-fails" style="display: flex;">' +
        //                         '<div class="main-divs-color mutual-titles-color">Photo</div>' +
        //                         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
        //                         '<img style="display: block;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
        //                         '</div>' +
        //                         '<img data-number="5" title="Upload Photo" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                            
                            
        //                 '</div>';
        //     }else{
        //         var newDiv5 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
        //                         '<div class="docs-nike-fails" style="display: flex;">' +
        //                         '<div class="main-divs-color mutual-titles-color blue-text">Photo</div>' +
        //                         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
        //                         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
        //                         '</div>' +
        //                         '<img data-number="5" title="Download Photo" class="open-popup" onclick="getDocument(this)" src="/static/img/documents-second-icon.svg" alt="">' +
                            
                            
        //                 '</div>';
        //     }
            
        // }else{
        //     var newDiv5 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
        //                         '<div class="docs-nike-fails" style="display: flex;">' +
        //                         '<div class="main-divs-color mutual-titles-color">Photo</div>' +
        //                         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
        //                         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
        //                         '</div>' +
        //                     '<img data-number="5" title="Upload Photo" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
        //                     '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
        //                         '<img class="img-done" src="/static/img/before-done-img.svg">' +
        //                         '<img class="img-fail" src="/static/img/img-fail.svg">'
        //                          +
        //                     '</div>'
                            
        //                 '</div>';

        // }
        // url = "/download-cv/"+id    
        
        // if(data["ResumeStatus"] === "A"){
        //     var newDiv6 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
        //     '<div class="docs-nike-"fails" style="display: flex;">' +
        //         '<div class="main-divs-color mutual-titles-color blue-text">Resume</div>' +
        //         '<img style="display:;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
        //         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
        //         '</div>' +
        //         '<a href="' + url + '"><img data-number="6" title="Download Resume" class="open-popup" src="/static/img/documents-second-icon.svg" alt=""></a>' +
        //     '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
        //         '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(6);">' +
        //         '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(6);">'
        //             +
        //         '</div>'
        //     '</div>';
        // }else if(data["ResumeStatus"] === "R"){
        //     var newDiv6 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
        //     '<div class="docs-nike-"fails" style="display: flex;">' +
        //         '<div class="main-divs-color mutual-titles-color">Resume</div>' +
        //         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
        //         '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
        //         '</div>' +
        //         '<a href="' + url + '"><img data-number="6" title="Download Resume" class="open-popup" src="/static/img/documents-second-icon.svg" alt=""></a>' +
        //     '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
        //         '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(6);">' +
        //         '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(6);">'
        //             +
        //         '</div>'
        //     '</div>';
        // }
        // else{
        //     var newDiv6 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
        //     '<div class="docs-nike-"fails" style="display: flex;">' +
        //         '<div class="main-divs-color mutual-titles-color blue-text">Resume</div>' +
        //         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
        //         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
        //         '</div>' +
        //     '<a href="' + url + '"><img data-number="6" title="Download Resume" class="open-popup" src="/static/img/documents-second-icon.svg" alt=""></a>' +
        //     '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
        //         '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(6);">' +
        //         '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(6);">'
        //             +
        //         '</div>'
        //     '</div>';
        // }
        // if(data["serviceContractExists"] === true){
        //     if(data["serviceContractStatus"] === "A"){
        //         var newDiv7 = '<div class="main-div-docs" style="display: flex; justify-content: space-between;  ">' +
        //         '<div class="docs-nike-fails" style="display: flex;">' +
        //         '<div class="main-divs-color mutual-titles-color blue-text">Service Contract</div>' +
        //         '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
        //         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
        //         '</div>' +  
        //         '<img data-number="7" title="Download Service Contract" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                

        //     '</div>';
        //     }else if(data["serviceContractStatus"] === "R"){
            
        //         var newDiv7 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; ">' +
        //         '<div class="docs-nike-fails" style="display: flex;">' +
        //         '<div class="main-divs-color mutual-titles-color ">Service Contract</div>' +
        //         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
        //         '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
        //         '</div>' +  
        //         '<img data-number="7" title="Upload Service Contract"  class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                

        //         '</div>';
        //     }else{
        //         var newDiv7 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; ">' +
        //         '<div class="docs-nike-fails" style="display: flex;">' +
        //         '<div class="main-divs-color mutual-titles-color blue-text">Service Contract</div>' +
        //         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
        //         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
        //         '</div>' +  
        //         '<img data-number="7" title="Download Service Contract" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                

        //     '</div>';
        //     }
        // }
            
        //     else {
        //         var newDiv7 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; ">' +
        //         '<div class="docs-nike-fails" style="display: flex;">' +
        //         '<div class="main-divs-color mutual-titles-color">Service Contract</div>' +
        //         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
        //         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
        //         '</div>' +   
        //         '<img data-number="7" title="Upload Service Contract"  class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                
        //     '</div>'
        //         }
        
        
        $('#documentList').empty();
        // Append the new div elements to the documentList
        $('#documentList').append(newDiv,newDiv1,newDiv2,newDiv3,newDiv4);


        var newDiv8 = ""
        var newDiv9 = ""
        if(data["jobOfferExists"] === true){
            if(data["jobOfferStatus"] === "A"){
                var newDiv8 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Job Offer</div>' +
                '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +  
                '<img data-number="8" title="Download Job Offer" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                

            '</div>';
            }else if (data["jobOfferStatus"] === "R"){
                var newDiv8 = '<div class="main-div-docs" style="display: flex; justify-content: space-between;padding-bottom: 20px; ">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color ">Job Offer</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +  
                '<img data-number="8" title="Upload Job Offer"  class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                 

                '</div>';
            }else{
                var newDiv8 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom:20px; ">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Job Offer</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +  
                '<img data-number="8" title="Download Job Offer" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                

            '</div>';
            }
        }else{
            var newDiv8 = '<div class="main-div-docs" style="display: flex; justify-content: space-between;  padding-bottom:20px; ">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color">Job Offer </div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +   
                '<img data-number="8" title="Upload Job Offer"  class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                
            '</div>'
        }
        if(data["workPermitExists"] === true){
            if(data["workPermitStatus"] === "A"){
                var newDiv9 = '<div class="" style="";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Work Permit</div>' +
                '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +  
                '<img data-number="9" title="Download Work Permit" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                

            '</div>';
            }
            else if(data["workPermitStatus"] === "R"){
                var newDiv9 = '<div class="main-div-docs" style="display: flex; justify-content: space-between;padding-bottom: 20px; ">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color ">Work Permit</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="9" title="Upload Work Permit"  class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                

                '</div>';
            }else{
                var newDiv9 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom:20px; ">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Work Permit</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +  
                '<img data-number="9" title="Download Work Permit" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                

            '</div>';
            }

        }
        else{
            var newDiv9 = '<div class="main-div-docs" style="display: flex; justify-content: space-between;  padding-bottom:20px; ">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color">Work Permit </div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +   
                '<img data-number="9" title="Upload Work Permit"  class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                
            '</div>'
        }
        var beforeNewDiv1 = '<img class="imgs-three-dots-zip-img img-zip-download" style="" src="/static/img/zipDown2.svg" onclick="downloadWorkPermitFolder('+data["useremail"]+')">';
        $('#recdocumentList').empty();
        $("#parent-img-zip2").empty();
        $("#parent-img-zip2").append(beforeNewDiv1)
        $('#recdocumentList').append(newDiv8,newDiv9);


        var mainJobs = false;

        document.getElementById("Stat").innerHTML = data["StatusApp"];
        document.getElementById("applyDate").innerHTML= data["applyDate"];
        document.getElementById("applyDateTime").innerHTML= data["applyDateTime"];
        if(data["ApplicantStatDate"]){
            document.getElementById("ApplicantStatDate").innerHTML= data["ApplicantStatDate"];
            
            document.getElementById("ApplicantStatDateTime").innerHTML= data["ApplicantStatDateTime"];
        }else{
            document.getElementById("ApplicantStatDate").innerHTML= data["applyDate"];
           
            document.getElementById("ApplicantStatDateTime").innerHTML= data["applyDateTime"];
            
        }
        var auth = data["auth"];

        var element = document.getElementById("job_title");
        element.innerHTML = data["title"];
        var countApplicant = document.getElementById("countApplicant")

        if(data["appNo"]==0){
            countApplicant.innerHTML = data["appNo"]+" applicants"
        }else if(data["appNo"]>=2){
            countApplicant.innerHTML = data["appNo"]+" applicants"
        }
        else{
            countApplicant.innerHTML = data["appNo"]+" applicant"
        }

        function getMonthDifference(startDate, endDate) {
          return (
            endDate.getMonth() -
            startDate.getMonth() +
            12 * (endDate.getFullYear() - startDate.getFullYear())
          );
        }

        var c= (getMonthDifference(
          new Date(data["SDate"]), new Date(data["EDate"]))
        );
        var total = (data ["salary"]*data['hourPerWork'])*4*c;
        var tt  = Math.floor(total);
        var SalaryPerHour = document.getElementById("salary");
        SalaryPerHour.innerHTML="€"+tt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" total income"


        if(data["country"]== "USA"){
            var salary = document.getElementById("salary")
            salary.innerHTML ="$"+ data ["salary"]+"/hour"
            if(data["tips"]){
                document.getElementById("totsalary").innerHTML="$"+tt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" total income / +tips";

            }
            else{
                document.getElementById("totsalary").innerHTML="$"+tt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" total income ";
            }
        }else{
            var salary = document.getElementById("salary")
            salary.innerHTML ="€"+ data ["salary"]+"/hour"
            if(data["tips"]){
            document.getElementById("totsalary").innerHTML="€"+tt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" total income / +tips";
            }else{
                    document.getElementById("totsalary").innerHTML="€"+tt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" total income";

            }
        }



        

        let Description = document.getElementById('message');
        Description.innerHTML=data["description"];

        var Address = document.getElementById("city");
        Address.innerHTML = data["city_j"]+",  "+data["country"];

        var ShiftDate = document.getElementById("sDate");
        ShiftDate.innerHTML = data["start_date"]+" - "+data["end_date"];

        var typeOfWork = document.getElementById('typeOfWork')
        typeOfWork.innerHTML = data["typeOfWork"]+" "
        var hourPerWork = document.getElementById('hourPerWork')
        hourPerWork.innerHTML = " "+data['hourPerWork']+" hours/week"

        var Company = document.getElementById("company");
        Company.innerHTML=data["company"];



        var housing = document.getElementById("housing")
        housing.innerHTML = "Housing "+data['housing']

        if(data["country"]=="USA"){
            var housingCost = document.getElementById("housingCost")
            housingCost.innerHTML = "$"+data["housingCost"]+"/week"
        }else{
            var housingCost = document.getElementById("housingCost")
            housingCost.innerHTML = "€"+data["housingCost"]+"/week"
        }


        var program = document.getElementById('program');
        program.innerHTML = data["program"];



        var programCost = document.getElementById("programCost")
        programCost.innerHTML = "Program Cost: €"+data["programCost"]


        var auth=data["auth"]
        var button = document.getElementById("button")
        var rB = document.getElementById("recruiterR")
        var hasApply = data["hasApply"];
        
        const mediaQuery = window.matchMedia('(max-width: 767px)');

        if (!mediaQuery.matches) {
        var select = document.getElementById('select'+post_id);
        select.style.backgroundColor = "#E7F1FE";

        };

        console.log(showElements1(false));
        showElements1(false);


}






        
       

