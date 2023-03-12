const useIsArray = (arr, displayToFalse, displayToTrue = '') => {
   return Array.isArray(arr) && arr.length === 0
      ? displayToTrue
      : displayToFalse
}

export default useIsArray
