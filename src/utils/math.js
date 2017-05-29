export const randomId = () => {
  const prefix = (new Array(5))
    .fill(1)
    .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)) ) // random letter
    .join('')
  // const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26))
  const uniqid = prefix + Date.now()
  return uniqid
}
