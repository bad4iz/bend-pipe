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
let ctx = canvas.getContext("2d");

ctx.fillStyle = "green";
ctx.fillRect(10, 10, 100, 100);

let val = document.querySelector('#val');


let cas = 0;
const RANGE = 100; // разрешение экрана


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
            return  item.num == cas - RANGE/2? {num: item.num, count: item.count + 1}: item;
        });

        // console.log(data);

        let dat = data.filter(item => {
            return ((cas - RANGE) < item.num) && ((cas + RANGE) > item.num)
        });


        ctx.clearRect(0, 0, canvas.width, canvas.height); // Очиста всего холста


        ctx.fillStyle = "red";
        ctx.fillRect(RANGE/2, 150,10 , 50);


        dat.forEach((item,i) => {
            ctx.fillStyle = "green";
            ctx.fillRect(i, 100,10 , item.count);
        });

        console.log(cas);


    }, false);
}
