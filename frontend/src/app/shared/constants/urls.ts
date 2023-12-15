import {environment} from '../../../environments/environment';

let BASE_URL = 'http://localhost:5000/statistic';

if (environment.production)
  BASE_URL = 'https://qa-course-work.onrender.com/statistic';

export {BASE_URL};
