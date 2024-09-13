export enum AxonEvents {
  addToCartClick = "add_to_cart_click",
  viewProduct = "view_product",
  beginCheckoutClick = "begin_checkout_click",
  purchaseClick = "purchase_click",
}

export const pushToDatalayer = (
  eventName: string,
  eventPayload: Record<string, any>
) => {
  if (window && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventPayload,
    });
  }
};
