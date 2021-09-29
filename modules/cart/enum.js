const OrderEnum = Object.freeze({
  NEW: "NEW",
  SHIPPING: "SHIPPING",
  CANCELLED: "CANCELLED",
  RETURNED: "RETURNED",
  COMPLETED: "COMPLETED",
});

const TransactionEnum = Object.freeze({
  NEW: "NEW",
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  COMPLETED: "COMPLETED",
  DECLINED: "DECLINED",
});

const MethodPaymentEnum = Object.freeze({
  OFFLINE: "OFFLINE",
  COD: "COD",
  ONLINE: "ONLINE",
});

export { OrderEnum, TransactionEnum, MethodPaymentEnum };