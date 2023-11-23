import { Address } from './address.model';
import { Company } from './company.model';

export interface User {
  id: number;
  address: Address;
  company: Company;
  email: string;
  name: string;
  phone: string;
  username: string;
  website: string;
}
