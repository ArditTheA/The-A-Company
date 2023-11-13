 async function getUser(id) {
        document.getElementById("sectedUser").value = id;
        document.getElementById("user_id").value = id;
        
        var elements = document.getElementsByClassName('pixel'); // get all elements

        for(var i = 0; i < elements.length; i++){
            elements[i].style.backgroundColor = "white";
        }
        document.getElementById("DownloadZip").addEventListener("click", function(event) {
            event.preventDefault(); // Prevent the default link behavior
            // Set the actual URL dynamically
            var userId = id; // Replace with the desired user ID
            var downloadUrl = `/download_user_folder/${userId}`;
            window.location.href = downloadUrl;
        });


        let response = await fetch('',{

            method: "get",

            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": 'application/json',
                userid: id,
            }

        });

        let data =  await response.json();
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
        document.getElementById("appdate").innerHTML= data["applyDate"];
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
            console.log("testtsad-0a-ds");
            newDiv1 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Passport</div>' +
                '<img data-number="1" data-document-id="1" title="Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
            '</div>';
        } else {
            newDiv1 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="main-divs-color mutual-titles-color">Passport</div>' +
                '<img data-number="1" title="Upload Passport" class="passport-img open-popup" onclick="openPopUp(this)" src="/static/img/Applicant/documents-icon.svg" alt="">' +
            '</div>';
        }

        if (data["studentStatusExists"] === true) {
            newDiv2 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Student status</div>' +
                '<img data-number="2" title="Student status" class="open-popup" onclick="getDocument(this)" src="/static/img/documents-second-icon.svg" alt="">' +
            '</div>';
        }else{
            newDiv2 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="main-divs-color mutual-titles-color">Student status</div>' +
                '<img data-number="2" title="Upload Student status" class="open-popup" onclick="openPopUp(this)"  src="/static/img/Applicant/documents-icon.svg" alt="">' +
            '</div>';
        }

        if (data["certificateOfEnrolmentExists"] === true) {
            newDiv3 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Certificate of Enrolment</div>' +
                '<img data-number="3" title="Certificate of Enrolment" class="open-popup" onclick="getDocument(this)"  src="/static/img/documents-second-icon.svg" alt="">' +
            '</div>';
        }else{
            newDiv3 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="main-divs-color mutual-titles-color">Certificate of Enrolment</div>' +
                '<img data-number="3" title="Upload Certificate of Enrolment" class="open-popup" onclick="openPopUp(this)"  src="/static/img/Applicant/documents-icon.svg" alt="">' +
            '</div>';
        }

        if (data["studentIdExists"] === true){
            newDiv4 =  '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Student ID</div>' +
                '<img data-number="4" title="Student ID" class="open-popup"  onclick="getDocument(this)" src="/static/img/documents-second-icon.svg" alt="">' +
            '</div>';
        }else{
            newDiv4 =  '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="main-divs-color mutual-titles-color ">Student ID</div>' +
                '<img data-number="4" title="Upload Student ID" class="open-popup" onclick="openPopUp(this)"  src="/static/img/Applicant/documents-icon.svg" alt="">' +
            '</div>';
        }


        if(data["photoExists"] === true){
            var newDiv5 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
            '<div class="main-divs-color mutual-titles-color blue-text">Photo</div>' +
            '<img data-number="5" title="Photo" class="open-popup" onclick="getDocument(this)"  src="/static/img/documents-second-icon.svg" alt="">' +
        '</div>';
        }else{
            var newDiv5 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
            '<div class="main-divs-color mutual-titles-color">Photo</div>' +
            '<img data-number="5" title="Upload Photo" class="open-popup" onclick="openPopUp(this)"  src="/static/img/Applicant/documents-icon.svg" alt="">' +
        '</div>';

        }
        var currentDomain = window.location.origin;
        url = "/Administrator/Users/CV/"+id
        
        var newDiv6 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
            '<div class="main-divs-color mutual-titles-color blue-text">Resume</div>' +
            '<a href="' + url + '"><img data-number="6" title="Resume" class="open-popup" src="/static/img/documents-second-icon.svg" alt=""></a>' +
        '</div>';
        if(data["serviceContractExists"] === true){
            var newDiv7 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; ">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Service contract</div>' +
                '<img data-number="7" title="Service contract"  class="open-popup" onclick="getDocument(this)"  src="/static/img/documents-second-icon.svg" alt="">' +
            '</div>';
        }else{
            var newDiv7 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; ">' +
                '<div class="main-divs-color mutual-titles-color">Service contract</div>' +
                '<img data-number="7" title="Upload Service contract"  class="open-popup" onclick="openPopUp(this)"  src="/static/img/Applicant/documents-icon.svg" alt="">' +
            '</div>';
        }
        
        $('#documentList').empty();
        // Append the new div elements to the documentList
        $('#documentList').append(newDiv,newDiv1,newDiv2,newDiv3,newDiv4,newDiv5,newDiv6,newDiv7);


        var newDiv8 = ""
        var newDiv9 = ""
        if(data["jobOfferExists"] === true){
            var newDiv8 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Job Offer</div>' +
                '<img data-number="8" title="Job Offer"  class="open-popup" onclick="getDocument(this)"  src="/static/img/documents-second-icon.svg" alt="">' +
            '</div>';
        }else{
            var newDiv8 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="main-divs-color mutual-titles-color">Job Offer</div>' +
                '<img data-number="8" title="Upload Job Offer"  class="open-popup" onclick="openPopUp(this)"  src="/static/img/Applicant/documents-icon.svg" alt="">' +
            '</div>';
        }
        if(data["workPermitExists"] === true){
            var newDiv9 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; ">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Work Permit</div>' +
                '<img data-number="9" title="Work Permit"  class="open-popup" onclick="getDocument(this)"  src="/static/img/documents-second-icon.svg" alt="">' +
            '</div>';
        }else{
            var newDiv9 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; ">' +
                '<div class="main-divs-color mutual-titles-color">Work Permit</div>' +
                '<img data-number="9" title="Upload Work Permit"  class="open-popup" onclick="openPopUp(this)"  src="/static/img/Applicant/documents-icon.svg" alt="">' +
            '</div>';
        }

        $('#recdocumentList').empty();
        $('#recdocumentList').append(newDiv8,newDiv9);



      











        // End documents







      

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


