import { initObject } from '@/src/features/setup/useSetup';
import { Setter } from '@/src/types';
import Amounts from './Amounts';
import Intro from './Intro';
import Rate from './Rate';



const steps = (object: initObject, setObject: Setter<initObject>) => [
  <Intro key={0} object={object} setObject={setObject} />, <Amounts key={2} object={object} setObject={setObject} />, <Rate key={3} object={object} setObject={setObject} />
]

export default steps;