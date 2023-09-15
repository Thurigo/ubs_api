
const test = require('./test_server_manual.js');

var i = 1




async function agendarChamadaAxios() {
  const dateNow = new Date();

  if (
    (dateNow.getHours() === 23 &&
      (dateNow.getMinutes() === 51 || dateNow.getMinutes() === 7) &&
      dateNow.getSeconds() === 2)
     ||i === 1 
  ) {
    const agenda = await test.fazerupadate_date();
    console.log('teste');
    console.log(agenda);

    agenda.forEach(element => {
      
      if(Date.parse(element.data) > dateNow){  
        console.log(Date.parse(element.data));
      }else{
        console.log('agenda valida')
      }

  });


  }

  setTimeout(agendarChamadaAxios, 1000);
}

agendarChamadaAxios();






