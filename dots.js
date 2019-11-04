const fs = require("fs");
const isLetter = require("is-letter");
const isNumber = require("is-number");

fs.readFile(process.argv[2], (err, data) => {
    let content = data.toString();
    let dots = [];
    content = content.split("\n");

    content.forEach(el => {
        let dotName = "";
        let x = "", y = "";
        let i = 0;
        let c = el[i];
        while(c !== '('){
            dotName += c;
            c = el[++i];
        }
        c = el[++i];
        while(c !== ';'){
            x += c;
            c = el[++i];
        }
        c = el[++i];
        while(c !== ')'){
            y += c;
            c = el[++i];
        }

        dots.push({ name: dotName, x: +x, y: +y});
    })



    console.log(dots);

    let min = Number.MAX_VALUE;
    let minvec = {
        name: '',
        len: min
    };
    

    for(let i = 0; i < dots.length - 1; i++){
        for(let j = i+1; j < dots.length; j++){
            let len = Math.sqrt((dots[j].x-dots[i].x)*(dots[j].x-dots[i].x) + (dots[j].y-dots[i].y)*(dots[j].y-dots[i].y));
            if (len < min){
                min = len;
                minvec.name = dots[i].name + dots[j].name;
                minvec.len = min;
            }
        }
    }
    if(minvec.len === Number.MAX_VALUE){
        minvec.len = 0;
    }
    console.log(minvec);
});