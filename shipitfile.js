module.exports = function(shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    production: {
      servers: '142.4.202.189',
      workspace: '/tmp/handsoncode.net',
      deployTo: '/home/httpd/handsoncode.net',
      repositoryUrl: 'https://github.com/handsoncode/handsoncode.net.git',
      branch: 'master',
      ignores: ['.git', 'node_modules', 'shipitfile.js'],
      rsync: ['--force', '--delete', '--delete-excluded', '-I', '--stats', '--chmod=ug=rwX'],
      keepReleases: 3,
      shallowClone: false
    }
  });

  shipit.task('test', function() {
    shipit.remote('pwd');
  });

  shipit.blTask('deploy', ['deploy:init', 'deploy:fetch', 'deploy:update']);

  shipit.on('updated', function() {
    var path = shipit.releasePath;

    shipit.remote('cd ' + path + ' && npm install --production').then(function() {
      return shipit.remote('cd ' + path + ' && grunt build');

    }).then(function() {
      shipit.start(['deploy:publish', 'deploy:clean']);
    });
  });
};