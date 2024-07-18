'use client';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useSearchParams } from 'next/navigation';
import { Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useI18n } from 'next-localization';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

import { formikFieldAttrs, apiErrors2Formik } from 'src/lib/formUtils';
import ErrorSummary from 'src/components/ErrorSummary';
import * as AccountService from 'src/services/AccountService';
import { RouteFields } from 'lib/component-props/RouteFields';

interface IResetPasswordFormValues {
  NewPassword: string;
  ConfirmNewPassword: string;
}

const ResetPassword = () => {
  const { t } = useI18n();
  const value = useSitecoreContext();
  const fields = value.sitecoreContext.route?.fields as RouteFields;
  const [message, setMessage] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackseverity, setSnackseverity] = useState('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const guid = searchParams.get('guid');
  const [customerId, setCustomerId] = useState(0);

  const resetPasswordSchema = Yup.object().shape({
    NewPassword: Yup.string().required('Password is required').min(6, 'At least 6 characters'),
    ConfirmNewPassword: Yup.string()
      .required('Confrim Password is required')
      .oneOf([Yup.ref('NewPassword')], 'Passwords must match'),
  });

  useEffect(() => {
    if (token && guid) {
      AccountService.passwordRecoveryConfirm(token, guid)
        .then(function (response) {
          setCustomerId(response.data.Result);
          setSnackOpen(false);
        })
        .catch(({ response: { data } }) => {
          setSnackOpen(true);
          setSnackseverity('error');
          setMessage(data.Errors.join(','));
        });
    } else {
      setSnackOpen(true);
      setSnackseverity('error');
      setMessage('Invalid Url');
    }
  }, [token, guid]);

  const useSubmitLoginForm = () => {
    const onSubmit = useCallback(
      (
        values: IResetPasswordFormValues,
        { setSubmitting, setErrors }: FormikHelpers<IResetPasswordFormValues>
      ) => {
        AccountService.passwordRecoveryConfirmPost(token, guid, values)
          .then(function (response) {
            const changeReq = { CustomerId: customerId, NewPassword: values.NewPassword };
            AccountService.ChangeExtranetUserPassword(changeReq)
              .then(() => {
                setSnackOpen(true);
                setSnackseverity('success');
                setMessage(response.data);
              })
              .catch(({ response: { data } }) => {
                setErrors(apiErrors2Formik(data.Errors));
              })
              .finally(() => setSubmitting(false));
          })
          .catch(({ response: { data } }) => setErrors(apiErrors2Formik(data.Errors)))
          .finally(() => setSubmitting(false));
      },
      [customerId]
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
          <Link href="/">
            <i className="icon-left"></i>
            {t('back-to-store')}
          </Link>
          <h3>{fields.pageTitle.value}</h3>
        </div>

        <div className="form-block">
          {snackOpen ? (
            <Alert variant="filled" severity={snackseverity === 'success' ? 'success' : 'error'}>
              {message}
            </Alert>
          ) : (
            <Formik
              initialValues={{ NewPassword: '', ConfirmNewPassword: '' }}
              onSubmit={onSubmit}
              validationSchema={resetPasswordSchema}
            >
              {(formikProps) => (
                <Form noValidate className={'form'}>
                  <ErrorSummary />
                  <div className="form__input-row">
                    <TextField
                      label={'Passsword'}
                      type={'password'}
                      required={true}
                      fullWidth
                      {...formikFieldAttrs<IResetPasswordFormValues>('NewPassword', formikProps)}
                    />
                  </div>
                  <div className="form__input-row">
                    <TextField
                      label={'Confrim Password'}
                      type={'password'}
                      required={true}
                      fullWidth
                      {...formikFieldAttrs<IResetPasswordFormValues>(
                        'ConfirmNewPassword',
                        formikProps
                      )}
                    />
                  </div>
                  <div className={'my-3 text-end'}>
                    <Button
                      className="btn btn--rounded btn--yellow btn-submit"
                      variant="contained"
                      type={'submit'}
                      disabled={formikProps.isSubmitting}
                    >
                      {formikProps.isSubmitting ? 'Loading...' : t('reset-password')}
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

export default ResetPassword;
