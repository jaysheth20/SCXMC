import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useCallback } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as Yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useI18n } from 'next-localization';

import ErrorSummary from 'src/components/ErrorSummary';
import { formikFieldAttrs, apiErrors2Formik } from 'src/lib/formUtils';
import { creatSitcoreIdentityUser, register } from 'src/services/AccountService';
import { submitGoal } from 'src/services/TrackingService';

interface RegisterFormValues {
  LoginAfterRegistration: boolean;
  Password: string;
  ConfirmPassword: string;
  Email: string;
  Gender: string;
  FirstName: string;
  LastName: string;
  Company: string;
  Newsletter: boolean;
  DateOfBirthDay: number;
  DateOfBirthMonth: number;
  DateOfBirthYear: number;
  CustomerId: string;
}

const Register = () => {
  const { t } = useI18n();
  const router = useRouter();
  const signupSchema = Yup.object().shape({
    FirstName: Yup.string().required('First Name Required'),
    LastName: Yup.string().required('Last Name Required'),
    Email: Yup.string().email('Invalid email').required('Required'),
    Password: Yup.string().required('Password is required').min(6, 'At least 6 characters'),
    ConfirmPassword: Yup.string()
      .required('Confrim Password is required')
      .oneOf([Yup.ref('Password')], 'Passwords must match'),
    Company: Yup.string().required('Company name is required'),
  });
  const initialValues: RegisterFormValues = {
    LoginAfterRegistration: true,
    Password: '',
    ConfirmPassword: '',
    Email: '',
    Gender: '',
    FirstName: '',
    LastName: '',
    Company: '',
    Newsletter: true,
    DateOfBirthDay: 0,
    DateOfBirthMonth: 0,
    DateOfBirthYear: 0,
    CustomerId: '',
  };

  const useSubmitRegisterForm = () => {
    const onSubmit = useCallback(
      (
        values: RegisterFormValues,
        { setSubmitting, setErrors }: FormikHelpers<RegisterFormValues>
      ) => {
        values.DateOfBirthMonth = values.DateOfBirthMonth + 1;
        register(values)
          .then(function (response) {
            values.CustomerId = response.data.CustomerId;
            creatSitcoreIdentityUser(values).then(function () {
              submitGoal('Register');
            });
            router.push('/login');
          })
          .catch(({ response: { data } }) => setErrors(apiErrors2Formik(data.Errors)))
          .finally(() => setSubmitting(false));
      },
      []
    );
    return {
      onSubmit,
    };
  };
  const { onSubmit } = useSubmitRegisterForm();

  return (
    <section className="form-page">
      <div className="container">
        <div className="back-button-section">
          <Link href="/">
            <i className="icon-left"></i>
            {t('back-to-store')}
          </Link>
        </div>

        <div className="form-block">
          <h2 className="form-block__title">{t('create-account')}</h2>
          <Formik initialValues={initialValues} validationSchema={signupSchema} onSubmit={onSubmit}>
            {(formikProps) => (
              <Form noValidate className={'form'}>
                <ErrorSummary />
                <div className={'my-3'}>
                  <TextField
                    label={'First Name'}
                    type={'text'}
                    required={true}
                    fullWidth
                    {...formikFieldAttrs<RegisterFormValues>('FirstName', formikProps)}
                  />
                </div>
                <div className={'my-3'}>
                  <TextField
                    label={'Last Name'}
                    type={'text'}
                    required={true}
                    fullWidth
                    {...formikFieldAttrs<RegisterFormValues>('LastName', formikProps)}
                  />
                </div>
                <div className={'my-3'}>
                  <TextField
                    label={'Email'}
                    type={'email'}
                    required={true}
                    fullWidth
                    {...formikFieldAttrs<RegisterFormValues>('Email', formikProps)}
                  />
                </div>
                <div className={'my-3'}>
                  <TextField
                    label={'Password'}
                    type={'password'}
                    required={true}
                    fullWidth
                    {...formikFieldAttrs<RegisterFormValues>('Password', formikProps)}
                  />
                </div>
                <div className={'my-3'}>
                  <TextField
                    label={'ConfirmPassword'}
                    type={'password'}
                    required={true}
                    fullWidth
                    {...formikFieldAttrs<RegisterFormValues>('ConfirmPassword', formikProps)}
                  />
                </div>
                <div className={'my-3'}>
                  <FormControl>
                    <FormLabel>{t('gender')}</FormLabel>
                    <RadioGroup
                      row
                      aria-label="gender"
                      onChange={(value) => formikProps.setFieldValue('Gender', value, true)}
                      defaultValue="male"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className={'row'}>
                  <FormLabel>{t('date-of-birth')}</FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className={'col-md-4'}>
                      <DatePicker
                        label={'Day'}
                        views={['day']}
                        onChange={(value) =>
                          formikProps.setFieldValue('DateOfBirthDay', value?.get('date'), true)
                        }
                      />
                    </div>
                    <div className={'col-md-4'}>
                      <DatePicker
                        label={'Month'}
                        views={['month']}
                        onChange={(value) =>
                          formikProps.setFieldValue('DateOfBirthMonth', value?.get('month'), true)
                        }
                      />
                    </div>
                    <div className={'col-md-4'}>
                      <DatePicker
                        label={'Year'}
                        views={['year']}
                        onChange={(value) =>
                          formikProps.setFieldValue('DateOfBirthYear', value?.get('year'), true)
                        }
                      />
                    </div>
                  </LocalizationProvider>
                </div>
                <div className={'my-3'}>
                  <TextField
                    label={'Company'}
                    type={'text'}
                    required={true}
                    fullWidth
                    {...formikFieldAttrs<RegisterFormValues>('Company', formikProps)}
                  />
                </div>
                <div className={'my-3'}>
                  <FormControlLabel control={<Checkbox />} label="Newsletter" />
                </div>

                <Button
                  variant="contained"
                  className="btn btn--rounded btn--yellow btn-submit"
                  type={'submit'}
                  disabled={formikProps.isSubmitting}
                >
                  {formikProps.isSubmitting ? 'Loading...' : 'Sign Up'}
                </Button>
                <p className="form__signup-link">
                  <Link href="/login">{t('already-member')}</Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default Register;
