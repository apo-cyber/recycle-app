module.exports = {
  apps: [{
    name: 'recycle-frontend',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/recycle-app/frontend',
    env: {
      NODE_ENV: 'production',
      COMPANY_PASSWORD: 'afp0301#',
    }
  }]
}
