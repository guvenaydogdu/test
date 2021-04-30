function maskedPhoneToNumber(value: string) {
  return value.replace('(', '').replace(')', '').replace(/\s/g, '')
}

export { maskedPhoneToNumber }
