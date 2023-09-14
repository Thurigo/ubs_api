const axios = require('axios');
const { response } = require('express');

const agenda = {
    Medico: 'nome do medico',
    Paciente: 'nome do paciente',
    ubs:{Area:'Nome da area'},
    Data:'11/09/2001',
    Medicamento:'nome do medicamento',
    Receita:'nome da receita',
    Descrição:'descri',
    Token:'Token',
    Valida:true
};

const apiUrl = 'http://localhost:3000/criaragenda';

function fazerPostagenda(){
axios.post(apiUrl,agenda)
    .then(reponse =>  {
        console.log('Resposta APi', response.agenda);
        
    }).catch(error => {
        console.error('erro da api' ,error);
    });
}

// fazerPostagenda

function fazerupadate_date() {
    axios.get('http://localhost:3000/all-agendas')
      .then(response => {
        console.log('Resposta API', response.data);
      })
      .catch(error => {
        console.error('Erro de API', error);
      });
  }

  module.exports = { fazerupadate_date };