export const appendToStateArray = (setStateFunction) => (newElements = [], appendInFront = false) => {
  if (appendInFront) {
    setStateFunction(state => [...newElements, ...state]);
  } else {
    setStateFunction(state => [...state, ...newElements]);
  }
};
