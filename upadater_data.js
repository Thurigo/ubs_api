
const test = require('./test_server_manual.js');


function agendarChamadaAxios() {
  const dateNow = new Date();

  if (
    dateNow.getMinutes() === 39 &&
    (dateNow.getHours() === 4 || dateNow.getHours() === 5) &&
    dateNow.getSeconds() === 2
  ) {
    console.log('teste');
    test.fazerupadate_date();
  }

  setTimeout(agendarChamadaAxios, 1000);
}

agendarChamadaAxios();






