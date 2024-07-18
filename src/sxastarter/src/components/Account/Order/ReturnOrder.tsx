import { UUID } from 'crypto';

import React, { useEffect, useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SelectChangeEvent } from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import MenuItem from '@mui/material/MenuItem';
import { useRouter, useSearchParams } from 'next/navigation';
import { Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import { useI18n } from 'next-localization';
import * as Yup from 'yup';
import Image from 'next/image';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

import ReturnItems from 'components/Account/Order/ReturnItems';
import {
  AvailableReturnAction,
  AvailableReturnReason,
  FileUpdaloadReq,
  ReturnItem,
  ReturnOrderReq,
} from 'components/Account/Models/ReturnOrderTypes';
import { formikFieldAttrs, apiErrors2Formik } from 'src/lib/formUtils';
import ErrorSummary from 'components/ErrorSummary';
import * as OrderService from 'src/services/OrderService';
import { RouteFields } from 'lib/component-props/RouteFields';

interface ReturnOrderValues {
  Comments: string;
  ReturnRequestReasonId: number;
  ReturnRequestActionId: number;
}

const qtyAttr: { [field: string]: string } = {};

const ReturnOrder = () => {
  const ReturnOrderSchema = Yup.object().shape({
    ReturnRequestReasonId: Yup.number().moreThan(0, 'Return Reason is required').required(),
    ReturnRequestActionId: Yup.number().moreThan(0, 'Return Action is required').required(),
  });
  const value = useSitecoreContext();
  const fields = value.sitecoreContext.route?.fields as RouteFields;
  const { t } = useI18n();
  const router = useRouter();
  const [returnItems, setReturnItems] = useState<ReturnItem[]>();
  const [image, setImage] = useState<any>('');
  const [imageName, setImageName] = useState('');
  const [availableReturnActions, setAvailableReturnActions] = useState<AvailableReturnReason[]>();
  const [availableReturnReasons, setAvailableReturnReasons] = useState<AvailableReturnAction[]>();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('oid');

  useEffect(() => {
    const fatchReturnRequest = () => {
      OrderService.getReturnRequest(orderId)
        .then(function (response) {
          setReturnItems(response.data.Items);
          setAvailableReturnActions(response.data.AvailableReturnActions);
          setAvailableReturnReasons(response.data.AvailableReturnReasons);
        })
        .catch(({ response: { data } }) => console.log(data));
    };
    fatchReturnRequest();
  }, [orderId]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setImageName(e.target.files[0].name);
    const base64 = toBase64(e.target.files[0]);
    base64.then((dataUrl) => setImage(dataUrl));
  };

  const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const useSubmitReturnForm = () => {
    const onSubmit = useCallback(
      (
        values: ReturnOrderValues,
        { setSubmitting, setErrors }: FormikHelpers<ReturnOrderValues>
      ) => {
        if (Object.keys(qtyAttr).length !== 0) {
          const orderReturn: ReturnOrderReq = {
            ReturnRequestReasonId: values.ReturnRequestReasonId,
            ReturnRequestActionId: values.ReturnRequestActionId,
            Comments: values.Comments,
            OrderItemsQuantity: qtyAttr,
          };
          if (!image) {
            OrderService.returnRequest(orderId, orderReturn)
              .then(function () {
                router.push('account/orderhistory');
              })
              .catch(({ response: { data } }) => setErrors(apiErrors2Formik(data)))
              .finally(() => setSubmitting(false));
          } else {
            const returnRequest: FileUpdaloadReq = {
              FileBase64String: image.split(',')[1],
              FileName: imageName,
            };
            OrderService.uploadFileReturnRequest(returnRequest)
              .then(function (fileresponse) {
                if (fileresponse.data.Success && fileresponse.data.UploadedFileGuid !== '') {
                  orderReturn.UploadedFileGuid = fileresponse.data.UploadedFileGuid as UUID;
                  OrderService.returnRequest(orderId, orderReturn).then(function () {
                    router.push('account/orderhistory');
                  });
                }
              })
              .catch(({ response: { data } }) => setErrors(apiErrors2Formik(data)))
              .finally(() => setSubmitting(false));
          }
        } else {
          const qtyerror: any = ['Please Select Quentity from Product List'];
          setErrors(apiErrors2Formik(qtyerror));
          setSubmitting(false);
        }
      },
      [image, imageName]
    );
    return {
      onSubmit,
    };
  };

  const handleQtyChange = (event: SelectChangeEvent) => {
    if (qtyAttr[event.target.name.toString()] && event.target.value == '0') {
      delete qtyAttr[event.target.name];
    } else {
      qtyAttr[event.target.name.toString()] = event.target.value;
    }
    console.log(qtyAttr);
  };

  const { onSubmit } = useSubmitReturnForm();

  return (
    <section className="cart">
      <div className="container">
        <div className="order-history-back-button-section">
          <Link href="/account/orderhistory">
            <i className="icon-left"></i>
            {t('back')}
          </Link>
          <h3>{fields.pageTitle.value}</h3>
        </div>
        <div className="order-history-container">
          <div className="block">
            {returnItems ? (
              <ReturnItems returnItems={returnItems} handleChange={handleQtyChange}></ReturnItems>
            ) : (
              <>
                <Skeleton sx={{ mb: 2 }} variant="rounded" height={60} />
                <Skeleton sx={{ mb: 2 }} variant="rounded" height={60} />
              </>
            )}
            {returnItems ? (
              <div className={'col-md-6 offset-md-3 col-xl-4 offset-xl-4'}>
                <Formik
                  sx={{ mt: 1 }}
                  initialValues={{
                    Comments: '',
                    ReturnRequestReasonId: 0,
                    ReturnRequestActionId: 0,
                  }}
                  onSubmit={onSubmit}
                  validationSchema={ReturnOrderSchema}
                >
                  {(formikProps) => (
                    <Form noValidate>
                      <ErrorSummary />
                      <div className={'my-3'}>
                        <TextField
                          label={'Return  Request Reason'}
                          fullWidth
                          defaultValue={0}
                          select
                          {...formikFieldAttrs<ReturnOrderValues>(
                            'ReturnRequestReasonId',
                            formikProps
                          )}
                        >
                          <MenuItem key={0} value={0}>
                            {t('select-reason')}
                          </MenuItem>
                          {availableReturnReasons?.map((option) => (
                            <MenuItem key={'ar' + option.Id} value={option.Id}>
                              {option.Name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                      <div className={'my-3'}>
                        <TextField
                          label={'Return Request Action'}
                          fullWidth
                          select
                          defaultValue={0}
                          {...formikFieldAttrs<ReturnOrderValues>(
                            'ReturnRequestActionId',
                            formikProps
                          )}
                        >
                          <MenuItem key={0} value={0}>
                            {t('select-an-action')}
                          </MenuItem>
                          {availableReturnActions?.map((option) => (
                            <MenuItem key={'aa' + option.Id} value={option.Id}>
                              {option.Name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                      <div className={'my-3'}>
                        <TextField
                          type={'file'}
                          fullWidth
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFileChange(e)}
                        />
                      </div>
                      <div className={'my-3'}>
                        {image ? (
                          <Image
                            src={decodeURIComponent(image)}
                            alt={'img'}
                            width={100}
                            height={100}
                          />
                        ) : null}
                      </div>
                      <div className={'my-3'}>
                        <TextField
                          label={'Comment'}
                          type="text"
                          rows={4}
                          fullWidth
                          {...formikFieldAttrs<ReturnOrderValues>('Comments', formikProps)}
                        />
                      </div>

                      <div className={'my-3 text-end'}>
                        <Button
                          variant="contained"
                          className="btn btn--rounded btn--yellow"
                          type={'submit'}
                          disabled={formikProps.isSubmitting}
                        >
                          {formikProps.isSubmitting ? 'Loading...' : t('submit-return-request')}
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            ) : (
              <Skeleton
                className="col-md-6 offset-md-3 col-xl-4 offset-xl-4"
                sx={{ mb: 2 }}
                variant="rounded"
                height={300}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReturnOrder;
