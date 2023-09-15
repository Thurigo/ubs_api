
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
    //console.log('teste');
    // console.log(agenda);

   // test.fazerUpdateAgendaValida('65023dd66c0e42762e77b406');


   for (const element of agenda) {
    if (Date.parse(element.data) < dateNow) {
      console.log(Date.parse(element.data));
      const result = await test.fazerUpdateAgendaValida(element._id);
      console.log(result);
    } else {
      console.log('Data valida');
    }
  }
}

setTimeout(agendarChamadaAxios, 10000);
}

agendarChamadaAxios();
//test.fazerPostagenda();
//test.fazerUpdateAgendaValida('6504b682d27df1dc5617bb35')


