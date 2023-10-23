     async function getNumber(id) {

        var elements = document.getElementsByClassName('pixel'); // get all elements

        for(var i = 0; i < elements.length; i++){
            elements[i].style.backgroundColor = "white";
        };

        post_id=id;


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






        
       

