const chromatic = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]
function createScale(rootNote,category){
    //order scale
    let scale = [...chromatic];
    let i = scale.indexOf(rootNote);
    while(i>0){
    scale.push(scale.shift());
    --i;
    }
    // decide if major or minor 
    if (category == "major"){
        for(let i =0;i< scale.length;i++){
            if(i==1||i==3||i==6||i==8||i==10){
                scale[i] = null;
            }
        }
    }
    else if (category == "minor"){
        for(let i =0;i< scale.length;i++){
            if(i==1||i==4||i==6||i==9||i==11){
                scale[i] = null;
            }
        }
    }
    scale = scale.filter(checkIfSound);
    return scale;
}

function checkIfSound(s){
    return s!==null;
}

export var scales = [];
for(let j = 0; j< chromatic.length; j ++){
    scales.push( {'sounds': createScale(chromatic[j], "major"), name: chromatic[j]+' major' } )
    scales.push( {'sounds': createScale(chromatic[j], "minor"), name: chromatic[j]+' minor' } )
}


