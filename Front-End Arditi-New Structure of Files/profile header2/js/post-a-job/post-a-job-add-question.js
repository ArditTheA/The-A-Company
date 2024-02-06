var question_id = id;
var choice = "ans_type"+question_id
var selected = document.getElementById(choice).value
var getName = "#idealAns"+question_id;
var setName = "idealAnsF"+question_id;
var inputText = "secondAnswer"+question_id;
//  var NumericN = "numericNumber"+question_id;


if(selected == "YesNo") {
   console.log(getName)

   var x = $('<select class="form-control '+setName+'" id='+setName+' name='+setName+'><option>Yes</option><option>No</option></select>')
   var y = $('<input type="number" name="'+setName+'" class="form-control '+setName+'" id="'+setName+'">');

   $(getName).append(x);
   $('input[name='+setName+'').css("display", "none");
   $('input[name='+inputText+'').css("display", "none");

   // $(getName).css("display", "none");          

 //   $('<input type="number" name="'+setName+'" class="form-control '+setName+'" id="'+setName+'">').css("display", "none");

}else if(selected == "Numeric") {

 var x = $('<select class="form-control '+setName+'" id='+setName+' name='+setName+'><option>Yes</option><option>No</option></select>')
 var y = $('<input type="number" name="'+setName+'" class="form-control '+setName+'" id="'+setName+'">');

 $(getName).append(y);
 $('select[name='+setName+'').css("display", "none");
 $('input[name='+inputText+'').css("display", "none");
 
   // $(getName).append($('<input type="number" name="'+setName+'" class="form-control '+setName+'" id="'+setName+'">'));


   // $('select[name="idealAnsF"]').css("display", "none");
   // $(".yesNoClass").css("display", "none");

}

//        var yesNoClass = document.querySelectorAll(".yesNoClass");
//        var NumericInput = document.querySelectorAll(".numericN");
