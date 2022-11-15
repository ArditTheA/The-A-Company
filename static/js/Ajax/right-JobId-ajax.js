 async function getNumber(id) {
        window.history.pushState("","","")
        window.history.pushState("","", id)
        var elements = document.getElementsByClassName('pixel'); // get all elements

        for(var i = 0; i < elements.length; i++){
            elements[i].style.backgroundColor = "white";
        }

        post_id=id
//        if(id == ""){
//            if (data["post_id"] != ""){
//                post_id=data["post_id"]
//            }
//        }

        let response = await fetch('/',{

            method: "get",

            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": 'application/json',
                text: post_id,
            }

        }

        )

        let data = await response.json()
        var auth = data["auth"]
        var element = document.getElementById("detailsRow");

        if (element) {
            var display = element.style.display;

            if (display == "none") {
                element.style.display = "flex";
            }
        }
        const mobile = window.matchMedia('(max-width: 767px)');
        if(mobile.matches){

        }else{
            if(post_id != 0){
                var select = document.getElementById('select'+id)
                select.style.backgroundColor = "#E7F1FE";
            }

            if(id == 0){
                id=data["post_id"]
                var select = document.getElementById('select'+id)
                select.style.backgroundColor = "#E7F1FE";
            }
        }

        let textarea = document.getElementById('message');
        textarea.innerHTML=data["description"]


        var element = document.getElementById("job_title");
        element.innerHTML = data["title"]

        var city_jobs = document.getElementById("city")
        city_jobs.innerHTML = data["city_j"]+",  "+data["country"]

        var countApplicant = document.getElementById("countApplicant")

        if(data["appNo"]==0){
            countApplicant.innerHTML = data["appNo"]+" Applicants"
        }else if(data["appNo"]>=2){
            countApplicant.innerHTML = data["appNo"]+" Applicants"
        }
        else{
            countApplicant.innerHTML = data["appNo"]+" Applicant"
        }

        var start_date = document.getElementById("sDate");
        start_date.innerHTML = data["start_date"] +" - "+data["end_date"];


        var comp = document.getElementById("company")
        comp.innerHTML=data["company"]

        if(data["country"]== "USA"){
        var salary = document.getElementById("salary")
        salary.innerHTML ="$"+ data ["salary"]+"/hour"
        }else{
            var salary = document.getElementById("salary")
        salary.innerHTML ="€"+ data ["salary"]+"/hour"
        }
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
        var button = document.getElementById("button")
        var url= "apply/"+id
        var dateApply=data["hasApplyDate"]
        var hasApply = data["hasApply"]
        var auth=data["auth"]

        if(!hasApply){

            if (auth == "True"){
                document.getElementById("button").style.marginTop = "33px";
                button.innerHTML = '<a href="'+url+'" class="applied-button-jobs outline-none" style="text-decoration:none;margin-top: 18px; width: fit-content; padding-top: 8px; padding-bottom: 8px;">Fast Apply</a>';
            }else{
             document.getElementById("button").style.marginTop = "33px";

            button.innerHTML = '<a href="'+url+'" class="applied-button-jobs outline-none" style="text-decoration:none;margin-top: 18px; width: fit-content; padding-top: 8px; padding-bottom: 8px;">Apply</a>';
            }
        }else{
            document.getElementById("button").style.marginTop = "20px";

            button.innerHTML="Applied on "+data["applyDate"]
        }


        var firstMediaQuery = window.matchMedia('(min-width: 768px');
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        var right_jobs_main_div = document.querySelector('.right-jobs-main-div');
        var jobs_left = document.querySelector('.jobs-left');
        var jobs_buttons = document.querySelector('.jobs-buttons');

        if (mediaQuery.matches) {
                right_jobs_main_div.style.display = "flex";
                jobs_left.style.display = "none";
                jobs_buttons.style.display = "none";
                if(id==0){
                var select = document.getElementById('select'+id)
                select.style.backgroundColor = "white";
                }
        }
        ;
    }



        function myFunction(x) {
            var element = document.getElementById("detailsRow");
        if (x.matches) {
            var getJobList = document.querySelector(".jobs-rows-img")
            getJobList.style.backgroundColor = "white"
            element.style.display = "flex";
            var c =document.getElementById("PostID").value;
            var result = window.location.href.split('/').reverse()[0]
            if (result != ""){
                getNumber(result)
            }else{
                getNumber(c);
            }

        } else {
            element.style.display = "flex";
            var c =document.getElementById("PostID").value;
            var result = window.location.href.split('/').reverse()[0]
            if (result != ""){
                getNumber(result)
            }else{
                getNumber(c);
            }
        }
        }

        // Create a MediaQueryList object
        const mmObj = window.matchMedia("(max-width: 480px)")

        // Call the match function at run time:
        myFunction(mmObj);

        // Add the match function as a listener for state changes:
        mmObj.addListener(myFunction)




