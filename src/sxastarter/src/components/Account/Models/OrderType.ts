export interface OrderType {
  Orders: Order[];
  RecurringOrders: RecurringOrder[];
  RecurringPaymentErrors: string[];
}

export interface Order {
  CustomOrderNumber: string;
  OrderTotal: string;
  IsReturnRequestAllowed: boolean;
  OrderStatusEnum: string;
  OrderStatus: string;
  PaymentStatus: string;
  ShippingStatus: string;
  CreatedOn: string;
  Id: number;
}

export interface RecurringOrder {
  StartDate: string;
  CycleInfo: string;
  NextPayment: string;
  TotalCycles: number;
  CyclesRemaining: number;
  InitialOrderId: number;
  CanRetryLastPayment: boolean;
  InitialOrderNumber: string;
  CanCancel: boolean;
  Id: number;
}
