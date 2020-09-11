class BlobPlayer {
    constructor(name, id, xPos, yPos){
        this.nickName = name;
        this.id = id;
        this.xPos = xPos;
        this.yPos = yPos;
        this.newXPos = xPos;
        this.newYPos = yPos;

        this.exist = true;

        this.DomBlob = this.agregarPersonaje(this.xPos, this.yPos);

        this.moveInterval = setInterval(() => {
            this.updateProgresivo();
        }, timePerMove);

        this.checkInterval = setInterval(() => {
            if(!this.exist){
                clearInterval(this.moveInterval);
                this.DomBlob.parentElement.parentElement.removeChild(this.DomBlob.parentElement);
                clearInterval(this.checkInterval);
            }
        }, 2500)
    }

    agregarPersonaje(xPos, yPos){
        const blobs = document.getElementById("party");
        const element = document.createElement("div");

        element.innerHTML = `
            <div id="${this.id}" style="position: absolute; left: ${xPos}px; top: ${yPos}px;">
                <p>${this.nickName}</p>
                <img src="../images/party_blob.gif" alt="blobBanging">
            </div>
        `

        blobs.appendChild(element);

        return document.getElementById(`${this.id}`);
    }

    updateStylePos(){
        this.DomBlob.style.left = `${this.xPos}px`;
        this.DomBlob.style.top = `${this.yPos}px`;

        return;
    }

    updateProgresivo(){
        var change = false;

        if(this.xPos > this.newXPos){
            this.xPos = this.xPos - 10;
            change = true;
        }else if(this.xPos < this.newXPos){
            this.xPos = this.xPos + 10;
            change = true;
        }

        if(this.yPos > this.newYPos){
            this.yPos = this.yPos - 10;
            change = true;
        }else if(this.yPos < this.newYPos){
            this.yPos = this.yPos + 10;
            change = true;
        }

        if(change) this.updateStylePos();

        return;
    }
}

