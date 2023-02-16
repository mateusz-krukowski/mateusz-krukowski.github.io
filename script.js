import { scales } from '/scalesModule.js';

document.addEventListener("DOMContentLoaded", function() {
    let scalesContainer = document.querySelector(".scales-container");
    scalesContainer.innerHTML = "";
});

const key = document.querySelectorAll(".key");
for (let i = 0; i < key.length; i++) {
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
        if (!clickedKeys.includes(event.currentTarget.getAttribute("data-note"))) {
            clickedKeys.push(event.currentTarget.getAttribute("data-note"));
            event.currentTarget.querySelector('p').id = "active";
            console.log(clickedKeys);
        }
        else {
            clickedKeys = clickedKeys.filter(
                item => item !== event.currentTarget.getAttribute("data-note")
            )
            event.currentTarget.querySelector('p').id = '';
        }
        let resultText = document.getElementById("result-text2");
        resultText.innerHTML = clickedKeys.join();

        // Clear the scales list
        const scalesList = document.querySelector('.scales-container');
        scalesList.innerHTML = '';

        // Add scales that contain clicked keys
        if (clickedKeys.length > 0) {
            scales.forEach(scale => {
                let containsAllNotes = clickedKeys.every(note => scale.sounds.includes(note));
                if (containsAllNotes) {
                    let scaleNode = document.createElement("li");
                    scaleNode.classList.add('scale');
                    scaleNode.innerHTML = scale.name;
                    scalesList.appendChild(scaleNode);
                }
            });
        }
    });
});
