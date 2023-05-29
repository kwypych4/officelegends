import { FormInstance, Rule } from 'antd/es/form';

import { FormInputs } from './register-form.types';

type ValidationSchema = {
  [key: string]: Rule[];
};

export const getRepeatPasswordRules = (form: FormInstance<any>): Rule[] => {
  return [
    {
      validator: (_, value) =>
        value === form.getFieldValue(FormInputs.password) ? Promise.resolve() : Promise.reject(),
      message: 'Passwords do not match!',
      required: form.getFieldValue(FormInputs.password),
    },
  ];
};

export const validationSchema: ValidationSchema = {
  [FormInputs.password]: [
    {
      pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
      required: true,
      message:
        'You need provide strong password! (min. 8 characters length, with special characters and capital letters.',
    },
  ],
};
