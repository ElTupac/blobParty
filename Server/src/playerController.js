const Blob = require('./blobSchema');

const MaxTimeOut = 6000;

var allBlobs;
autoTimeOut();

module.exports = {
    async newPlayer(req, res){
        var data = req.body;

        const newTime = timeNow();

        const nuevo = new Blob({
            name: data.name,
            xPos: data.xPos,
            yPos: data.yPos,
            time: newTime
        });

        nuevo.save(nuevo);
        console.log(`Created ${data.name}`);
        return res.json(nuevo._id);
    },

    async updatePlayer(req, res){
        var data = req.body;

        const newTime = timeNow()

        try {
            await Blob.updateOne({_id: req.params.theid}, {
                $set: {
                    xPos: data.xPos,
                    yPos: data.yPos,
                    time: newTime
                }
            });

            return res.json(allBlobs);
        } catch (error) {
            console.log(error);
            return res.status(500);
        }
    }
}

function timeNow(){
    const date = new Date();
    const days = 1000 * 60 * 60 * 24;
    return (date.getTime() % days);
};

function deleteBlob(blobId){
    Blob.findByIdAndDelete(blobId, (err, doc) => {
        if(err){
            console.log(err);
        }else{
            console.log(`Deleted ${blobId}`);
        }
    });

    return;
};

function autoTimeOut(){
    setTimeout(()=> {
        Blob.find()
        .then(blobs => {
            const time = timeNow();

            var i = 0;
            while(i < blobs.length){
                if((time - blobs[i].time) > MaxTimeOut){
                    deleteBlob(blobs[i]._id);
                    blobs.splice(i, 1);
                }else{
                    i++;
                }
            };

            allBlobs = blobs;
        });


        autoTimeOut();
    }, 200);
}