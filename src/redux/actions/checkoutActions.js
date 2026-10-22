export function addCheckoutAction(newCheckout) {
  return {
    type: "ADD_CHECKOUT",
    payload: newCheckout,
  };
}

export function updateCheckoutStatusAction(orderId, status) {
  return {
    type: "UPDATE_CHECKOUT_STATUS",
    payload: { orderId, status },
  };
}