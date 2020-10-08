const {io} = require('../index');


//Mensaje de socket
io.on('connection', client => {
    
    console.log('Cliente conectado');
    
    client.on('disconnect', () => { 
        console.log('Cliente desconectado')
     });

    client.on('mensaje',(payload)=>{
        console.log('Mnesaje', payload);

        io.emit('mensaje',{admin:'Nuevo mensaje'});
    }); 
  });