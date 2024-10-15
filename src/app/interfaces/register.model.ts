import {UserLogin} from './login.model';

export interface UserRegister {
  personalInfo: UserPersonalInfo,
  credentials: UserLogin
  identifier?: string;
}


export interface UserPersonalInfo {
  password: string;
  firstName: string;
  lastName: string;
  pin: string;
  address: string;
  phoneNumber: string;
  selectedGender: 'Man' | 'Woman';
  profilePicture?: any;
}
