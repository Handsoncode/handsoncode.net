module.exports = (shipit) => {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    production: {
      servers: 'deploy@142.4.202.189:22022',
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

  shipit.task('test', () => {
    shipit.remote('pwd');
  });

  shipit.blTask('deploy', ['deploy:init', 'deploy:fetch', 'deploy:update']);

  shipit.on('updated', () => {
    const path = shipit.releasePath;

    shipit.remote('cd ' + path + ' && npm install --production').then(() => {
      shipit.start(['deploy:publish', 'deploy:clean']);
    });
  });
};
