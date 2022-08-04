async function getNumber(id) {

        var select = document.getElementById('select'+id)
        var elements = document.getElementsByClassName('pixel'); // get all elements
        for(var i = 0; i < elements.length; i++){
            elements[i].style.backgroundColor = "white";
        }
        select.style.backgroundColor = "#E7F1FE";


        let response = await fetch('',{

            method: "get",

            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": 'application/json',
                text: id,
            }

        }

        )

        let data = await response.json()

        var element = document.getElementById("detailsRow");

        if (element) {
            var display = element.style.display;

            if (display == "none") {
                element.style.display = "block";
            }
        }




        let textarea = document.getElementById('message')
        textarea.value = ""
        textarea.value += data["description"]


        var element = document.getElementById("job_title");
        element.innerHTML = data["title"]

        var city_jobs = document.getElementById("city")
        city_jobs.innerHTML = data ["city_j"]+",  "+data["country"]

        var start_date = document.getElementById("sDate")
        start_date.innerHTML = data["start_date"]+" - "+data["end_date"]

        var company = document.getElementById("company")
        company.innerHTML = data["company"]

        var salary = document.getElementById("salary")
        salary.innerHTML = data ["salary"]+"/hour"

        var typeOfWork = document.getElementById('typeOfWork')
        typeOfWork.innerHTML = data["typeOfWork"]

        var hourPerWork = document.getElementById('hourPerWork')
        hourPerWork.innerHTML = data['hourPerWork']

        var housing = document.getElementById("housing")
        housing.innerHTML = data['housing']

        var housingCost = document.getElementById("housingCost")
        housingCost.innerHTML = data["housingCost"]

        var program = document.getElementById('program')
        program.innerHTML = data["program"]

        var programCost = document.getElementById("programCost")
        programCost.innerHTML = data["programCost"]

        var posted = document.getElementById("posted")
        posted.innerHTML=data["posted"]


        var firstMediaQuery = window.matchMedia('(min-width: 768px');
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        var right_jobs_main_div = document.querySelector('.right-jobs-main-div');
        var jobs_left = document.querySelector('.jobs-left');
        var jobs_buttons = document.querySelector('.jobs-buttons');

        if (mediaQuery.matches) {
                right_jobs_main_div.style.display = "block";
                jobs_left.style.display = "none";
                jobs_buttons.style.display = "none";

        };







    }