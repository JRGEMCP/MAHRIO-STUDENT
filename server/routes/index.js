module.exports = function( server, publicPath ) {
  server.route({
    path: '/dashboard/assets/{any*}',
    method: 'GET',
    handler: {
      directory: {
        path: publicPath
      }
    },
    config: {
      cache: {
        expiresIn: 30 * 1000,
        privacy: 'private'
      }
    }
  });
  server.route({
    path: '/dashboard/{any*}',
    method: 'GET',
    handler: function( req, rep ) {

      rep.file(publicPath + 'index.html')
    }
  });
};

