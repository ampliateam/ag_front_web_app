import { firebaseConfigDev } from './dev';
import { firebaseConfigTest } from './test';
import { firebaseConfigStaging } from './staging';
import { firebaseConfigProd } from './prod';

if (process.env.NODE_ENV !== 'production') {
  console.log('process.env.NODE_ENV', process.env.NODE_ENV);
}

let firebaseConfig = {};
if (['local', 'development'].includes(process.env.NODE_ENV as string)) {
  firebaseConfig = firebaseConfigDev;
} else if (process.env.NODE_ENV === 'testing') {
  firebaseConfig = firebaseConfigTest;
} else if (process.env.NODE_ENV === 'staging') {
  firebaseConfig = firebaseConfigStaging;
} else if (process.env.NODE_ENV === 'production') {
  firebaseConfig = firebaseConfigProd;
}

export default firebaseConfig;
