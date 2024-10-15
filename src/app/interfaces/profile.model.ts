export interface UserProfile {
  firstName: string;
  lastName: string;
  pin: string;
  address: string;
  phoneNumber: string;
  selectedGender: 'Man' | 'Woman';
  profilePicture?: any;
  identifier?: string;
  id?: string;
}
