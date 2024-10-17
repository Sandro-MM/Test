export const errorMessages: { [key: string]: (error: any) => string } = {
  required: () => 'This field is required.',
  minlength: (error: any) => `Minimum length is ${error.requiredLength} characters.`,
  maxlength: (error: any) => `Maximum length is ${error.requiredLength} characters.`,
  email: () => 'Please enter a valid email address.',
  customError: (error: any) => `Custom error: ${error.details}`,
  pattern: (error: any) => `Invalid pattern. Expected format: ${error.requiredPattern}`,
  englishPattern: () => 'Only English letters are allowed.',
  pinPattern: () => 'Required Length 11 Characters Only Numbers are allowed.',
  passwordPattern: () => 'Required Length from 6 to 12 Characters Only Letters and Numbers are allowed.',
  phonePattern: () => 'Phone number Contains 9 Characters Only Numbers are allowed',
};
