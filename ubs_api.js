//Configuração da conexão com o banco de Dados
const {MongoClient, ServerApiVersion, ObjecId} = require ('mongodb');
const express = require('express');
const cors = require('body-parse');
const bodyParse = require('body-parse');
const { UserBindingContextImpl } = require('twilio/lib/rest/chat/v2/service/user/userBinding');

const uri = "mongodb+srv://ubs:1234@ubs-cluster.lvn4rik.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    serverApi:{
        version: ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true
    }
});

//configuração de uso do banco de Dados
const consulta = client.db("UBS")
const postinhoCollection = consulta.conllection("postinho");
const agendaCollection = consulta.conllection("agenda");
const perfilCollection = consulta.conllection("perfil");

// configuração do servidor express
const app = express();
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));
app.use(cors());

app.get('/',(req, res) => {
    res.send('Hello,world!')
});

//começo da APi



//get para login onde já identifica o Perfil
app.get('/login', async (req, res) => {
const {usuario,senha} = req.body

try{
    await client.connect();

    const user = await perfilCollection.findone({usuario, senha});

    console.log(`Pesquisando Login`);
    res.json(user);

await client.close();
}catch(error) {
    console.error(error);
    res.status(500).json({error: 'Ocorreu um erro durante a consulta.'})
}
});

//busca todas as UBS
app.get('/all-ubs', async (req, res) => {
    const {usuario,senha} = req.body
    
    try{
        await client.connect();
    
        const ubs = await postinhoCollection.findmany({}).toArray();
    
        console.log(`Pesquisando Login`);
        res.json(ubs);
        console.log('ubs');


    await client.close();
    }catch(error) {
        console.error(error);
        res.status(500).json({error: 'Ocorreu um erro durante a consulta.'})
    }
    });

//criar uma agenda
app.post('/criaragenda', async (req, res) =>{
const {
    Medico,
    Paciente,
    ubs:{Area},
    Data,
    Medicamento,
    Receita,
    Descrição,
    Token
    } = req.body

try{

    const novaAgenda = {
    medico:Medico,
    paciente:Paciente,
    ubs:{Area},
    data:Data,
    medicamento:Medicamento,
    receita:Receita,
    descrição:Descrição,
    token:Token
    }


    const new_agenda = await agendaCollection.insertOne(novaAgenda)

    console.log(`Agenda Criada com sucesso!`);
    console.log(`Contato inserido: ${novaAgenda.isnsertedId}`);

}catch(error){
console.error(error);
res.status(500).json({error: 'Ocorreu um erro durante a consulta.' });
}
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.Console(`Server is running on port ${PORT}`);
});