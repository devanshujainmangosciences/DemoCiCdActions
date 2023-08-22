/**
 * Formatter module to transform Step 1 data
 */

export const transformApiRequest = (body) => {
  return {
    paymentTypeOpted: body,
    termsAccepted: true,
  };
};
