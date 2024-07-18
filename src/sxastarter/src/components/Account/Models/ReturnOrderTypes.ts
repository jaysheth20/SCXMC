import { UUID } from 'crypto';

export interface ReturnOrderModel {
  OrderId: number;
  CustomOrderNumber: string;
  Items: ReturnItem[];
  ReturnRequestReasonId: number;
  AvailableReturnReasons: AvailableReturnReason[];
  ReturnRequestActionId: number;
  AvailableReturnActions: AvailableReturnAction[];
  Comments: string;
  AllowFiles: boolean;
  UploadedFileGuid: string;
  SitecoreMediaItemId: string;
  Result: string;
  CustomProperties: object;
}

export interface ReturnItem {
  ProductId: number;
  ProductName: string;
  ProductSeName: string;
  AttributeInfo: string;
  UnitPrice: string;
  Quantity: number;
  Id: number;
  CustomProperties: object;
}

export interface AvailableReturnReason {
  Name: string;
  Id: number;
  CustomProperties: object;
}

export interface AvailableReturnAction {
  Name: string;
  Id: number;
  CustomProperties: object;
}
export interface FileUpdaloadReq {
  FileBase64String: string;
  FileName: string;
}
export interface FileUpdaloadResponse {
  Success: boolean;
  UploadedFileGuid: string;
  Message: string;
}

export interface ReturnOrderReq {
  UploadedFileGuid?: UUID;
  SitecoreMediaItemId?: UUID;
  ReturnRequestReasonId: number;
  ReturnRequestActionId: number;
  Comments: string;
  OrderItemsQuantity: object;
}
