/**
 *
 * @param {Object} A
 * @param {Object} B
 * @returns Object containing all the key-value pairs that are different between A and B.
 */
const diff = (A, B) => {
  const C = {};
  for (const key in A) {
    if (A[key] !== B[key]) {
      C[key] = A[key];
    }
  }
  for (const key in B) {
    if (!C.hasOwnProperty(key) && A[key] !== B[key]) {
      C[key] = B[key];
    }
  }
  return C;
};

export default diff;
