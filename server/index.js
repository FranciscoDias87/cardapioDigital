const express = require('express');
const cors = require('cors');
const PORT = 3000;

const app = express();

//Middleware JSON e CORS
app.use(express.json());
app.use(cors());


app.listen(PORT, function(){
    console.log(`Servidor rodando na ${PORT}`);
});