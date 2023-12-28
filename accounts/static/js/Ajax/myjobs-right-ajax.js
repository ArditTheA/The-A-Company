    
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


    async function getMyJobs(id) {

        var elements = document.getElementsByClassName('pixel'); // get all elements

        for(var i = 0; i < elements.length; i++){
            elements[i].style.backgroundColor = "white";
        };

        post_id=id;
        $("#current-job-id").val(id)


        let response = await fetch('',{

            method: "get",

            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": 'application/json',
                text: post_id,
            }

        }

        );
        let data = await response.json();
        if(data["StatusApp"]){
            if(data["StatusApp"] == "Qualified"){
                $("#doc-app").css("display","block")
            }else{
                $("#doc-app").css("display","none")
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

        // Documents
        var newDiv = '<input type="hidden" id="applicantID">';
        if (data["passaportExists"] === true) {
            console.log("testtsad-0a-ds");
            newDiv1 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Passport</div>' +
                '<img data-number="1" data-document-id="1" title="Download Passport" onclick="getDocument(this)" class="passport-img open-popup downloadImg" src="/static/img/documents-second-icon.svg" alt="">' +
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
                '<img data-number="2" title="Download Student status" class="open-popup" onclick="getDocument(this)" src="/static/img/documents-second-icon.svg" alt="">' +
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
                '<img data-number="3" title="Download Certificate of Enrolment" class="open-popup" onclick="getDocument(this)"  src="/static/img/documents-second-icon.svg" alt="">' +
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
                '<img data-number="4" title="Download Student ID" class="open-popup"  onclick="getDocument(this)" src="/static/img/documents-second-icon.svg" alt="">' +
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
            '<img data-number="5" title="Download Photo" class="open-popup" onclick="getDocument(this)"  src="/static/img/documents-second-icon.svg" alt="">' +
        '</div>';
        }else{
            var newDiv5 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
            '<div class="main-divs-color mutual-titles-color">Photo</div>' +
            '<img data-number="5" title="Upload Photo" class="open-popup" onclick="openPopUp(this)"  src="/static/img/Applicant/documents-icon.svg" alt="">' +
        '</div>';

        }
        url = "/download-cv/"+data["userid"]
        
        var newDiv6 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
            '<div class="main-divs-color mutual-titles-color blue-text">Resume</div>' +
            '<a href="' + url + '"><img data-number="6" title="Download Resume" class="open-popup" src="/static/img/documents-second-icon.svg" alt=""></a>' +
        '</div>';
        if(data["serviceContractExists"] === true){
            var newDiv7 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; ">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Service contract</div>' +
                '<img data-number="7" title="Download Service contract"  class="open-popup" onclick="getDocument(this)"  src="/static/img/documents-second-icon.svg" alt="">' +
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
                '<img data-number="8" title="Download Job Offer"  class="open-popup" onclick="getDocument(this)"  src="/static/img/documents-second-icon.svg" alt="">' +
            '</div>';
        }else{
            var newDiv8 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; padding-bottom: 20px;">' +
                '<div class="main-divs-color mutual-titles-color">Job Offer</div>' +
                '<img data-number="8" title="Download Upload Job Offer"  class="open-popup" onclick="openPopUp(this)"  src="/static/img/Applicant/documents-icon.svg" alt="">' +
            '</div>';
        }
        if(data["workPermitExists"] === true){
            var newDiv9 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; ">' +
                '<div class="main-divs-color mutual-titles-color blue-text">Work Permit</div>' +
                '<img data-number="9" title="Download Work Permit"  class="open-popup" onclick="getDocument(this)"  src="/static/img/documents-second-icon.svg" alt="">' +
            '</div>';
        }else{
            var newDiv9 = '<div class="main-div-docs" style="display: flex; justify-content: space-between; ">' +
                '<div class="main-divs-color mutual-titles-color">Work Permit</div>' +
                '<img data-number="9" title="Upload Work Permit"  class="open-popup" onclick="openPopUp(this)"  src="/static/img/Applicant/documents-icon.svg" alt="">' +
            '</div>';
        }

        $('#recdocumentList').empty();
        $('#recdocumentList').append(newDiv8,newDiv9);



        var mainJobs = false;


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
        if(!rB){
            if(button){
                
                    button.innerHTML="Applied on "+data["applyDate"]
                
            }
        }
        const mediaQuery = window.matchMedia('(max-width: 767px)');

        if (!mediaQuery.matches) {
        var select = document.getElementById('select'+post_id);
        select.style.backgroundColor = "#E7F1FE";

        };

        console.log(showElements1(false));
        showElements1(false);


}






        
       

