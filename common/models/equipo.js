'use strict';

module.exports = function(Equipo) {
  Equipo.observe('before save', (context, next) => {
    if (context.instance) {
      context.instance.updated = new Date();
    }
    next();
  })

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
  Equipo.listarJugadores = function (idEquipo, cb) {
    Equipo.findById(idEquipo, (err, equipo) => {
      Equipo.app.models.Jugador.find({
        where: {
          id: {
            inq: equipo.jugadores
          }
        }
      }, (err, jugadores) => {
        cb(null, jugadores);
      })
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
      arg: 'jugadores',
      type: 'object',  
    }
  })
  
  Equipo.remoteMethod('listarJugadores', {
    description: 'Mostrar jugadores del equipo',
    http: {
      path: '/:idEquipo/jugadores',
      verb: 'get',
    },
    accepts: [
      {
        arg: 'idEquipo',
        type: 'string',
      },
    ],
    returns: {
      arg: 'jugadores',
      type: 'object', 
    }
  })
};
