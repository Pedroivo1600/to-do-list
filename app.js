const express = require("express");
const path = require("path");

const methodOverride = require('method-override'); //O HTML5 não da suporte para enviarmos um formulário interno com put, path ou delete,

require('./config/database');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

app.use(express.static(path.join(__dirname, 'public'))); //allows us to use static pages


app.get('/', async (req, res) => {
    res.send('<h1>Testando Servidor</h1>')
})



app.listen(4444, () => {
    console.log('Servidor foi iniciado!:)');
})


