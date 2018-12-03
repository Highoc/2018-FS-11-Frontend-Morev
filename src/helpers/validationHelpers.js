export default function valueIsValid(value, rules) {
  let isValid = true;
  if (rules.isRequired) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length < rules.maxLength && isValid;
  }

  return isValid;
}
