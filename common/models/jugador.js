'use strict';

module.exports = function(Jugador) {
 Jugador.afterRemote('findById', (context, jugador, next) => {
    if (jugador.edad >= 25) {
      jugador.tipo = 'Veterano';
    } else {
      jugador.tipo = 'Novato';
    }
    next();
 })
};
