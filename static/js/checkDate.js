function checkStartDate(){
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
  var start_date = document.getElementById("id_start_date").value

//   sdateError
  if (dateIsValid(start_date)){
        document.getElementById("sdateError").style.display = "none";
        document.getElementById("id_start_date").style.borderColor = "#9E9E9E";

        

    }
    else{
        document.getElementById("sdateError").style.display = "block";
        document.getElementById("id_start_date").style.borderColor = "red";
        
    }

}
function checkEndDate(){
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
      
      var end_date = document.getElementById("id_end_date").value
    
      

      if (dateIsValid(end_date)){
            document.getElementById("edateError").style.display = "none";
            document.getElementById("id_end_date").style.borderColor = "#9E9E9E";
        }
        else{
            document.getElementById("edateError").style.display = "block";
            document.getElementById("id_end_date").style.borderColor = "red";
            
        }
        
    
    }
    function checkStartYear(){
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
      
      var end_date = document.getElementById("id_start_year").value
    
      

      if (dateIsValid(end_date)){
            document.getElementById("sYear").style.display = "none";
            document.getElementById("id_start_year").style.borderColor = "#9E9E9E";
        }
        else{
            document.getElementById("sYear").style.display = "block";
            document.getElementById("id_start_year").style.borderColor = "red";
            
        }

    }
    function checkEndYear(){
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
      
      var end_date = document.getElementById("id_end_year").value
    
      

      if (dateIsValid(end_date)){
            document.getElementById("eYear").style.display = "none";
            document.getElementById("id_end_year").style.borderColor = "#9E9E9E";
        }
        else{
            document.getElementById("eYear").style.display = "block";
            document.getElementById("id_end_year").style.borderColor = "red";
            
        }

    }

    function checkBirthday(){
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
      
      var end_date = document.getElementById("id_birthday").value
    
      

      if (dateIsValid(end_date)){
            document.getElementById("birthday_id").style.display = "none";
            document.getElementById("id_birthday").style.borderColor = "#9E9E9E";
        }
        else{
            document.getElementById("birthday_id").style.display = "block";
            document.getElementById("id_birthday").style.borderColor = "red";
            
        }

    }