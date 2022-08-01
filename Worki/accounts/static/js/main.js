async function getNumber(){
    let response = await fetch('',{
        method : "get",
        headers : {
            "X-Requested-With":"XMLHttpRequest",
            "Content-Type":'application/json'
        }
    })
    let data = await response.json()
    
    console.log(data)
    
    let ul_left = document.getElementById('left')
    let li = document.createElement('li')
    li.innerHTML = await data["number.description"]
    ul_left.appendChild(li)
}