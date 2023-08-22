/**
 * Formatter module to transform Step 1 data
 */

export const transformApiRequest = (bankBranch) => {
  return {
    currentFixedDepositBank: bankBranch,
  };
};
