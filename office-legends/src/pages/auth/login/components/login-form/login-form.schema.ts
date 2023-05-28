import { Rule } from 'antd/es/form';

import { FormInputs } from './login-form.types';

type ValidationSchema = {
  [key: string]: Rule[];
};

export const validationSchema: ValidationSchema = {
  [FormInputs.username]: [{ required: true, message: 'You need provide username' }],
  [FormInputs.password]: [{ required: true, message: 'You need provide password' }],
};
