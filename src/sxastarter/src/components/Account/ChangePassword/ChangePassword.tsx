import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Form, Formik, FormikHelpers } from 'formik';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';

import { apiErrors2Formik, formikFieldAttrs } from 'src/lib/formUtils';
import ErrorSummary from 'src/components/ErrorSummary';
import { RouteFields } from 'lib/component-props/RouteFields';
import { ChangeExtranetUserPassword, ChangePasswordService } from 'src/services/AccountService';
import { UserLogout } from 'src/store/Login';
import { useAppDispatch, useAppSelector } from 'src/store/StoreHook';

interface ChangePasswordFormValues {
  OldPassword: string;
  NewPassword: string;
  ConfirmNewPassword: string;
}

const ChangePassword = () => {
  const router = useRouter();
  const { t } = useI18n();
  const value = useSitecoreContext();
  const fields = value.sitecoreContext.route?.fields as RouteFields;
  const [message, setMessage] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);
  const dispatcher = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.login);

  const ChangePasswordSchema = Yup.object().shape({
    OldPassword: Yup.string().required('Password is required').min(6, 'At least 6 characters'),
    NewPassword: Yup.string().required('Password is required').min(6, 'At least 6 characters'),
    ConfirmNewPassword: Yup.string()
      .required('Confrim Password is required')
      .oneOf([Yup.ref('NewPassword')], 'Passwords must match'),
  });
  const useSubmitLoginForm = () => {
    const onSubmit = useCallback(
      (
        values: ChangePasswordFormValues,
        { setSubmitting, setErrors }: FormikHelpers<ChangePasswordFormValues>
      ) => {
        ChangePasswordService(values)
          .then((res) => {
            console.log(res.data);
            const value = {
              CustomerId: loggedIn.Customer.Id,
              NewPassword: values.NewPassword,
              OldPassword: values.OldPassword,
            };
            ChangeExtranetUserPassword(value).then((scres) => {
              if (scres.data.IsSuccess == true) {
                setSnackOpen(true);
                setMessage(res.data);
                dispatcher(UserLogout());
                router.push('/login');
              }
            });
          })
          .catch(({ response: { data } }) => {
            setErrors(apiErrors2Formik(data.Errors));
          })
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
    <section className="cart">
      <div className="container">
        <div className="order-history-back-button-section">
          <Link href="account">
            <i className="icon-left"></i>
            {t('back')}
          </Link>
          <h3>{fields.pageTitle.value}</h3>
        </div>

        <div className="form-block">
          {snackOpen ? (
            <Alert variant="filled" severity="success">
              {message}
            </Alert>
          ) : (
            <Formik
              initialValues={{ OldPassword: '', NewPassword: '', ConfirmNewPassword: '' }}
              onSubmit={onSubmit}
              validationSchema={ChangePasswordSchema}
            >
              {(formikProps) => (
                <Form noValidate className={'form'}>
                  <ErrorSummary />
                  <div className="form__input-row">
                    <TextField
                      label={'Old Password'}
                      type={'password'}
                      required={true}
                      fullWidth
                      {...formikFieldAttrs<ChangePasswordFormValues>('OldPassword', formikProps)}
                    />
                  </div>
                  <div className="form__input-row">
                    <TextField
                      label={'Passsword'}
                      type={'password'}
                      required={true}
                      fullWidth
                      {...formikFieldAttrs<ChangePasswordFormValues>('NewPassword', formikProps)}
                    />
                  </div>
                  <div className="form__input-row">
                    <TextField
                      label={'Confrim Password'}
                      type={'password'}
                      required={true}
                      fullWidth
                      {...formikFieldAttrs<ChangePasswordFormValues>(
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
                      {formikProps.isSubmitting ? 'Loading...' : 'Change Password'}
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

export default ChangePassword;
