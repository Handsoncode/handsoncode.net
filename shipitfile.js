module.exports = (shipit) => {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    production: {
      servers: 'deploy@142.4.202.189:22022',
      workspace: '/tmp/handsoncode.net',
      deployTo: '/home/httpd/handsoncode.net',
      repositoryUrl: 'git@github.com:handsoncode/handsoncode.net.git',
      branch: 'master',
      ignores: ['.git', 'node_modules', 'shipitfile.js'],
      rsync: ['--force', '--delete', '--delete-excluded', '-I', '--stats', '--chmod=ug=rwX'],
      keepReleases: 3,
      shallowClone: true
    }
  });

  shipit.task('test', () => {
    shipit.remote('pwd');
  });

  shipit.blTask('deploy', ['deploy:init', 'deploy:fetch', 'deploy:update']);

  shipit.on('updated', () => {
    shipit.remote(`cd ${shipit.releasePath} && npm install --production`).then(() => {
      shipit.start(['deploy:publish', 'deploy:clean']);
    });
  });
};
