const express = require("express");
const path = require("path");


const methodOverride = require('method-override'); //O HTML5 não da suporte para enviarmos um formulário interno com put, path ou delete,

// require('./config/database');
require('./config/database');




const Checklist = require('./models/checklist');
const Task = require('./models/task');





const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true})) //middleware para método post de formulário
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

app.get('/checklists/new', async (req, res) => {
    try{
        let checklist = new Checklist();
        res.status(200).render('checklists/new', { checklist: checklist });
    } catch (error) {
        res.status(500).render('pages/error', {error: 'Erro ao carregar o formulário'})
    }
})

app.post('/checklists', async (req, res) => {
    let { name } = req.body.checklist;

    let checklist = new Checklist({ name });

    try {
        await checklist.save();
        res.redirect('/checklists');
    } catch (error) {
        res.status(422).render('pages/error', {error: error});
    }

})

app.get('/checklists/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id).populate('tasks');
        res.status(200).render('checklists/show', {checklist: checklist})
    } catch (error) {
        res.status(500).render('pages/error', {error: 'Erro ao exibir tarefas!'})
    }
})

app.get('/checklists/:id/edit', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id).populate('tasks') //incluindo as tasks já associadas com a funcao populate
        res.status(200).render('checklists/edit', {checklist: checklist})
    } catch (error) {
        res.status(422).render('pages/error', {error: 'Falha ao exibir form de edição do título'})
    }
})

app.put('/checklists/:id', async (req, res) => {
    let {name} = req.body.checklist;
    let checklist = await Checklist.findById(req.params.id);

    try {
        await checklist.update({name});
        res.redirect('/checklists');
    } catch (error) {
        console.log(error)
    }
})



//-----------------------------------------------------------------------------------------------------



app.listen(4444, () => {
    console.log('Servidor foi iniciado!:)');
})


