module.exports = function( server, publicPath ) {
  server.route({
    path: '/student/assets/{any*}',
    method: 'GET',
    handler: {
      directory: {
        path: publicPath
      }
    }
  });

  server.route({
    path: '/student/{any*}',
    method: 'GET',
    handler: function( req, rep ) {

      rep.file(publicPath + 'index.html')
    }
  });
};

