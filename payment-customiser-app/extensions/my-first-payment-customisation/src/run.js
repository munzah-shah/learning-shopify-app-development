// @ts-check

// Use JSDoc annotations for type safety
/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
const NO_CHANGES = {
  operations: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  // Define a type for your configuration, and parse it from the metafield
  /**
   * @type {{
   *   paymentMethodName: string
   *   cartTotal: number
   * }}
   */
  const configuration = JSON.parse(
    input?.paymentCustomization?.metafield?.value ?? "{}"
  );
  if (!configuration.paymentMethodName || !configuration.cartTotal) {
    return NO_CHANGES;
  }

  // Get the cart total from the function input, and return early if it's below 100
  const cartTotal = parseFloat(input.cart.cost.totalAmount.amount ?? "0.0");
  if (cartTotal < configuration.cartTotal) {
    // manually setting threshold price for now
    console.error(
      // this will be displayed under STDERR in function logs on Partners Dashboard
      "Cart total is not high enough, no need to hide the payment method."
    );
    return NO_CHANGES;
  }

  // Find the payment method to hide
  const hidePaymentMethod = input.paymentMethods.find(
    (method) => method.name.includes(configuration.paymentMethodName) // adding the method manuually for now
  );

  if (!hidePaymentMethod) {
    return NO_CHANGES;
  }

  // The @shopify/shopify_function package applies JSON.stringify() to your function result
  // and writes it to STDOUT
  return {
    operations: [
      {
        hide: {
          paymentMethodId: hidePaymentMethod.id,
        },
      },
    ],
  };
}
