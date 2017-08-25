fetch('server.php')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // console.log(data);
        // read("mousedown", data);
        // read("mousemove", data);
        loweringLifting(data);
        rangingStep(data);
    })
    .catch( alert );



let canvas = document.getElementById("canvas");
 ctx = canvas.getContext("2d");
ctx.translate(300, 500);
ctx.rotate( 180 * Math.PI / 180);
ctx.fillStyle = "green";
ctx.fillRect(10, 10, 100, 100);

let val = document.querySelector('#val');
let range = document.querySelector('#range');


let cas = 0;
let step = 1;
let RANGE = 100/step; // разрешение экрана
const MAX = 300;



function rangingStep(data) {
range.addEventListener('change', (event)=>{
    let stepNew = event.target.value;
    let rangeTmp = Math.floor(100/stepNew);
let i =0;
    while (rangeTmp != RANGE){
        RANGE += (stepNew-step>0)? -1:1 ;

        // console.log('rangeTmp',rangeTmp);
        // console.log('RANGE',RANGE);

        // data = draw(data);

        let dat = data.filter(item => {
            return ((cas - RANGE) < item.num) && ((cas + RANGE) > item.num)
        });
        ctx.globalAlpha = 1;

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Очиста всего холста

        dat.forEach((item,i) => {
            ctx.fillStyle = "green";
            ctx.fillRect(i*stepNew, 10,10 , item.count);
        });

        ctx.shadowColor = "#bbbbbb";
        ctx.shadowBlur = 1;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;


        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "red";
        ctx.fillRect((cas<RANGE)?cas:RANGE*stepNew, -1,10 , 50);


        i++;
        if(i>100)break;
    }
        step = stepNew;
},true);
}



function loweringLifting(data) {
    document.body.addEventListener('keydown', (event)=>{
        // console.log(event.keyCode);

        switch(event.keyCode) {
            case 39:
                cas += 1;
                break;
            case 37:
                cas -= 1;
                break;
            case 38:
                cas += 1;
                break;
            case 40:
                cas -= 1;
                break;
        }

        event.preventDefault();

        data = draw(data);

        val.innerText = cas;


    }, false);
}

function draw(data) {
    data = data.map(item=>{
        return  item.num == cas ? {num: item.num, count: item.count + 1}: item;
    });

    // console.log(data);

    let dat = data.filter(item => {
        return ((cas - RANGE) < item.num) && ((cas + RANGE) > item.num)
    });
    ctx.globalAlpha = 1;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очиста всего холста

    dat.forEach((item,i) => {
        ctx.fillStyle = "green";
        ctx.fillRect(i*step, 10,10 , item.count);
    });

    ctx.shadowColor = "#bbbbbb";
    ctx.shadowBlur = 1;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;


    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "red";
    ctx.fillRect((cas<RANGE)?cas:RANGE*step, -1,10 , 50);

    // console.log(RANGE);
    // console.log(step);

return data;
}