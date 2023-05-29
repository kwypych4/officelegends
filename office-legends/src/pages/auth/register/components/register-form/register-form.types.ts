export enum FormInputs {
  username = 'username',
  password = 'password',
  repeatPassword = 'repeatPassword',
}

export type FormTypes = {
  [FormInputs.username]: string;
  [FormInputs.password]: string;
  [FormInputs.repeatPassword]: string;
};
