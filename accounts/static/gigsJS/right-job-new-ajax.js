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


        console.log(data);
        var auth = data["auth"]
        var element = document.getElementById("detailsRow");


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

                const mediaQuery = window.matchMedia('(max-width: 767px)');

        if (!mediaQuery.matches) {
        var select = document.getElementById('select'+post_id);
        select.style.backgroundColor = "#E7F1FE";

        };

}





