let inputL = document.getElementById("G_inputL");
let inputword = document.getElementById("G_inputWord");
let addButton = document.getElementById("G_addButton");
let msg
    addButton.addEventListener("click",(event)=>{
        if(inputword.value.length == 0 || inputL.value.length == 0){
            event.preventDefault()
            if(document.querySelector(".G_errorMsg") == undefined){
            msg = document.createElement("span")
            msg.textContent = "Fields must have some value"
            msg.className = "G_errorMsg"
            document.querySelector(".G_addDiv").append(msg)
        }
        }else{
            console.log("moze")
        }
    })