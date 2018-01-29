let backendHost;
// API version could be defined here

const hostname = window && window.location && window.location.hostname;

if (hostname === '<INSERT PRODUCTION DOMAIN HERE>') {
  backendHost = 'https://<INSERT PRODUCTION DOMAIN HERE>';
} else if (hostname === '<INSERT STAGING DOMAIN HERE>') {
  backendHost = 'https://<INSERT STAGING DOMAIN HERE>';
} else {
  backendHost = 'http://localhost:3001';
}

export const API_ROOT = `${backendHost}/api`;