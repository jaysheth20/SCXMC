'use client';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';
import { useI18n } from 'next-localization';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Alert from '@mui/material/Alert';

import { formikFieldAttrs, apiErrors2Formik } from 'src/lib/formUtils';
import ErrorSummary from 'src/components/ErrorSummary';
import { passwordRecovery } from 'src/services/AccountService';
import { RouteFields } from 'lib/component-props/RouteFields';

interface IForgotPasswordFormValues {
  Email: string;
}

const ForgotPassword = () => {
  const { t } = useI18n();
  const value = useSitecoreContext();
  const fields = value.sitecoreContext.route?.fields as RouteFields;
  const [successScreen, setSuccessScreen] = useState(false);
  const [message, setMessage] = useState('');
  const forgotPasswordSchema = Yup.object().shape({
    Email: Yup.string().email('Invalid email').required('Required'),
  });

  const useSubmitLoginForm = () => {
    const onSubmit = useCallback(
      (
        values: IForgotPasswordFormValues,
        { setSubmitting, setErrors }: FormikHelpers<IForgotPasswordFormValues>
      ) => {
        passwordRecovery(values)
          .then((response) => {
            if (response.data.IsSuccessful) {
              if (response.data.ResultData) {
                setSuccessScreen(true);
                setMessage(response.data.ResultData.Result);
              } else {
                const error: any = [];
                error.push(response.data.ErrorMessage);
                setErrors(apiErrors2Formik(error));
              }
            }
            setSubmitting(false);
          })
          .catch((error) => {
            console.log(error);
            setSubmitting(false);
            setErrors(apiErrors2Formik(error));
          });
      },
      []
    );
    return {
      onSubmit,
    };
  };

  const { onSubmit } = useSubmitLoginForm();

  return (
    <section className="cart">
      <div className="container">
        <div className="order-history-back-button-section">
          <Link href="login">
            <i className="icon-left"></i>
            {t('back')}
          </Link>
          <h3>{fields.pageTitle.value}</h3>
        </div>

        <div className="form-block">
          {successScreen ? (
            <>
              <Alert variant="filled" severity="success">
                {message}
              </Alert>
            </>
          ) : (
            <Formik
              initialValues={{ Email: '' }}
              onSubmit={onSubmit}
              validationSchema={forgotPasswordSchema}
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
                      {...formikFieldAttrs<IForgotPasswordFormValues>('Email', formikProps)}
                    />
                  </div>
                  <div className={'my-3 text-end'}>
                    <Button
                      className="btn btn--rounded btn--yellow btn-submit"
                      variant="contained"
                      type={'submit'}
                      disabled={formikProps.isSubmitting}
                    >
                      {formikProps.isSubmitting ? 'Loading...' : t('recover')}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
