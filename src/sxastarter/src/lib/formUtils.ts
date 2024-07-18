import { FormikHandlers, FormikProps, FormikValues } from 'formik';

interface IFieldAttrs {
  name: string;
  error: boolean;
  value: string;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
  helperText?: string;
}

export function formikFieldAttrs<V extends FormikValues>(
  field: string,
  formikProps: FormikProps<V>,
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  helperText: string = ''
): IFieldAttrs {
  const { errors, values, handleChange, handleBlur } = formikProps;

  let error = false;
  if (field in errors && errors[field]) {
    error = true;
    helperText = errors[field] as string;
  }

  const out: IFieldAttrs = {
    name: field,
    error,
    value: '',
    onChange: handleChange,
    onBlur: handleBlur,
  };

  if (field in values && values[field] !== null) {
    out.value = values[field];
  }

  if (helperText) out.helperText = helperText;

  return out;
}

export type TApiErrors = [];

export function apiErrors2Formik(errors: TApiErrors) {
  const out: { [field: string]: string } = {};

  if (Array.isArray(errors)) {
    errors.forEach((message) => (out['0'] = message));
  }

  return out;
}
