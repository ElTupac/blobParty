const URL = "http://186.13.4.194:3000/";

const nickName = window.prompt("Ingresa tu nick");

var allBlobs;
var blobs = [];

const intervalTime = 300;

var id;

createPlayer(nickName).then(res => {
    id = res;
    setInterval(() => {
        updatePlayer(id, xPos, yPos).then(res => {
            allBlobs = res;

            //console.log(allBlobs);
            allBlobs.forEach(blob => {

                var exist = false;
                blobs.forEach(element => {
                    if(blob._id != id){
                        if(blob._id == element.id){
                            exist = true;
                            element.newXPos = blob.xPos;
                            element.newYPos = blob.yPos;
                        }
                    }
                })

                if(!exist && blob._id != id) blobs.push(new BlobPlayer(blob.name, blob._id, blob.xPos, blob.yPos));
            });

            blobs.forEach(blob => {
                var exist = false;
                allBlobs.forEach(element => {
                    if(blob.id == element._id) exist = true;
                })

                if(!exist) blob.exist = false;
            })
        });
    }, intervalTime);

    setInterval(() => {
        var j = 0;
        while(j < blobs.length){
            if(!blobs[j].exist) blobs.splice(j, 1);
            else j++;
        }
    }, 2500);
});



function createPlayer(nick){
    return fetch(`${URL}newplayer`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: `${nick}`,
            xPos: 0,
            yPos: 0
        })
    }).then(res => res.json());
}

function updatePlayer(id, xPos, yPos){
    return fetch(`${URL}${id}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            xPos: `${xPos}`,
            yPos: `${yPos}`
        })
    }).then(res => res.json());
}