
const test = require('./test_server_manual.js');

var i = 1




async function agendarChamadaAxios() {
  const dateNow = new Date();
  console.log(dateNow);

  if (
    (dateNow.getHours() === 18 &&
      (dateNow.getMinutes() === 2 || dateNow.getMinutes() === 5) &&
      dateNow.getSeconds() === 2)
     ||i === 1 
  ) {
    const agenda = await test.fazerupadate_date();
    //console.log('teste');
    // console.log(agenda);

   // test.fazerUpdateAgendaValida('65023dd66c0e42762e77b406');


   for (const element of agenda) {
    if (Date.parse(element.data) < dateNow && element.valida ==  true) {
     // console.log(Date.parse(element.data));
       const result = await test.fazerUpdateAgendaValida(element._id);
      console.log(result);
    } else {
      console.log('Data invalida');
    }
  
    const dataElement = new Date(element.data);
    const dataAtual = new Date();
    
    // Cria uma cópia da data atual
    const dataAtualMaisUmDia = new Date(dataAtual);
    dataAtualMaisUmDia.setDate(dataAtualMaisUmDia.getDate() - 1);
    
    if (dataElement.getDate() === dataAtualMaisUmDia.getDate() &&
        dataElement.getMonth() === dataAtualMaisUmDia.getMonth() &&
        dataElement.getFullYear() === dataAtualMaisUmDia.getFullYear()) {
      console.log('A data de element.data é exatamente 1 dia menor do que a data atual.');
    } else {
      console.log('A data de element.data não é 1 dia menor do que a data atual.');
    }


  }


  
}

setTimeout(agendarChamadaAxios, 10000);
}

agendarChamadaAxios();


// test.fazerPostagenda();
//test.fazerUpdateAgendaValida('6504b682d27df1dc5617bb35')


