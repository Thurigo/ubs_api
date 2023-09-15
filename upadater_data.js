
const test = require('./test_server_manual.js');

var i = 1




async function agendarChamadaAxios() {
  const dateNow = new Date();

  if (
    (dateNow.getHours() === 18 &&
      (dateNow.getMinutes() === 2 || dateNow.getMinutes() === 5) &&
      dateNow.getSeconds() === 2)
     ||i === 1 
  ) {
    const agenda = await test.fazerupadate_date();
   
}

setTimeout(agendarChamadaAxios, 10000);
}

agendarChamadaAxios();
//test.fazerPostagenda();
//test.fazerUpdateAgendaValida('6504b682d27df1dc5617bb35')


