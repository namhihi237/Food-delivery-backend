const OrderEnum = Object.freeze({
  PENDING: "pending",
  CONFIRM: "confirm",
  PROCESSING: "processing",
  DELIVERY: "delivery",
  RETURNED: "returned",
  CANCELED: "canceled",
  COMPLETED: "completed",
});

const TransactionEnum = Object.freeze({
  PAID: "paid",
  UNPAID: "unpaid",
});

const MethodPaymentEnum = Object.freeze({
  OFFLINE: "OFFLINE",
  COD: "COD",
  ONLINE: "ONLINE",
});

export { OrderEnum, TransactionEnum, MethodPaymentEnum };