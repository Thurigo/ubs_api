const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser'); // Corrigido
const cors = require('cors');

const uri = 'mongodb+srv://ubs:1234@ubs-cluster.lvn4rik.mongodb.net/?retryWrites=true&w=majority'; // Insira a URI do MongoDB
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

const consulta = client.db('UBS');
const postinhoCollection = consulta.collection('postinho'); // Corrigido
const agendaCollection = consulta.collection('agenda'); // Corrigido
const perfilCollection = consulta.collection('perfil'); // Corrigido

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.get('/login', async (req, res) => {
    const { usuario, senha } = req.body;

    try {
        await client.connect();

        const user = await perfilCollection.findOne({ usuario, senha });

        console.log('Pesquisando Login');
        res.json(user);

        await client.close();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro durante a consulta.' });
    }
});

app.get('/all-ubs', async (req, res) => {
    try {
        await client.connect();

        const ubs = await postinhoCollection.find({}).toArray();

        console.log('Pesquisando UBS');
        res.json(ubs);

        await client.close();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro durante a consulta.' });
    }
});


app.get('/all-agendas', async (req, res) => {
    try{
        await client.connect();

        const ubs = await agendaCollection.find({}).toArray();

        console.log('pesquisando Agenda');
        res.json(ubs);

        await client.close();
    }catch (error){
        console.error(error);
        res.status(500).json({error:'Ocorreu um erro durante a consulta'});
    }
});


app.post('/criaragenda', async (req, res) => {
    const {
        Medico,
        Paciente,
        ubs: { Area },
        Data,
        Medicamento,
        Receita,
        Descrição,
        Token
    } = req.body;

    try {
        const novaAgenda = {
            medico: Medico,
            paciente: Paciente,
            ubs: { Area },
            data: Data,
            medicamento: Medicamento,
            receita: Receita,
            descrição: Descrição,
            token: Token
        };

        const new_agenda = await agendaCollection.insertOne(novaAgenda);

        console.log('Agenda Criada com sucesso!');
        console.log(`Contato inserido: ${new_agenda.insertedId}`);

        res.json({ message: 'Agenda criada com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro durante a consulta.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
