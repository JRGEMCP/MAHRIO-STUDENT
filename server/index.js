'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'development') {
  require('node-env-file')('.env');
  console.log('Running Development!');
}

require('mahrio').runServer(process.env, __dirname ).then( function( server ) {

  require('mahrio-header/server/routes/')( server, 'node_modules/mahrio-header/dist/');
  require('./routes')( server, 'dist/' );

  server.route({
    path: '/{any*}',
    method: 'GET',
    handler: function(req, rep){
      rep().redirect('/student/');
    }
  });
});
