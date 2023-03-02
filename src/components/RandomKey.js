function RandomKey() {
  return (Math.random() + 1 * 999).toString().split('.')[1];
}
export default RandomKey;
