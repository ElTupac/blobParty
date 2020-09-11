var xPos = 0;
var yPos = 0;
const timePerMove = 25;

window.onload = () => {
    const blobNick = document.getElementById("myNick");
    blobNick.innerText = nickName;

    const myBlob = document.getElementById("myBlob");

    var direction = {left: false, right: false, up: false, down: false};

    document.addEventListener('keydown', event => {
        const keyDown = event.key;

        switch(keyDown){
            case "ArrowLeft":
                direction.left = true;
                break;

            case "ArrowRight":
                direction.right = true;
                break;

            case "ArrowUp":
                direction.up = true;
                break;

            case "ArrowDown":
                direction.down = true;
                break;

        }
    });

    document.addEventListener('keyup', event => {
        const keyUp = event.key;

        switch(keyUp){
            case "ArrowLeft":
                direction.left = false;
                break;

            case "ArrowRight":
                direction.right = false;
                break;

            case "ArrowUp":
                direction.up = false;
                break;

            case "ArrowDown":
                direction.down = false;
                break;

        }
    });

    setInterval(() => {
        if((direction.left || direction.right) && !(direction.left && direction.right)){
            if(direction.left && xPos > 0) {
                xPos = xPos - 10;
            }else if(direction.right){
                xPos = xPos + 10;
            }
        }

        if((direction.up || direction.down) && !(direction.up && direction.down)){
            if(direction.up && yPos > 0){
                yPos = yPos - 10;
            }else if(direction.down){
                yPos = yPos + 10;
            }
        }

        myBlob.style.left = `${xPos}px`;
        myBlob.style.top = `${yPos}px`;
    }, timePerMove);
}