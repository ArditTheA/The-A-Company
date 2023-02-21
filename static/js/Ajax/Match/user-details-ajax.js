 async function getUser(id) {
        document.getElementById("sectedUser").value = id;
        console.log(id)
        let response = await fetch('',{

            method: "get",

            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": 'application/json',
                userid: id,
            }

        });

        let data =  await response.json();
        console.log(data);
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

       var button = document.getElementById("cv")

        // set the button's click event
        document.getElementById("cv").style.marginTop = "33px";
        url = "/Administrator/Users/CV/"+id
        button.innerHTML = '<a href="'+url+'" class="applied-button-jobs outline-none" style="text-decoration:none;margin-top: 18px; width: fit-content; padding-top: 8px; padding-bottom: 8px;">Download CV</a>';


        if( data["userExpCount"] != "0"){
        for (let i = 0; i < data["userExpCount"]; i++) {
          var title = "title"+i
          var company = "company"+i
          var location = "cityexp"+i
          var date = "date"+i



          $('#UserExp').append($('<div class="experience-rows-img JSAdded" id="asd"> <img class="experience-education-img" src="/static/img/worki_icons-18.jpg" alt="" title="Experience"><div class="experience-rows"><div class="experience-first-row" id="title">'+data[title]+'</div><div class="experience-second-row" id="Compexp1">'+data[company]+'</div><div class="experience-third-row" id="Locexp1">'+data[location]+'</div><div class="experience-fourth-row" id="date1">'+data[date]+'</div></div></div>'));
        }

        }



        if (data["userEduCount"]!="0"){
        for (let i = 0; i < data["userEduCount"]; i++) {
            var university = "university"+i;
            var uniField = "field"+i;
            var uniloc = "uniloc"+i
            var uniYear = "unidate"+i
            $('#UserEdu').append($('<div class="experience-rows-img JSAdded" style=""><img class="experience-education-img" src="/static/img/worki_icons-18.jpg" alt="" title="Education"><div class="experience-rows"><div class="experience-first-row" id="university">'+data[university]+'</div><div class="experience-second-row" id="uniField">'+data[uniField]+'</div><div class="experience-third-row" id="uniLoc">'+data[location]+'</div><div class="experience-fourth-row" id="uniYear">'+data[uniYear]+'</div></div></div>'));
        }



        }
        if(data["countLang"] != "0"){
        for (let i = 0; i < data["countLang"]; i++) {
            var lang = "language"+i;
            var level = "languageLevel"+i;
            console.log(data[lang]+data[level])
                 $('#UserLang').append($('<div style="" class="experience-rows-img-languages JSAdded"><div class="education-second-paragraph">'+data[lang]+'</div><div class="language-rate">'+data[level]+'</div></div></div>'));
        }

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
const mediaQuery = window.matchMedia('(max-width: 767px)');
var right_jobs_main_div = document.querySelector('.right-jobs-main-div');
var jobs_left = document.querySelector('.jobs-left');

if (mediaQuery.matches) {
right_jobs_main_div.style.display = "none";
                jobs_left.style.display = "flex";
                jobs_buttons.style.display = "flex";
}
else{
var c =document.getElementById("sectedUser").value;

getUser(c);
}
