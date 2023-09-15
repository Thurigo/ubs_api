
const test = require('./test_server_manual.js');

var i = 1




async function agendarChamadaAxios() {
  const dateNow = new Date();

  if (
    (dateNow.getHours() === 23 &&
      (dateNow.getMinutes() === 51 || dateNow.getMinutes() === 7) &&
      dateNow.getSeconds() === 2)
    // ||i === 1 
  ) {
    const agenda = await test.fazerupadate_date();
    console.log('teste');
    //console.log(agenda);

    agenda.forEach(element => {
      console.log('123', element);
  });


  }

  setTimeout(agendarChamadaAxios, 1000);
}

agendarChamadaAxios();






