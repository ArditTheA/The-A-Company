function checkForm(){
    var job_title=document.getElementById("id_job_title").value
    var company = document.getElementById("id_company").value
    var country_j = document.getElementById("id_country_j").value
    var city_j = document.getElementById("id_city_j").value
    var salary_per_hour = document.getElementById("id_salary_per_hour").value
    var type_of_work = document.getElementById("id_type_of_work").value
    var hour_per_work = document.getElementById("id_hour_per_work").value
    var start_date = document.getElementById("id_start_date").value
    var end_date = document.getElementById("id_end_date").value
    var housing = document.getElementById("id_housing").value
    var housing_cost_per_week =document.getElementById("id_housing_cost_per_week").value
    var program =document.getElementById("id_program").value
    var programCost =document.getElementById("id_programCost").value
    var id_logo =document.getElementById("id_logo").value

    var next_Button = document.querySelector('.next-button');
    var next_none = document.querySelectorAll('.next-none');
    var second_next_none = document.querySelectorAll('.second-next-none');
    var main_conatiner = document.querySelector('.register-form');
    function dateIsValid(dateStr) {
        const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      
        if (dateStr.match(regex) === null) {
          return false;
        }
      
        const [day, month, year] = dateStr.split('/');
      
        const isoFormattedStr = `${year}-${month}-${day}`;
      
        const date = new Date(isoFormattedStr);
      
        const timestamp = date.getTime();
      
        if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
          return false;
        }
      
        return date.toISOString().startsWith(isoFormattedStr);
      }
    function onlySpaces(str) {
        return str.trim().length != 0;
    }


    if ( job_title != "" && onlySpaces(job_title) && company !="" && onlySpaces(company) && country_j !="" && onlySpaces(country_j) && city_j !="" && onlySpaces(city_j) && salary_per_hour !=""  && type_of_work != "" && hour_per_work != "" && dateIsValid(start_date) && dateIsValid(end_date) && housing !="" && housing_cost_per_week != "" &&  program != "" && programCost != "" && id_logo !="" ){

        for (let i = 0; i < next_none.length; i++) {

            next_Button.addEventListener('click', function() {

                next_none[i].style.display = "none";

                second_next_none[i].style.display = "block";

                main_conatiner.style.width = "100%";
            });
        };

    
    }
    else{
        if (job_title != ""){
            document.getElementById("JtitleErr").style.display = "none";
            document.getElementById("id_job_title").style.borderColor = "#9E9E9E";
        }
        if (company != ""){
            document.getElementById("CompErr").style.display = "none";
            document.getElementById("id_company").style.borderColor = "#9E9E9E";
        }
        if(country_j != "" ){
            document.getElementById("CountryErr").style.display = "none";
            document.getElementById("id_country_j").style.borderColor = "#9E9E9E";
        }
        if(city_j != ""){
            document.getElementById("CityErr").style.display = "none";
            document.getElementById("id_city_j").style.borderColor = "#9E9E9E";
        }
        if(salary_per_hour != ""){
            document.getElementById("SalErr").style.display = "none";
            document.getElementById("id_salary_per_hour").style.borderColor = "#9E9E9E";
        }
        if(type_of_work != ""){
            document.getElementById("TypeErr").style.display = "none";
            document.getElementById("id_type_of_work").style.borderColor = "#9E9E9E";
        }
        if(hour_per_work != ""){
            document.getElementById("HourErr").style.display = "none";
            document.getElementById("id_hour_per_work").style.borderColor = "#9E9E9E";
        }
        if(housing != ""){
            document.getElementById("HousingErr").style.display = "none";
            document.getElementById("id_housing").style.borderColor = "#9E9E9E";
        }
        if(housing_cost_per_week != ""){
            document.getElementById("HousingCoErr").style.display = "none";
            document.getElementById("id_housing_cost_per_week").style.borderColor = "#9E9E9E";
        }
        if(program != ""){
            document.getElementById("ProgErr").style.display = "none";
            document.getElementById("id_program").style.borderColor = "#9E9E9E";
        }
        if(programCost != ""){
            document.getElementById("ProgCoErr").style.display = "none";
            document.getElementById("id_programCost").style.borderColor = "#9E9E9E";
        }
        if(id_logo != ""){
            document.getElementById("ImgErr").style.display = "none";
            document.getElementById("logos_id").style.borderColor = "#9E9E9E";
        }
        if(start_date != ""){
            document.getElementById("SDErr").style.display = "none";
            document.getElementById("id_start_date").style.borderColor = "#9E9E9E";
        }

        if(end_date !=""){
            document.getElementById("EdErr").style.display = "none";
            document.getElementById("id_end_date").style.borderColor = "#9E9E9E";
        }


    }
}
function checkFormButton(){
    var job_title=document.getElementById("id_job_title").value
    var company = document.getElementById("id_company").value
    var country_j = document.getElementById("id_country_j").value
    var city_j = document.getElementById("id_city_j").value
    var salary_per_hour = document.getElementById("id_salary_per_hour").value
    var type_of_work = document.getElementById("id_type_of_work").value
    var hour_per_work = document.getElementById("id_hour_per_work").value
    var start_date = document.getElementById("id_start_date").value
    var end_date = document.getElementById("id_end_date").value
    var housing = document.getElementById("id_housing").value
    var housing_cost_per_week =document.getElementById("id_housing_cost_per_week").value
    var program =document.getElementById("id_program").value
    var programCost =document.getElementById("id_programCost").value
    var id_logo =document.getElementById("id_logo").value
    console.log(id_logo);
    function onlySpaces(str) {
        return str.trim().length != 0;
    }
        if (job_title != "" && onlySpaces(job_title)){
            document.getElementById("JtitleErr").style.display = "none";
            document.getElementById("id_job_title").style.borderColor = "#9E9E9E";
        }
        else{
            window.scrollTo({ top: 0, behavior: 'smooth' });
            document.getElementById("JtitleErr").style.display = "block";
            document.getElementById("id_job_title").style.borderColor = "red";
        }
        if (company != "" &&  onlySpaces(company)){

            document.getElementById("CompErr").style.display = "none";
            document.getElementById("id_company").style.borderColor = "#9E9E9E";
        }
        else{
            window.scrollTo({ top: 0, behavior: 'smooth' });
            document.getElementById("CompErr").style.display = "block";
            document.getElementById("id_company").style.borderColor = "red";
        }
        if(country_j != "" && onlySpaces(country_j)){

            document.getElementById("CountryErr").style.display = "none";
            document.getElementById("id_country_j").style.borderColor = "#9E9E9E";
        }else{
                    window.scrollTo({ top: 0, behavior: 'smooth' });

            document.getElementById("CountryErr").style.display = "block";
            document.getElementById("id_country_j").style.borderColor = "red";
        }
        if(city_j != "" && onlySpaces(city_j)){
            document.getElementById("CityErr").style.display = "none";
            document.getElementById("id_city_j").style.borderColor = "#9E9E9E";
        }else{
                    window.scrollTo({ top: 0, behavior: 'smooth' });

            document.getElementById("CityErr").style.display = "block";
            document.getElementById("id_city_j").style.borderColor = "red";
        }
        if(salary_per_hour != ""){
            document.getElementById("SalErr").style.display = "none";
            document.getElementById("id_salary_per_hour").style.borderColor = "#9E9E9E";
        }else{
                    window.scrollTo({ top: 0, behavior: 'smooth' });

            document.getElementById("SalErr").style.display = "block";
            document.getElementById("id_salary_per_hour").style.borderColor = "red";
        }
        if(type_of_work != ""){
            document.getElementById("TypeErr").style.display = "none";
            document.getElementById("id_type_of_work").style.borderColor = "#9E9E9E";
        }else{
            document.getElementById("TypeErr").style.display = "block";
            document.getElementById("id_type_of_work").style.borderColor = "red";
        }
        if(hour_per_work != ""){
            document.getElementById("HourErr").style.display = "none";
            document.getElementById("id_hour_per_work").style.borderColor = "#9E9E9E";
        }else{
            document.getElementById("HourErr").style.display = "block";
            document.getElementById("id_hour_per_work").style.borderColor = "red";
        }
        if(housing != ""){
            document.getElementById("HousingErr").style.display = "none";
            document.getElementById("id_housing").style.borderColor = "#9E9E9E";
        }else{
            document.getElementById("HousingErr").style.display = "block";
            document.getElementById("id_housing").style.borderColor = "red";
        }
        if(housing_cost_per_week != ""){
            document.getElementById("HousingCoErr").style.display = "none";
            document.getElementById("id_housing_cost_per_week").style.borderColor = "#9E9E9E";
        }else{
            document.getElementById("HousingCoErr").style.display = "block";
            document.getElementById("id_housing_cost_per_week").style.borderColor = "red";
        }
        if(program != ""){
            document.getElementById("ProgErr").style.display = "none";
            document.getElementById("id_program").style.borderColor = "#9E9E9E";
        }else{
            document.getElementById("ProgErr").style.display = "block";
            document.getElementById("id_program").style.borderColor = "red";
        }
        if(programCost != ""){
            document.getElementById("ProgCoErr").style.display = "none";
            document.getElementById("id_programCost").style.borderColor = "#9E9E9E";
        }else{
            document.getElementById("ProgCoErr").style.display = "block";
            document.getElementById("id_programCost").style.borderColor = "red";
        }
        if(id_logo != ""){
            document.getElementById("ImgErr").style.display = "none";
            document.getElementById("logos_id").style.borderColor = "#9E9E9E";
        }else{
            document.getElementById("ImgErr").style.display = "block";
            document.getElementById("logos_id").style.border = "0.5px solid red";
        }
        if(start_date != ""){
            document.getElementById("SDErr").style.display = "none";
            document.getElementById("id_start_date").style.borderColor = "#9E9E9E";
        }
        else{
            document.getElementById("SDErr").style.display = "block";
            document.getElementById("id_start_date").style.borderColor = "red";
        }
        if(end_date !=""){
            document.getElementById("EdErr").style.display = "none";
            document.getElementById("id_end_date").style.borderColor = "#9E9E9E";
        }else{
            document.getElementById("EdErr").style.display = "block";
            document.getElementById("id_end_date").style.borderColor = "red";
        }
}