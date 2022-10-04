 async function getNumber(id) {


        var elements = document.getElementsByClassName('pixel'); // get all elements

        for(var i = 0; i < elements.length; i++){
            elements[i].style.backgroundColor = "white";
        }

        post_id=id

    
        console.log("post__id="+post_id)
        let response = await fetch('',{

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
        
        let textarea = document.getElementById('message');
        // textarea.value = "";
        // textarea.value += data["description"];
        // var text = $('#message');

        // text.each(function(){
        //     $(this).attr('rows',1);
        //     resize($(this));
        // });
        
        // function resize ($text) {
        //     $text.css('height', 'auto');
        //     $text.css('height', $text[0].scrollHeight+10+'px');
        // }
        textarea.innerHTML=data["description"]


        var element = document.getElementById("job_title");
        element.innerHTML = data["title"]

        var city_jobs = document.getElementById("city")
        city_jobs.innerHTML = data["city_j"]+",  "+data["country"]

       

        var countApplicant = document.getElementById("countApplicant")
        countApplicant.innerHTML = data["appNo"]+" Applicant"
        

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
        if (auth != "False"){
            button.innerHTML = '<a href="'+url+'" class="applied-button-jobs outline-none" style="text-decoration:none;margin-top: 5px; width: fit-content; padding-top: 8px; padding-bottom: 8px;">Fast Apply</a>';
        }else{
        button.innerHTML = '<a href="'+url+'" class="applied-button-jobs outline-none" style="text-decoration:none;margin-top: 5px; width: fit-content; padding-top: 8px; padding-bottom: 8px;">Apply</a>';

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


        var nul = "";

        var firstMediaQuery = window.matchMedia('(min-width: 768px');
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        var right_jobs_main_div = document.querySelector('.right-jobs-main-div');
        var jobs_left = document.querySelector('.jobs-left');
        var jobs_buttons = document.querySelector('.jobs-buttons');
        console.log("asd")
        if (mediaQuery.matches) {
                right_jobs_main_div.style.display = "none";
                jobs_left.style.display = "flex";
                jobs_buttons.style.display = "flex";
                
                var select = document.getElementById('select'+id)
                select.style.backgroundColor = "white";
                
        };
        
        
        window.onload = getNumber(nul);

