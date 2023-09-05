const axios = require('axios');
const { response } = require('express');

const agenda = {
    Medico: 'nome do medico',
    Paciente: 'nome do paciente',
    ubs:{Area:'Nome da area'},
    Data:'data;',
    Medicamento:'nome do medicamento',
    Receita:'nome da receita',
    Descrição:'descri',
    Token:'Token'
};

const apiUrl = 'http://localhost:3000/criaragenda';


axios.post(apiUrl,agenda)
    .then(reponse =>  {
        console.log('Resposta APi', response.agenda);
        
    }).catch(error => {
        console.error('erro da api' ,error);
    });