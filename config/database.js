const mongoose = require('mongoose');
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/todo-list', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Conectado ao MongoDb'))
    .catch((err) => console.log(err));




// mongoose.connect('mongodb://localhost/node-mongodb', {useNewUrlParser: true, useUnifiedTopology: true});
// var conn = mongoose.connection;
// conn.on('connected', function() {
//     console.log('database is connected successfully');
// });
// conn.on('disconnected',function(){
//     console.log('database is disconnected successfully');
// })
// conn.on('error', console.error.bind(console, 'connection error:'));
// module.exports = conn;

//O mongoose é o módulo que vai permitir que dentro do nosso node, a gente chame os comandos do mongo de uma forma mais fácil do 
//que simplesmente chamar console, o que é mais complicado