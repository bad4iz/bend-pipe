fetch('server.php')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // console.log(data);
        // read("mousedown", data);
        // read("mousemove", data);
        loweringLifting(data);
    })
    .catch( alert );



let canvas = document.getElementById("canvas");
 ctx = canvas.getContext("2d");
ctx.translate(300, 500);
ctx.rotate( 180 * Math.PI / 180);
ctx.fillStyle = "green";
ctx.fillRect(10, 10, 100, 100);

let val = document.querySelector('#val');


let cas = 0;
const RANGE = 100; // разрешение экрана
const MAX = 300;

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
            ctx.fillRect(i, 10,10 , item.count);
        });

        ctx.shadowColor = "#bbbbbb";
        ctx.shadowBlur = 1;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;


        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "red";
        ctx.fillRect(cas>100?RANGE:cas, -1,10 , 50);


        val.innerText = cas;


    }, false);
}

