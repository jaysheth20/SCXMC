import * as EndPoints from 'src/lib/constants/EndPoints';
import { CreateSitecoreRequest } from 'src/services/SitecoreRequestService';
import axiosInterceptorInstance from 'axiosInterceptorInstance';

export const Logout = () => {
  return CreateSitecoreRequest(EndPoints.LogoutExtranetUserApi, {});
};
export const ChangePasswordService = (values: any) => {
  return axiosInterceptorInstance.post(EndPoints.ChangePasswordApi, values);
};

export const Login = (values: any) => {
  return axiosInterceptorInstance.post(EndPoints.LoginApi, values);
};

export const passwordRecoveryConfirm = (token: any, guid: any) => {
  return axiosInterceptorInstance.get(
    EndPoints.PasswordRecoveryConfirmApi + '?token=' + token + '&guid=' + guid
  );
};
export const register = (values: any) => {
  return axiosInterceptorInstance.post(EndPoints.RegisterApi, values);
};
export const creatSitcoreIdentityUser = (values: any) => {
  return CreateSitecoreRequest(EndPoints.CreateIdentityUserApi, values);
};
export const LoginExtranetUser = (values: any) => {
  return CreateSitecoreRequest(EndPoints.LoginExtranetUserApi, values);
};
export const ChangeExtranetUserPassword = (values: any) => {
  return CreateSitecoreRequest(EndPoints.ChangeExtranetUserPasswordApi, values);
};
export const passwordRecoveryConfirmPost = (token: any, guid: any, values: any) => {
  return axiosInterceptorInstance.post(
    EndPoints.PasswordRecoveryConfirmPOSTApi + '?token=' + token + '&guid=' + guid,
    values
  );
};

export const passwordRecovery = (values: any) => {
  const passwordRecoveryRequest = {
    Email: values.Email,
  };
  return CreateSitecoreRequest(EndPoints.PasswordRecoveryApi, passwordRecoveryRequest);
};
