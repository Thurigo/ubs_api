const axios = require('axios');
const { response } = require('express');

const agenda = {
    Medico: 'nome do medico',
    Paciente: 'nome do paciente',
    ubs: { Area: 'Nome da area' },
    Data: '25/15/2023',
    Medicamento: 'nome do medicamento',
    Receita: 'nome da receita',
    Descrição: 'descri',
    Token: 'Token',
    Valida: true
};

const apiUrl = 'http://localhost:3000/criaragenda';

function fazerPostagenda() {
    axios.post(apiUrl, agenda)
        .then(response => {
            console.log('Resposta da API', response.data);

        }).catch(error => {
            console.error('erro da api', error);
        });
}

  //fazerPostagenda();

async function fazerupadate_date() {
    try {

        const response = await axios.get('http://localhost:3000/all-agendas');
        //console.log(response.data);
        return response.data;

    } catch (error) {

        console.error('Erro de API', error);
    };
    return [];
}
async function fazerUpdateAgendaValida(id) {
    try {
        
        const apiUrl = `http://localhost:3000/update_valida_agenda/${id}`;
        
        const response = await axios.patch(apiUrl, { valida: false });
      
      if (response.status === 200) {
          console.log('Agenda atualizada com sucesso.');
      } else if (response.status === 404) {
          console.log('Nenhum documento encontrado para atualização.');
        } else {
            console.log('Erro desconhecido durante a atualização.');
      }
    } catch (error) {
        console.error('Erro de API', error);
    }
}

module.exports = { fazerupadate_date , fazerPostagenda, fazerUpdateAgendaValida};