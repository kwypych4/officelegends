export enum FormInputs {
  username = 'username',
  password = 'password',
}

export type FormTypes = {
  [FormInputs.username]: string;
  [FormInputs.password]: string;
};
