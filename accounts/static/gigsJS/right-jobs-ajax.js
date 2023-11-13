     async function getNumber(id) {

        var elements = document.getElementsByClassName('pixel'); // get all elements

        for(var i = 0; i < elements.length; i++){
            elements[i].style.backgroundColor = "white";
        }

        post_id=id


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
        console.log(JSON.stringify(data, null, 2));


        var mainJobs = false;

        if(data["FilterInUse"] == true){

        }else{

            const stateObject1 = { divVisible: "job-left" };
            history.pushState(stateObject1, null, "");

            // Set the state object for the second history.pushState call
             // Replace with the actual ID you want to use
            history.pushState({ divVisible: post_id }, null,post_id);
        }



        var auth = data["auth"]
        var element = document.getElementById("detailsRow");

        if (element) {
            var display = element.style.display;

            if (display == "none") {
                element.style.display = "flex";
            }
        }
        const mobile = window.matchMedia('(max-width: 768px)');
        if(mobile.matches){
            $('.profileHeader').css('display', 'none');
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
        if (data["Address"] != ""){
        const address_job = data["Address"]+", "+data["City"] ;


        const geocoder = new google.maps.Geocoder();
          geocoder.geocode({'address': address_job}, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                  if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {

                      const coordinates = results[0].geometry.location

                      configuration["locations"][0] = {"title":data["Position"], "address1":address_job, "coords": coordinates} // Add marker on the map
                      configuration["mapOptions"]["center"] = coordinates // Center the map to the location

                      new LocatorPlus(configuration);
                  }
              } else {
                  alert('Geocode could not find the coordinates from address. Error: ' + status);
              }
          });
          }else{

          }






        var element = document.getElementById("Position");
        element.innerHTML = data["Position"];


        var SalaryPerHour = document.getElementById("SalaryPerHour");
        SalaryPerHour.innerHTML ="$"+ data ["SalaryPerHour"].toFixed(2)+"/hour";

        var totalIncome = document.getElementById("totalIncome");
        totalIncome.innerHTML ="$"+ data ["totalIncome"].toFixed(2) +" total income";

        var Company = document.getElementById("Company");
        Company.innerHTML=data["Company"];



        let Description = document.getElementById('Description');
        Description.innerHTML=data["Description"];

        var Address = document.getElementById("Address");
        Address.innerHTML = data["Address"]+" "+data["City"]+",  "+data["Country"] +" "+ data["State"];


        var ShiftDate = document.getElementById("ShiftDate");
        ShiftDate.innerHTML = data["Start_date"]+", "+data["StartTime"] +" - "+data["EndTime"];

        


        var button = document.getElementById("button")
        var url= "apply/"+id;
        var cancelUrl= "cancel/"+id;
        var startWork = "check-in/"+id;
        if (data["hasApply"] == false){
        button.innerHTML = '<a href="'+url+'" class="right-jobs-directions-accept-job accept-job-offer-button accept-confetti" onclick="CallCanvas(event);startConfetti();" title="Accept job">Accept job</a>';
        }
        else{
            
                 button.innerHTML = "<a href='"+cancelUrl+"'class='margin-right-cancel-directions break-button-timestamp' >Cancel <a href='"+startWork+"' class='right-jobs-directions-accept-job buttons-padding' title='Start Work'>Start Work</a>"

            
        }



        var firstMediaQuery = window.matchMedia('(min-width: 768px');
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        var right_jobs_main_div = document.querySelector('.right-jobs-main-div');
        var right_jobs = document.querySelector('.right-jobs');
        var jobs_left = document.querySelector('.job-left');
        var jobs_buttons = document.querySelector('.jobs-buttons');

        if (mediaQuery.matches) {
                right_jobs_main_div.style.display = "block";
                right_jobs.style.display = "block";
                $('.header-wishes').css('display', 'none');

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

            element.style.display = "flex"
            var elements = document.getElementsByClassName('pixel'); // get all elements

            for(var i = 0; i < elements.length; i++){
                elements[i].style.backgroundColor = "white";
            }
            var Fjob = document.getElementById("Fjob");

            // Perform actions based on the result
            if (Fjob) {

              getNumber(Fjob.value);
              // Do something with the element if it exists
            } else {

              // Do something else if the element doesn't exist
            }


        } else {
            element.style.display = "flex";
            var c =document.getElementById("PostID").value;
            getNumber(c);

        }
        }

        // Create a MediaQueryList object
        const mmObj = window.matchMedia("(max-width: 768px)")

        // Call the match function at run time:
        myFunction(mmObj);

        // Add the match function as a listener for state changes:
        mmObj.addListener(myFunction)
        

        function closeButton(){
            var right_jobs_main_div = document.querySelector('.right-jobs-main-div');
            var jobs_left = document.querySelector('.job-left');
            var jobs_buttons = document.querySelector('.jobs-buttons');
            right_jobs_main_div.style.display = "none";
            jobs_buttons.style.display = "flex";
            jobs_left.style.display = "flex";
            $('.profileHeader').css('display', 'flex');
            $('.header-wishes').css('display', 'flex');
        }
        
       

