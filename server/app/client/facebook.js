const nconf         = require('nconf');
const https        	= require('https');

const appToken   = nconf.get('social:fb:app_token');
const host        = nconf.get('social:fb:host');
const debugPath   = nconf.get('social:fb:debug');
const profilePath = nconf.get('social:fb:profile');

class FacebookClient {
  debug(inputToken) {
    const apiPath = `${debugPath}?access_token=${appToken}&input_token=${inputToken}`;
    return this.exec(apiPath);
  }

  getFbData(accessToken, userId) {
    const apiPath = `${profilePath + userId}?access_token=${accessToken}`;
    return this.exec(apiPath);
  }

  exec(apiPath) {
    return new Promise((resolve, reject) => {
      const options = {
        host,
        port: 443,
        path: apiPath,
        method: 'GET',
      };

      let buffer = '';
      const request = https.get(options, (result) => {
        result.setEncoding('utf8');
        result.on('data', (chunk) => {
          buffer += chunk;
        });

        result.on('end', () => {
          resolve(JSON.parse(buffer));
        });
      });

      request.on('error', () => {
        reject(new Error('Something has happened while try to connect with facebook.'));
      });

      request.end();
    });
  }
}

module.exports = new FacebookClient();
