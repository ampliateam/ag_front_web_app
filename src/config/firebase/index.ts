import { firebaseConfigDev } from "./dev";
import { firebaseConfigTest } from "./test";
import { firebaseConfigProd } from "./prod";

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

let firebaseConfig = {};
if (['local', 'development'].includes(process.env.NODE_ENV as string)) {
  firebaseConfig = firebaseConfigDev;
} else if (process.env.NODE_ENV === 'testing') {
  firebaseConfig = firebaseConfigTest;
} else if (process.env.NODE_ENV === 'production') {
  firebaseConfig = firebaseConfigProd;
}

export default firebaseConfig;
