import monk from 'monk';
import config from './configs';

export default monk(config.DB_URI);
