const {io} = require('../index');
const Band = require('../models/band');

const Bands = require('../models/bands');
const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Heroes del silencio'));
bands.addBand(new Band('Metallica'));

//console.log(bands);
//Mensaje de socket
io.on('connection', client => {
    
    console.log('Cliente conectado');
    
    client.emit('active-bands',bands.getBands());

    client.on('disconnect', () => { 
        console.log('Cliente desconectado')
     });

    client.on('mensaje',(payload)=>{
        console.log('Mnesaje', payload);

        io.emit('mensaje',{admin:'Nuevo mensaje'});
    }); 

    client.on('vote-band',(payload)=>{
        bands.voteBand(payload.id);
        io.emit('active-bands',bands.getBands());
        //console.log(payload);
    });

    client.on('add-band',(payload)=>{
      // console.log(payload.name);
         const newBand= new Band(payload.name);
         bands.addBand(newBand);
         io.emit('active-bands',bands.getBands());
    });

    client.on('delete-band',(payload)=>{
        
           bands.deleteBand(payload.id);
           io.emit('active-bands',bands.getBands());
      });
  
   /*  client.on('emitir-mensaje',(payload)=>{
        //io.emit('nuevo-mensaje',payload); //Emite a todos los clientes incluso al que lo envio
        client.broadcast.emit('nuevo-mensaje',payload); //Emite solo a los clientes conectados menos al que lo emitió
    });  */ 


   /*  client.on('tareaMensaje',(payload)=>{
        //io.emit('nuevo-mensaje',payload); //Emite a todos los clientes incluso al que lo envio
        client.broadcast.emit('nuevo-mensaje',payload); //Emite solo a los clientes conectados menos al que lo emitió
    });  */ 
  });