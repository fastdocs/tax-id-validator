const countValues = (arr: string[]) => {
  return arr.reduce((obj: any, item: string) => {
    obj[item] = obj[item] ? ++obj[item] : 1
    return obj
  }, {})
}

export const tinValidation = (tin: string) => {
  const cleanedTin = tin.replace(/\s/g, '')
  const tinLength = 11

  // Taxnumber has to have exactly 11 digits.
  if (cleanedTin.length !== tinLength) {
    return false
  }

  // First digit cannot be 0.
  if (cleanedTin[0] === '0') {
    return false
  }

  /* 
   make sure that within the first ten digits:
     1.) one digit appears exactly twice or thrice
     2.) one or two digits appear zero times
     3.) and all other digits appear exactly once
  */
  const tinArray = cleanedTin.split('').slice(0, -1)
  const valueCount = countValues(tinArray)
  const valueCountLength = Object.keys(valueCount).length

  if (valueCountLength !== 8 && valueCountLength !== 9) {
    return false
  }

  // 11th digit has to match the checkum.
  let sum = 0
  let product = 10

  for (let i = 0; i < tinLength - 1; i++) {
    sum = (+tinArray[i] + product) % 10
    if (sum === 0) {
      sum = 10
    }
    product = (sum * 2) % 11
  }

  let checksum = 11 - product

  if (checksum === 10) {
    checksum = 0
  }

  if (+cleanedTin[tinLength - 1] !== checksum) {
    return false
  }

  return true
}

export default tinValidation
