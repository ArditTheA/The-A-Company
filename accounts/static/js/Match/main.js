var qualified_button = document.getElementById("qualify");
 var input_type = document.querySelectorAll(".input_type");


var myDiv = document.getElementById("qualify");

var x1 = document.querySelectorAll(".dropdown-content").innerText;
var subphases = document.querySelectorAll("dropdown-content");


const ct = [];
$(".phaseButton").click(function(event){
    var jobid={{jpk}};
    var url = "/Administrator/Applicant/JobId="+jobid+"/Phase="+phase+"/applicant="+ct.toString();
    window.location = url;
});
$('#select-all').click(function(event) {
    if(this.checked) {

        // Iterate each checkbox
        $(':checkbox').each(function() {
            this.checked = true;
            this.title = "Deselect applicant";
            $('.input_type').css("display", "block");
            $( '.input_type').prop( "checked", false );
            $('.input_type').click(function(e) {
                if (this.checked) {
                    $('.move-phase-button').css("display", "block");
                }

                else {
                    $('.move-phase-button').css("display", "none");

                }
            })
        });
    } else {
        $(':checkbox').each(function() {
            this.checked = false;
            this.title = "Select applicant";
            $('.input_type').css("display", "none");
        });
    }
});

var x1 = document.querySelector(".all-applicants-dropdown");
// var c = document.querySelectorAll(".checkbox-jobs");

$('[name="checkb"]').click(function(e) {
    console.log("testttt");
})


