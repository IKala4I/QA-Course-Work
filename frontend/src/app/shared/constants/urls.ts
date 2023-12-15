import {environment} from '../../../environments/environment';

let BASE_URL = 'http://localhost:5000/statistic';

if (environment.production)
  BASE_URL = '';

export {BASE_URL};
