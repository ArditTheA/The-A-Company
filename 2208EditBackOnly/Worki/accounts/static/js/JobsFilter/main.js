async function getFilter(id) {
    program = document.getElementById("program")
    title = document.getElementById("title")
    company = document.getElementById("company")
    location = document.getElementById("location")
    salary = document.getElementById("salary")
    let response = await fetch('/filter',{
        method: "get",

        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": 'application/json'

        },
        data:{
            program: prog,
            title:title,
            company:company,
            location:location,
            salary:salary,
        }

    }

    

 }