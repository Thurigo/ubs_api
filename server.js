const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const uri = 'mongodb+srv://ubs:1234@ubs-cluster.lvn4rik.mongodb.net/?retryWrites=true&w=majority'; 
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

const consulta = client.db('UBS');
const postinhoCollection = consulta.collection('postinho');
const agendaCollection = consulta.collection('agenda_consulta');
const perfilCollection = consulta.collection('perfil');
const remedioCollection = consulta.collection('remedio');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.get('/login', async (req, res) => {
    const { usuario, senha } = req.query;

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


app.get('/pesquisa_remedio', async (req, res) => {
    const{remedio} = req.query;
    
    try {
        await client.connect();

        console.log('Pesquiando remedio')

        const regex = new RegExp(remedio, 'i');
        const resultado = await remedioCollection.find({ nome: { $regex: regex } }).toArray();


        console.log('pesquisando do remedio')
        res.json(resultado);

        await client.close();



    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Ocorreu um erro durante a consulta'})
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

app.patch('/update_valida_agenda/:id', async (req,res) => {
    const id = req.params.id;

    try{
        await client.connect();

        const result = await agendaCollection.updateOne(
            {_id: new ObjectId(id)},
            {$set:{valida: false}}
        
        )

        if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'Dados atualizados com sucesso.' });
          } else {
            res.status(404).json({ message: 'Nenhum documento encontrado para atualização.' });
          }
      
          await client.close();
    }catch (error)  {
        console.error(error)
        res.status(500).json({ error: 'Ocorreu um erro durante a atualização dos dados.' });
    }
});


app.patch('/upade_atualizaDia/:id', async (req,res) => {
    const id = req.params.id;
    const DataNova = req.body;

    try{
        await client.connect();

        const atualizado = await agendaCollection.updateOne(
            {_id: new ObjectId(id)},
            {$set:{data: DataNova}}
        );
        if(atualizado.modifiedCount > 0){
            res.status(200).json({message: 'Dados Atualizados'});
        }else{
            res.status(404).json({message:'nenhum documento encontrado'});
        }

        await client.close();
    }catch(error){
        console.error(error);
        res.status(500).json({error:'Ocorreu um erro durante a atualização dos dados'})
    }
});

app.get('/all-remedio', async (req, res) => {
    try{
        await client.connect();
        
        const ubs = await remedioCollection.find({}).toArray();

        console.log('pesquisando remedio');
        res.json(ubs);

        await client.close();
    }catch(error){
        console.error(error);
        res.status(500).json({error:'Ocorreu um erro durante a consulta'});
    }
});

app.patch('/editar-agenda-final/:id', async (req, res) => {
  const id = req.params.id
  const {
    Medicamento,
    Receita,
    Descrição,
    Valida
} = req.body;

try {

    const editadAgenda = {
        medicamento: Medicamento,
        receita: Receita,
        descrição: Descrição,
        valida: Valida
    };
        await client.connect();
        
        const atualizaagenda = await agendaCollection.updateOne(
            {_id: new ObjectId(id)},
            {$set:editadAgenda}
        )
        if(atualizaagenda.modifiedCount > 0){
            res.status(200).json({message: 'Dados Atualizados'});
        }else{
            res.status(404).json({message: 'Nenhum documento encontrado'});
        }

        await client.close();
    }catch (error){
        console.error(error);
        res.status(500).json({erro: 'ocorreu um erro'});
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
        Token,
        Valida
    } = req.body;

    try {

        const novaAgenda = {
            medico: Medico,
            paciente: Paciente,
            ubs: { Area },
            data: new Date(Data),
            medicamento: Medicamento,
            receita: Receita,
            descrição: Descrição,
            token: Token,
            valida: Valida
        };
        
        await client.connect();
        const new_agenda = await agendaCollection.insertOne(novaAgenda);

        console.log('Agenda Criada com sucesso!');
        console.log(`Contato inserido: ${new_agenda.insertedId}`);

        res.json({ message: 'Agenda criada com sucesso!' });
        await client.close();

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro durante a consulta.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
