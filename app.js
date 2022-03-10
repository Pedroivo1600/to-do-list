const express = require("express");
const path = require("path");


const methodOverride = require('method-override'); //O HTML5 não da suporte para enviarmos um formulário interno com put, path ou delete,

// require('./config/database');
require('./config/database');




const Checklist = require('./models/checklist');
const Task = require('./models/task');





const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

app.use(express.static(path.join(__dirname, 'stylesheets'))); //allows us to use static pages(our css pages)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


//----------------------------------Defining routes ---------------------------------------------

app.get('/', async (req, res) => {
    try{
        res.status(200).render('pages/index');
    } catch(error){
        console.log(error);
    }
}) //index page route ("localhost:4444/")



app.get('/checklists', async (req, res) => {
    try{
        let checklists = await Checklist.find({}).populate('tasks');
        res.status(200).render('checklists/index', {checklists: checklists})
    } catch(error){
        console.log(error)
        res.status(500).render('pages/error', {error: 'Error trying to exibit checklists'})
    }
}) //checklists route ("localhost:4444/checklists")



//-----------------------------------------------------------------------------------------------------



app.listen(4444, () => {
    console.log('Servidor foi iniciado!:)');
})


