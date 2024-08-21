
async function getUser(id,show=0) {
    document.getElementById("sectedUser").value = id;
    document.getElementById("user_id").value = id;
    
    var elements = document.getElementsByClassName('pixel'); // get all elements

    for(var i = 0; i < elements.length; i++){
        elements[i].style.backgroundColor = "white";
    }
    $(".application-update-form-content").css("display","block");
    $(".documents-for-work-permit-form-content").css("display","none");
    $(".your-work-permit-is-here-form-content").css("display","none");
    
    
    var jpk = $("#job-id-hidden").val()

    let response = await fetch('/match/getUserData',{

        method: "get",

        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": 'application/json',
            userid: id,
            jpk : jpk,
        }

    });

    let data =  await response.json();

    if (data["isQualified"]) {
        document.querySelectorAll(".block-this").forEach(blockThis => {
            blockThis.style.display = "block";
        })
    }

    if (data["isNotQualified"]) {
        document.querySelectorAll(".phase").forEach(a => {
            a.style.pointerEvents = "none";
        })
        document.querySelectorAll(".phaseTwo").forEach(a => {
            a.style.pointerEvents = "none";
        })
        document.querySelectorAll(".block-this").forEach(blockThis => {
            blockThis.style.display = "none";
        })

    
    }
   
    if (show === 1) {
        if (data["phaseOneCompleted"]) {
            $(".application-update-form-content").css("display","none");
            $(".documents-for-work-permit-form-content").css("display","block");
        }
        else {
            $(".application-update-form-content").css("display","none");
            $(".documents-for-work-permit-form-content").css("display","block");
        }
        $(".your-work-permit-is-here-form-content").css("display", "none");
    }
    else if (show === 2){
        if (data["phaseTwoCompleted"]) {
        $(".application-update-form-content").css("display","none");
        $(".your-work-permit-is-here-form-content").css("display","block");
        }
        else {
            $(".application-update-form-content").css("display","none");
            $(".your-work-permit-is-here-form-content").css("display","block");
        }
    $(".documents-for-work-permit-form-content").css("display","none");
    }
     var list = document.getElementsByClassName("JSAdded");
     for(var i = list.length - 1; 0 <= i; i--){
     if(list[i] && list[i].parentElement)
     list[i].parentElement.removeChild(list[i]);
     }
    document.getElementById("Stat").innerHTML = data["Status"];
    
    document.getElementById("fname").innerHTML= data["fname"]+" "+data["lname"];
    document.getElementById("email").innerHTML= data["email"];
    document.getElementById("phone").innerHTML= data["phone"];
    document.getElementById("location").innerHTML= data["city"];
    document.getElementById("applyDate").innerHTML= data["applyDate"];
    document.getElementById("applyDateTime").innerHTML= data["applyDateTime"];
    if (data["isQualified"]) {
    if (data["phaseOneCompleted"]) {
        data["UserWorkPermit"] += 1;
        document.querySelectorAll(".completed-phase").forEach(element => {
            element.style.display = "block";
        });            
        document.querySelectorAll(".progress-phase").forEach(element => {
            element.style.display = "none";
        });
        document.querySelectorAll(".progress-phase-work-permit").forEach(element => {
            element.style.display = "block";
        });
        document.querySelectorAll(".phaseTwo").forEach(a => {
            a.style.pointerEvents = "auto";
        })
        document.querySelectorAll(".phase").forEach(a => {
            a.style.pointerEvents = "auto";
        })

    }
    else{
        document.querySelectorAll(".completed-phase").forEach(element => {
            element.style.display = "none";
        });
        document.querySelectorAll(".progress-phase").forEach(element => {
            element.style.display = "block";
        });            
        document.querySelectorAll(".progress-phase-work-permit").forEach(element => {
            element.style.display = "none";
        });
        document.querySelectorAll(".phaseTwo").forEach(a => {
            a.style.pointerEvents = "none";
        })
        document.querySelectorAll(".phase").forEach(a => {
            a.style.pointerEvents = "auto";
        })

    }
}
else {
    document.querySelectorAll(".completed-phase").forEach(element => {
        element.style.display = "none";
    });            
    document.querySelectorAll(".progress-phase").forEach(element => {
        element.style.display = "none";
    });
    document.querySelectorAll(".progress-phase-work-permit").forEach(element => {
        element.style.display = "none";
    });
}
    if (data["isQualified"]) {
    if (data["phaseTwoCompleted"]) {
        if (data["phaseOneCompleted"]) {
            document.querySelectorAll(".second-completed-phase").forEach(blockThis => {
                blockThis.style.display = "block";
            })
            document.querySelectorAll(".progress-phase-work-permit").forEach(element => {
            element.style.display = "none";
        });
        }
        else {
            document.querySelectorAll(".second-completed-phase").forEach(blockThis => {
                blockThis.style.display = "none";
            })
            }
            document.querySelectorAll(".phase").forEach(a => {
                a.style.pointerEvents = "auto";
            })    
    }
    else {
        document.querySelectorAll(".second-completed-phase").forEach(blockThis => {
            blockThis.style.display = "none";
        })

    }
}
else {
    document.querySelectorAll(".second-completed-phase").forEach(blockThis => {
        blockThis.style.display = "none";
    })
    document.querySelectorAll(".progress-phase-work-permit").forEach(element => {
    element.style.display = "none";
});

}
    if(data[ApplicantStatDate]){
        document.getElementById("ApplicantStatDate").innerHTML= data["ApplicantStatDate"];
        
        document.getElementById("ApplicantStatDateTime").innerHTML= data["ApplicantStatDateTime"];
    }else{
        document.getElementById("ApplicantStatDate").innerHTML= data["applyDate"];
       
        document.getElementById("ApplicantStatDateTime").innerHTML= data["applyDateTime"];
        
    }
    
    beforeNewDiv1 = '<img class="imgs-three-dots-zip-img three-dots-document" style="" src="/static/img/Three-dots.svg">';
    var beforeNewDiv2 = '<img class="imgs-three-dots-zip-img img-zip-download" style="" src="/static/img/zipDown2.svg" onclick="downloadDocForWorkPermitFolder('+data["email"]+')">';
    
    $('.parent-img-zip').empty();
    $('.parent-img-zip').append(beforeNewDiv1,beforeNewDiv2);
    var newDiv1 = "";
    var newDiv2 ="";
    var newDiv3 ="";
    var newDiv4 = "";
    var newDiv5 = "";
    var newDiv6 = "";
    var newDiv7 = "";
    // Documents
    var newDiv = '<input type="hidden" id="applicantID">';
    if (data["passaportExists"] === true) {
        
        newDiv1 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 5px;">' +
            '<div class="docs-nike-fails" style="display: flex;">';
    
        if (data["passaportStatus"] === "A") {
            newDiv1 += '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Passport</div>'+'<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
            newDiv1 += '</div>' +
            '<img data-number="1" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
            '<div class="div_replacement" style="display: none; justify-content: space-between;">';
            newDiv1 +='<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(1);">' +
            '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(1);">';
        }else if (data["passaportStatus"] === "R") {
            newDiv1 += '<div id="passport" class="main-divs-color mutual-titles-color">Passport</div>'+'<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">';
            newDiv1 += '</div>' +
            '<img data-number="1" title="Upload Passport" onclick="openPopUp(this)" class="passport-img open-popup" src="/static/img/documents-icon.svg" alt="">' +
            '<div class="div_replacement" style="display: none; justify-content: space-between;">';
            newDiv1 +='<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(1);">' +
                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(1);">';
        }else {
            newDiv1 += 
            '<div id="passport" class="main-divs-color mutual-titles-color blue-text">Passport</div>'+
            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
            newDiv1 += '</div>' +
            '<img data-number="1" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
            '<div class="div_replacement" style="display: none; justify-content: space-between;">';
            newDiv1 +='<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(1);">' +
            '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(1);">';
        }
            newDiv1 +='</div>' +
            '</div>' +
            '<div style="width: calc(100% - 40px); color: C6C5C5;" class="main-divs-color mutual-titles-color">Government issued travel document</div>' +
            '</div>';
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
            '<div style="width: calc(100% - 40px); color: C6C5C5;" class="main-divs-color mutual-titles-color">Government issued travel document</div>' +
            '</div>';
    }






    if (data["studentStatusExists"] === true){
        newDiv2 = '<div class="" style="padding-bottom: 20px;">' +'<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' ;
                if (data["studentStatus"] === "A") {
                    newDiv2 +='<div id="studentStatus" class="main-divs-color mutual-titles-color blue-text">Student Status</div>'+'<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
                    newDiv2 +=
                '</div>' +
                '<img data-number="2" title="Download Student Status" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' ;
                newDiv2 +=
                '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(2);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(2);">';
                }else if (data["studentStatus"] === "R") {
                   
                    newDiv2 +='<div id="studentStatus" class="main-divs-color mutual-titles-color ">Student Status</div>'+'<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">';
                    newDiv2 +=
                '</div>' +
                '<img data-number="2" title="Upload Student Status" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' ;
                newDiv2 +=
                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(2);">' +
                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(2);">';
                }
                else{
                    newDiv2 +=
                    '<div id="studentStatus" class="main-divs-color mutual-titles-color blue-text">Student Status</div>';
                    newDiv2 +=
                    '</div>' +
                    '<img data-number="2" title="Download Student Status" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                    '<div class="div_replacement" style="display: none; justify-content: space-between; ">' ;
                    newDiv2 +=
                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(2);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(2);">';
                }
                
                
                newDiv2 +=
                '</div>' +
                '</div>' +               
                '<div class="main-divs-color mutual-titles-color" style="width: calc(100% - 40px); color: C6C5C5;">Official confirmation of enrollment in a university</div>' +
                '</div>';

    }else{
        newDiv2 = '<div class="" style="padding-bottom: 20px;">' +'<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div id="passport" class="main-divs-color mutual-titles-color">Student Status</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +
                '<img data-number="2" title="Upload Student Status" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="/static/img/before-done-img.svg">' +
                '<img class="img-fail" src="/static/img/img-fail.svg">' +
                '</div>' +
                '</div>' +
                '<div class="main-divs-color mutual-titles-color" style="width: calc(100% - 40px); color: C6C5C5;">Official confirmation of enrollment in a university</div>' +
                '</div>';
    }
    
    
    
    

            if (data["certificateOfEnrolmentExists"] === true) {
                newDiv3 = '<div class="" style="padding-bottom: 20px";>' +'<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
                    '<div class="docs-nike-fails" style="display: flex;">';
                    
                    if(data["certificateStatus"] === "A"){
                        newDiv3 +='<div id="certificateOfenro" class="main-divs-color mutual-titles-color blue-text">Certificate of Enrolment</div>'+'<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
                        newDiv3 +=
                        '</div>' +
                        '<img data-number="3" title="Download Certificate of Enrolment" class="open-popup" onclick="getDocument(this)"  src="/static/img/documents-second-icon.svg" alt="">' +
                        '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
                        newDiv3 +=
                        '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(3);">' +
                        '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(3);">' ;
                    }else if(data["certificateStatus"] === "R"){
                        newDiv3 += '<div id="certificateOfenro" class="main-divs-color mutual-titles-color">Certificate of Enrolment</div>'+'<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">';
                        newDiv3 +=
                        '</div>' +
                        '<img data-number="3" title="Upload Certificate of Enrolment" onclick="openPopUp(this)" class="open-popup"  src="/static/img/documents-icon.svg" alt="">' +
                        '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
                        newDiv3 +=
                        '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(3);">' +
                        '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(3);">' ;
                    }else{
                        newDiv3 +='<div id="certificateOfenro" class="main-divs-color mutual-titles-color blue-text">Certificate of Enrolment</div>'+'<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
                        newDiv3 +=
                        '</div>' +
                        '<img data-number="3" title="Download Certificate of Enrolment" class="open-popup" onclick="getDocument(this)"  src="/static/img/documents-second-icon.svg" alt="">' +
                        '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
                     
                        newDiv3 +=
                        '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(3);">' +
                        '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(3);">' ;
                    }
                    newDiv3 +=
                    
                '</div>' +
                '</div>' +
                '<div class="main-divs-color mutual-titles-color" style="width: calc(100% - 40px); color: C6C5C5;">Official document from ZAV signed and sealed by university</div>' +
                '</div>';
                }
                else {
                newDiv3 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
                    '<div class="docs-nike-fails" style="display: flex;">' +
                    '<div class="main-divs-color mutual-titles-color">Certificate of Enrolment</div>' +
                    '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                    '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                    '</div>' +
                    '<img data-number="3" title="Upload Certificate of Enrolment" onclick="openPopUp(this)" class="open-popup"  src="/static/img/documents-icon.svg" alt="">' +
                    '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                    '<img class="img-done" src="/static/img/before-done-img.svg">' +
                    '<img class="img-fail" src="/static/img/img-fail.svg">'
                     +                '</div>' +
                '</div>' +
                '<div class="main-divs-color mutual-titles-color" style="width: calc(100% - 40px); color: C6C5C5;">Official document from ZAV signed and sealed by university</div>' +

                '</div>';
                }





            if (data["studentIdExists"] === true){

                    newDiv4 = '<div class="" style="">' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
                        '<div class="docs-nike-fails" style="display: flex;">';
                        if(data["studentIdStatus"] === "A"){

                            newDiv4 +='<div class="main-divs-color mutual-titles-color blue-text">Student ID</div>'+
                        '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
                        newDiv4 += '</div>' +   
                        '<img data-number="4" title="Download Student ID" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                        '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
                        newDiv4 +=
                            '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(4);">' +
                            '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(4);">' ;
                        
                        }else if(data["studentIdStatus"] === "R"){
                            newDiv4 += '<div class="main-divs-color mutual-titles-color">Student ID</div>'+'<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">';
                            newDiv4 += '</div>' +   
                            '<img data-number="4" title="Upload Student ID" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                        '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
                        newDiv4 +=
                            '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(4);">' +
                            '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(4);">' ;
                        }else{
                            newDiv4 +='<div class="main-divs-color mutual-titles-color blue-text">Student ID</div>'+
                            '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">';
                            newDiv4 += '</div>' +   
                        '<img data-number="4" title="Download Student ID" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                        '<div class="div_replacement" style="display: none; justify-content: space-between; ">';
                        newDiv4 +=
                            '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(4);">' +
                            '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(4);">' ;
                        }
                      
                        
                    
                        newDiv4 +='</div>' +
                        '</div>' +
                        '<div class="main-divs-color mutual-titles-color" style="width: calc(100% - 40px); color: C6C5C5;">Official identification card issued by a university</div>' +
                        '</div>';
                        
                    }
                    else {
                    
                    newDiv4 = '<div class="" style="padding-bottom: 20px";>' + '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 6px;">' +
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
                    '<div class="main-divs-color mutual-titles-color" style="width: calc(100% - 40px); color: C6C5C5;">Official identification card issued by a university</div>' +
                    '</div>';
                    }









        //                 if(data["photoExists"] === true){
        //                     if(data["photoStatus"] === "A"){
        //                         var newDiv5 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
        //                         '<div class="docs-nike-fails" style="display: flex;">' +
        //                         '<div class="main-divs-color mutual-titles-color blue-text">Photo</div>' +
        //                         '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
        //                         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
        //                         '</div>'+
        //                         '<img data-number="5" title="Download Photo" class="open-popup" onclick="getDocument(this)" src="/static/img/documents-second-icon.svg" alt="">' +
        //                         '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
        //                         '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(5);"> ' +
        //                         '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(5);">'+
        //                         '</div>'
                    
        //                     '</div>';
        //                     }else if(data["photoStatus"] === "R"){
        //                         var newDiv5 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
        //                         '<div class="docs-nike-fails" style="display: flex;">' +
        //                         '<div class="main-divs-color mutual-titles-color ">Photo</div>' +
        //                         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
        //                         '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
        //                         '</div>' +   
        //                         '<img data-number="5" title="Upload Photo" class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
        //                         '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
        //                             '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(5);">' +
        //                             '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(5);">'
        //                             +
        //                         '</div>'
                    
        //                     '</div>';
        //                     }else{
        //                         var newDiv5 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
        //                             '<div class="docs-nike-fails" style="display: flex;">' +
        //                             '<div class="main-divs-color mutual-titles-color blue-text">Photo</div>' +
        //                             '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
        //                             '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
        //                             '</div>' +   
        //                         '<img data-number="5" title="Download Photo" class="open-popup" onclick="getDocument(this)" src="/static/img/documents-second-icon.svg" alt="">' +
        //                         '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
        //                             '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(5);">' +
        //                             '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(5);">'
        //                             +
        //                         '</div>'
                    
        //                     '</div>';
        //                         }
        //                     }
        //                     else {
        //                     var newDiv5 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
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
        //                 }
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
        //         '<div class="main-divs-color mutual-titles-color blue-text">Resume</div>' +
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
        // // var newDiv6 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
        // //     '<div class="main-divs-color mutual-titles-color blue-text">Resume</div>' +
        // //     '<a href="' + url + '"><img data-number="6" title="Download Resume" class="open-popup" src="/static/img/documents-second-icon.svg" alt=""></a>' +
        // // '</div>';




        // if(data["serviceContractExists"] === true){
        //     if(data["serviceContractStatus"] === "A"){
        //         var newDiv7 = '<div class="main-div-docs" style="display: flex; justify-content: space-between;  ">' +
        //         '<div class="docs-nike-fails" style="display: flex;">' +
        //         '<div class="main-divs-color mutual-titles-color blue-text">Service Contract</div>' +
        //         '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
        //         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
        //         '</div>' +  
        //         '<img data-number="7" title="Download Service Contract" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
        //         '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
        //         '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(7);">' +
        //         '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(7);">'
        //          +
        //     '</div>'

        //     '</div>';
        //     }else if(data["serviceContractStatus"] === "R"){
            
        //         var newDiv7 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; ">' +
        //         '<div class="docs-nike-fails" style="display: flex;">' +
        //         '<div class="main-divs-color mutual-titles-color ">Service Contract</div>' +
        //         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
        //         '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
        //         '</div>' +  
        //         '<img data-number="7" title="Upload Service Contract"  class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
        //         '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
        //         '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(7);">' +
        //         '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(7);">'
        //             +
        //         '</div>'

        //         '</div>';
        //     }else{
        //         var newDiv7 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; ">' +
        //         '<div class="docs-nike-fails" style="display: flex;">' +
        //         '<div class="main-divs-color mutual-titles-color blue-text">Service Contract</div>' +
        //         '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
        //         '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
        //         '</div>' +  
        //         '<img data-number="7" title="Download Service Contract" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
        //         '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
        //         '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(7);">' +
        //         '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(7);">'
        //          +
        //     '</div>'

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
        //         '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
        //         '<img class="img-done" src="/static/img/before-done-img.svg">' +
        //         '<img class="img-fail" src="/static/img/img-fail.svg">'
        //          +
        //     '</div>'
        //     '</div>'
        //         }
        
        $('#documentList').empty();
        // Append the new div elements to the documentList
        $('#documentList').append(newDiv,newDiv1,newDiv2,newDiv3,newDiv4);


        var newDiv8 = ""
        var newDiv9 = ""
        
        if(data["jobOfferExists"] === true){
            if(data["jobOfferStatus"] === "A"){
                var newDiv8 = '<div class="main-div-docs" style="display: flex; justify-content: space-between;padding-bottom: 20px; ">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Job Offer</div>' +
                '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +  
                '<img data-number="8" title="Download Job Offer" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(8);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(8);">'
                 +
            '</div>'

            '</div>';
            }else if (data["jobOfferStatus"] === "R"){
                var newDiv8 = '<div class="main-div-docs" style="display: flex; justify-content: space-between;padding-bottom: 20px; ">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color ">Job Offer</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: ;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +  
                '<img data-number="8" title="Upload Job Offer"  class="open-popup" onclick="openPopUp(this)" src="/static/img/documents-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(8);">' +
                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(8);">'
                    +
                '</div>'

                '</div>';
            }else{
                var newDiv8 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom:20px; ">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Job Offer</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +  
                '<img data-number="8" title="Download Job Offer" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(8);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(8);">'
                 +
            '</div>'

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
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="/static/img/before-done-img.svg">' +
                '<img class="img-fail" src="/static/img/img-fail.svg">'
                 +
            '</div>'
            '</div>'
        }
        if(data["workPermitExists"] === true){
            if(data["workPermitStatus"] === "A"){
                var newDiv9 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; ">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Work Permit</div>' +
                '<img style="display: ;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +  
                '<img data-number="9" title="Download Work Permit" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="/static/img/nike-img-done.svg" onclick="penndingFunction(9);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(9);">'
                 +
            '</div>'

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
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(9);">' +
                '<img class="img-fail" src="/static/img/fail-red.svg" onclick="penndingFunction(9);">'
                    +
                '</div>'

                '</div>';
            }else{
                var newDiv9 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom:20px; ">' +
                '<div class="docs-nike-fails" style="display: flex;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Work Permit</div>' +
                '<img style="display: none;" class="img-after-done" src="/static/img/nike-img-done.svg" alt="">' +
                '<img style="display: none;" class="img-after-failed" src="/static/img/fail-red.svg" alt="">' +
                '</div>' +  
                '<img data-number="9" title="Download Work Permit" onclick="getDocument(this)" class="open-popup" src="/static/img/documents-second-icon.svg" alt="">' +
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="/static/img/before-done-img.svg" onclick="ApproveFunction(9);">' +
                '<img class="img-fail" src="/static/img/img-fail.svg" onclick="RefuseFunction(9);">'
                 +
            '</div>'

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
                '<div class="div_replacement" style="display: none; justify-content: space-between; ">' +
                '<img class="img-done" src="/static/img/before-done-img.svg">' +
                '<img class="img-fail" src="/static/img/img-fail.svg">'
                 +
            '</div>'
            '</div>'
        }
        var beforeNewDiv3 = '<img class="imgs-three-dots-zip-img three-dots-document" style="" src="/static/img/Three-dots.svg">';
        var downloadUrl = '/download_user_folder/' + id;
        var beforeNewDiv4 = '<img class="imgs-three-dots-zip-img img-zip-download" style="" src="/static/img/zipDown2.svg" onclick="downloadWorkPermitFolder('+"'"+data["email"]+"'"+')">';
        
        $('#recdocumentList').empty();
        $("#parent-img-zip2").empty();
        $("#parent-img-zip2").append(beforeNewDiv3,beforeNewDiv4)
        $('#recdocumentList').append(newDiv8,newDiv9);



      











        // End documents



        $('.three-dots-document').click(function() {
            if ($(".open-popup").css("display") === "block") {
                $(".open-popup").css("display", "none");
                $(".div_replacement").css("display", "flex");
                $(".img-zip-download").hide();
            } else {
                $(".open-popup").css("display", "block");
                $(".div_replacement").css("display", "none");
                $(".img-zip-download").show();
        
            }
        });



      

        if( data["userExpCount"] != "0"){
        for (let i = 0; i < data["userExpCount"]; i++) {
          var title = "title"+i
          var company = "company"+i
          var location = "cityexp"+i
          var date = "date"+i



          $('#UserExp').append($('<div class="experience-rows-img JSAdded" style="margin-top:30px;" id="asd"> <img class="experience-education-img" src="/static/img/worki_icons-18.jpg" alt="" title="Experience"><div class="experience-rows"><div class="experience-first-row" id="titleExp">'+data[title]+'</div><div class="experience-second-row" id="Compexp1">'+data[company]+'</div><div class="experience-third-row" id="Locexp1">'+data[location]+'</div><div class="experience-fourth-row" id="date1">'+data[date]+'</div></div></div>'));
        }

        }



        if (data["userEduCount"]!="0"){
        for (let i = 0; i < data["userEduCount"]; i++) {
            var university = "university"+i;
            var uniField = "field"+i;
            var uniloc = "uniloc"+i
            var uniYear = "unidate"+i
            $('#UserEdu').append($('<div class="experience-rows-img JSAdded" style="margin-top:30px;"><img class="experience-education-img" src="/static/img/worki_icons-19.jpg" alt="" title="Education"><div class="experience-rows"><div class="experience-first-row" id="university">'+data[university]+'</div><div class="experience-second-row" id="uniField">'+data[uniField]+'</div><div class="experience-third-row" id="uniLoc">'+data[location]+'</div><div class="experience-fourth-row" id="uniYear">'+data[uniYear]+'</div></div></div>'));
        }



        }
        if(data["countLang"] != "0"){
        for (let i = 0; i < data["countLang"]; i++) {
            var lang = "language"+i;
            var level = "languageLevel"+i;
                 $('#UserLang').append($('<div style="" class="experience-rows-img-languages JSAdded" style="margin-top:30px;"><div class="education-second-paragraph">'+data[lang]+'</div><div class="language-rate">'+data[level]+'</div></div></div>'));
        }

        }
        var firstMediaQuery = window.matchMedia('(min-width: 768px');
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        var right_jobs_main_div = document.querySelector('.right-jobs-main-div');
        var right_jobs = document.querySelector('.right-jobs');
        var jobs_left = document.querySelector('.job-left');
        var jobs_buttons = document.querySelector('.jobs-buttons');


        if (mediaQuery.matches) {
                right_jobs_main_div.style.display = "flex";
                right_jobs.style.display = "flex";
                jobs_left.style.display = "none";
                jobs_buttons.style.display = "none";
                if(id==0){
                    var select = document.getElementById('select'+id)
                    select.style.backgroundColor = "white";
                }
        }else{
            if(id != 0){
                var select = document.getElementById('select'+id)
                select.style.backgroundColor = "#E7F1FE";
            }

            if(id == 0){
                id=data["post_id"]
                var select = document.getElementById('select'+id)
                select.style.backgroundColor = "#E7F1FE";
            }
        }
        ;
       }
const mediaQuery = window.matchMedia('(max-width: 767px)');
var right_jobs_main_div = document.querySelector('.right-jobs-main-div');
var right_jobs = document.querySelector('.right-jobs');
var jobs_left = document.querySelector('.jobs-left');
        var jobs_buttons = document.querySelector('.jobs-buttons');
if (mediaQuery.matches) {
right_jobs_main_div.style.display = "none";
right_jobs.style.display = "none";
                jobs_left.style.display = "flex";
                jobs_buttons.style.display = "flex";
}
else{
var c =document.getElementById("sectedUser").value;

getUser(c);
}


