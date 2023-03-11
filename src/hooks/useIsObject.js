// FIRST ARGUMENT TAKES THE OBJECT YOU WATCH TO CHECK
// SECOND ARGUMENT TAKES THE VALUE YOU WANT TO DISPLAY IF IS NOT EMPTY OBJECT

const useIsObject = (objectToCheck, valueToDisplay) => {
   return Object.keys(objectToCheck).length === 0 ? '' : valueToDisplay
}

export default useIsObject
