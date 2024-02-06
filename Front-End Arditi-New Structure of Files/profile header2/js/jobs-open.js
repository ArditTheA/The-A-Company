function showElements(shouldShowLeftJobs) {
    const elementsToShow = shouldShowLeftJobs ? '.job-left, .profileHeader, .header-wishes, .jobs-buttons' : '.right-jobs, .right-jobs-main-div';
    console.log("------------------");
    console.log("------------------");
    console.log(shouldShowLeftJobs);
    console.log("------------------");
    console.log("------------------");
    if (window.matchMedia('(max-width: 480px)').matches) {
        if (shouldShowLeftJobs) {
            $('.job-left, .profileHeader, .header-wishes, .jobs-buttons').show();
            $('.right-jobs, .right-jobs-main-div').hide();
        } else {
            $('.job-left, .profileHeader, .header-wishes, .jobs-buttons').hide();
            $('.right-jobs, .right-jobs-main-div').show();
        }
    } else {
        $(elementsToShow).show();
    }
}

function updateHistoryURL(id) {
    const newURL = window.location.origin + "/jobs";
    history.pushState({ showJobLeft: !id }, '', newURL);
}


function initialize() {
    const post_id = '1';
    updateHistoryURL(post_id);

    $('.job-left-row').click(function() {
        const id = $(this).attr('id').substring("select".length);
        updateHistoryURL(id);
        showElements(false);
    });

    $('.job-right-exit').click(function() {
        updateHistoryURL();
        showElements(true);
    });

    // Add more event handlers as needed
}

// Handle popstate for mobile
window.addEventListener('popstate', function(event) {
    if (event.state !== null) {
        showElements(event.state.showJobLeft);
    }
});

// Initial setup based on the screen width
if (window.matchMedia('(max-width: 480px)').matches) {
    showElements(true); // Ensure right jobs are initially hidden on mobile

    initialize();
} else {
    $(document).ready(initialize);
}

// Additional code to handle initial history state
window.addEventListener('load', function() {
    showElements(history.state && history.state.showJobLeft !== true);
});

$(document).ready(function() {
    $('.job-left-row').eq(0).click();
    
    if (window.innerWidth <= 767){
        $('.right-jobs, .right-jobs-main-div').hide();
    }
});


async function getNumber(id) {

var elements = document.getElementsByClassName('pixel'); // get all elements

for(var i = 0; i < elements.length; i++){
elements[i].style.backgroundColor = "white";
};
post_id=id

let data = {
"description": "booking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-containerbooking-container<br />booking-containerbooking-containerv<br />v<br />booking-container<br />booking-container<br />booking-container",
"title": "Consectetur et culp",
"city_j": [
"Et eveniet laborum"
],
"country": [
"Adipisicing laboris"
],
"start_date": "12/12/2023",
"salary": "96.00",
"hourWeek": 91,
"company": "Jordan Haynes LLC",
"end_date": "12/12/2024",
"SDate": "2023-12-12",
"EDate": "2024-12-12",
"typeOfWork": "Part Time",
"hourPerWork": 91,
"housing": "Not provided",
"housingCost": 83,
"program": "Work and Travel",
"programCost": "5",
"posted": null,
"post_id": "352",
"appNo": "1",
"hasApply": false,
"safe": true,
"applyDate": ""
};

console.log(JSON.stringify(data, null, 2));
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



var Company = document.getElementById("company");
Company.innerHTML=data["company"];



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
if (!hasApply){
        var url= "apply/"+id
        button.innerHTML = '<a href="'+url+'" class="right-jobs-directions-accept-job accept-job-offer-button accept-confetti" onclick="CallCanvas(event);startConfetti();" title="Accept job">Apply</a>';


}else{
    button.innerHTML="Applied on "+data["applyDate"]
}
}
}
const mediaQuery = window.matchMedia('(max-width: 767px)');

if (!mediaQuery.matches) {
var select = document.getElementById('select'+post_id);
select.style.backgroundColor = "#E7F1FE";

};


}
function showElements(shouldShowLeftJobs) {
    const elementsToShow = shouldShowLeftJobs ? '.job-left, .profileHeader, .header-wishes, .jobs-buttons' : '.right-jobs, .right-jobs-main-div';
    console.log("------------------");
    console.log("------------------");
    console.log(shouldShowLeftJobs);
    console.log("------------------");
    console.log("------------------");
    if (window.matchMedia('(max-width: 480px)').matches) {
        if (shouldShowLeftJobs) {
            $('.job-left, .profileHeader, .header-wishes, .jobs-buttons').show();
            $('.right-jobs, .right-jobs-main-div').hide();
        } else {
            $('.job-left, .profileHeader, .header-wishes, .jobs-buttons').hide();
            $('.right-jobs, .right-jobs-main-div').show();
        }
    } else {
        $(elementsToShow).show();
    }
}

function updateHistoryURL(id) {
    const newURL = window.location.origin + "/jobs" + (id ? '/' + id : '');
    history.pushState({ showJobLeft: !id }, '', newURL);
}

function initialize() {
    const post_id = '1';
    updateHistoryURL(post_id);

    $('.job-left-row').click(function() {
        const id = $(this).attr('id').substring("select".length);
        updateHistoryURL(id);
        showElements(false);
    });

    $('.job-right-exit').click(function() {
        updateHistoryURL();
        showElements(true);
    });

    // Add more event handlers as needed
}

// Handle popstate for mobile
window.addEventListener('popstate', function(event) {
    if (event.state !== null) {
        showElements(event.state.showJobLeft);
    }
});

// Initial setup based on the screen width
if (window.matchMedia('(max-width: 480px)').matches) {
    showElements(true); // Ensure right jobs are initially hidden on mobile

    initialize();
} else {
    $(document).ready(initialize);
}

// Additional code to handle initial history state
window.addEventListener('load', function() {
    showElements(history.state && history.state.showJobLeft !== true);
});
