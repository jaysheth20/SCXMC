'use client';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import { useCallback } from 'react';
import Cookies from 'js-cookie';
import * as Yup from 'yup';
import { useI18n } from 'next-localization';

import { formikFieldAttrs, apiErrors2Formik } from 'src/lib/formUtils';
import { UserLogin, fetchDataCustomer } from 'src/store/Login';
import ErrorSummary from 'components/ErrorSummary';
import * as AccountService from 'src/services/AccountService';
import { fetchShoppingData } from 'src/store/ShoppingCart';
import { fetchWishlistData } from 'src/store/Wishlist';
import * as TrackingService from 'src/services/TrackingService';
import { useAppDispatch } from 'src/store/StoreHook';

interface ILoginFormValues {
  UsernameOrEmail: string;
  Password: string;
}

const Login = () => {
  const router = useRouter();
  const { t } = useI18n();
  const dispatcher = useAppDispatch();

  const loginSchema = Yup.object().shape({
    UsernameOrEmail: Yup.string().email('Invalid email').required('Email is required'),
    Password: Yup.string().required('Password is required').min(6, 'At least  6 characters'),
  });

  const useSubmitLoginForm = () => {
    const onSubmit = useCallback(
      (values: ILoginFormValues, { setSubmitting, setErrors }: FormikHelpers<ILoginFormValues>) => {
        AccountService.Login(values)
          .then(function (response) {
            console.log(response);
            const reqLoginCookies: any = {
              Token: response.data.AccessToken,
              Customer: response.data.Customer,
              Password: values.Password,
              CustomerId: response.data.CustomerId,
            };
            AccountService.LoginExtranetUser(reqLoginCookies)
              .then(function (scresponse) {
                console.log(scresponse);
                Cookies.remove('SC_ANALYTICS_GLOBAL_COOKIE');
                Cookies.set(
                  'SC_ANALYTICS_GLOBAL_COOKIE',
                  scresponse.data.TrackerSession.replace('-', ''),
                  { expires: 60 }
                );
              })
              .catch((error) => {
                console.log(error);
              });
            Cookies.set('.Nop.Authentication', response.data.AccessToken, { expires: 60 });
            Cookies.set('NopCustomerId', response.data.Customer.CustomerGuid, {
              expires: 60,
            });
            dispatcher(fetchDataCustomer(response.data.Customer));
            dispatcher(fetchShoppingData());
            dispatcher(fetchWishlistData());
            Cookies.set('SecureProtocolRequired', 'true', {
              expires: 60,
            });
            dispatcher(UserLogin());
            TrackingService.submitGoal('Login');
            router.push('/');
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

  const { onSubmit } = useSubmitLoginForm();

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
          <Formik
            initialValues={{ UsernameOrEmail: '', Password: '' }}
            onSubmit={onSubmit}
            validationSchema={loginSchema}
          >
            {(formikProps) => (
              <Form noValidate className={'form'}>
                <ErrorSummary />
                <div className="form__input-row">
                  <TextField
                    label={'Email'}
                    type={'email'}
                    required={true}
                    fullWidth
                    {...formikFieldAttrs<ILoginFormValues>('UsernameOrEmail', formikProps)}
                  />
                </div>
                <div className="form__input-row">
                  <TextField
                    label={'Password'}
                    type={'password'}
                    required={true}
                    fullWidth
                    {...formikFieldAttrs<ILoginFormValues>('Password', formikProps)}
                  />
                </div>
                <div className={'my-3 text-end'}>
                  <Link href="passwordrecovery">{t('forgot-password')}</Link>

                  <Button
                    className="btn btn--rounded btn--yellow btn-submit"
                    variant="contained"
                    type={'submit'}
                    disabled={formikProps.isSubmitting}
                  >
                    {formikProps.isSubmitting ? 'Loading...' : 'Sign In'}
                  </Button>
                  <p className="form__signup-link">
                    Not a member yet? <Link href="register">{t('register')}</Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default Login;
