import {scales} from '/scalesModule.js';

//adding the <p> tag inside every .key element
const key = document.querySelectorAll(".key");
for(let i = 0; i < key.length; i++){
    console.log(key[i].getAttribute("data-note"));
    let node = document.createElement("P"); 
    let textnode = document.createTextNode(key[i].getAttribute("data-note")); 
    node.appendChild(textnode); 
    key[i].appendChild(node);  
}

const keys = document.querySelectorAll('.key');
var clickedKeys = [];
keys.forEach(element => {
    element.addEventListener('click', event => {
        //console.log(event.currentTarget.getAttribute("data-note"));

        //if key not in array, add it and color the key, if present in the array, remove it and decolor
        if(!clickedKeys.includes(event.currentTarget.getAttribute("data-note"))){ 
            clickedKeys.push(event.currentTarget.getAttribute("data-note"));
            event.currentTarget.querySelector('p').id = "active"; 
            console.log(clickedKeys);
        }
        else{
            clickedKeys = clickedKeys.filter(
                item=>item!==event.currentTarget.getAttribute("data-note")
                )
                event.currentTarget.querySelector('p').id = '';    
        }
        let resultText = document.getElementById("result-text2");
        
        resultText.innerHTML = clickedKeys.join();
       
        //render all scale-boxes that have exactly the same sounds in it as clicked keys 
        
    });
});


var result = document.querySelector("li")
result.innerHTML = scales[1].sounds;
console.log(scales);
