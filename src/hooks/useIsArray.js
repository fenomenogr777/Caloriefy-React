const useIsArray = (arr, valueToDisplay) => {
   return Array.isArray(arr) && arr.length===0 ? '' : valueToDisplay
}

export default useIsArray
