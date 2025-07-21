function isValidEmail(email) {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
}

function isValidPhone(phone) {
  const regex = /^\+?[0-9]{10,14}$/;
  return regex.test(phone);
}

function isEmpty(value) {
  return value === undefined || value === null || value.trim() === '';
}

module.exports = { isValidEmail, isValidPhone, isEmpty };
