'use strict';

module.exports = function(Equipo) {
  Equipo.jugadores = function (idEquipo, idJugador, cb) {
    Equipo.findById(idEquipo, (err, equipo) => {
      if (equipo.jugadores.some(jugador => jugador === idJugador)) {
        cb('Jugador existente', null);
      } else {
        equipo.jugadores.push(idJugador);
        equipo.updateAttribute('jugadores', equipo.jugadores, (err, equipo) => {
          cb(null, equipo);
        });
      }
    })
  }

  Equipo.remoteMethod('jugadores', {
    description: 'Agregar jugadores al equipo',
    accepts: [
      {
        arg: 'idEquipo',
        type: 'string',
      },
      {
        arg: 'idJugador',
        type: 'string',
      }
    ],
    returns: {
      arg: 'equipo',
      type: 'object',  
    }
  }) 
};
