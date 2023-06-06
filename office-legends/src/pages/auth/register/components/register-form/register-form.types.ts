export enum FormInputs {
  username = 'username',
  password = 'password',
  repeatPassword = 'repeatPassword',
  avatar = 'avatar',
}

export type FormTypes = {
  [FormInputs.username]: string;
  [FormInputs.password]: string;
  [FormInputs.repeatPassword]: string;
  [FormInputs.avatar]: number;
};
