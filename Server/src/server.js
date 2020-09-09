const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const routes = require("./routes");

const PORT = process.env.PORT || 3000;

//Generar una base en mongo para guardar los datos

const mongoCredential = "mongodb+srv://blobParty:L1nGeVCBsJY8tuuq@testcluster-c2vkw.mongodb.net/partyBlobs?retryWrites=true&w=majority";

mongoose.connect(mongoCredential, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', (() => {
    console.log("MongoDb Conectado");
}))

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', routes);

try {
    app.listen(PORT, () => {
        console.log(`Server en puerto ${PORT}`);
    })
} catch (error) {
    console.log(`Fallo en puerto ${PORT}`, error);
}