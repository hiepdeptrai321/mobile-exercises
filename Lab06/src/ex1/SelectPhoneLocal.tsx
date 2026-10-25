import { PHONES } from '../data/phones';
import { SelectPhoneApp } from './SelectPhoneApp';

export function SelectPhoneLocal() {
  return <SelectPhoneApp phone={PHONES[0]} />;
}
