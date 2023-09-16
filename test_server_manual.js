const axios = require('axios');
const { response } = require('express');
const res = require('express/lib/response');



function fazerPostagenda() {
    const agenda = {
        Medico: 'nome do medico',
        Paciente: 'nome do paciente',
        ubs: { Area: 'Nome da area' },
        Data: '9/15/2023', // Data em formato Americano
        Medicamento: 'nome do medicamento',
        Receita: 'nome da receita',
        Descrição: 'descri',
        Token: 'Token',
        Valida: true
    };
    const apiUrl = 'http://localhost:3000/criaragenda';
    axios.post(apiUrl, agenda)
        .then(response => {
            console.log('Resposta da API', response.data);

        }).catch(error => {
            console.error('erro da api', error);
        });
}

  //fazerPostagenda();

  async function Editar_final_agenda (id){
    const agenda = {
        Medicamento: 'nome do arthur',
        Receita: 'nome da arthur',
        Descrição: 'descri',
        Valida: false
    };

    try{
        
        const apiUrl = `http://localhost:3000/editar-agenda-final/${id}`;

        const response =await axios.patch(apiUrl,agenda );
        console.log(response.data);

    } catch (error) {

        console.error('Erro de API', error);
    }
  }

//Editar_final_agenda('65055e7854b7b0c2098fc295');

async function editar_dia_agenda (id){
    Dia = '9/15/2023';
    
    try{

        const apiUrl = `http://localhost:3000/upade_atualizaDia/${id}`;

        const response = await axios.patch(apiUrl, {data: Dia});
        console.log(response.data)


    }catch(error){
        console.error('Erro de Api',error);
    }  
}

editar_dia_agenda('65055d39f092db4416854868');

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

module.exports = { fazerupadate_date , fazerUpdateAgendaValida};