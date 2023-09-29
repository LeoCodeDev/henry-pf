export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]+$/;
  return passwordRegex.test(password);
}

export function isValidFirstName(firstName) {
  return firstName.length >= 2;
}

export function isValidLastName(lastName) {
  return lastName.length >= 2;
}

export function isMinimumAge(birthday) {
  const currentDate = new Date();
  const minAgeDate = new Date();
  minAgeDate.setFullYear(currentDate.getFullYear() - 12); 

  const userBirthday = new Date(birthday);
  return userBirthday <= minAgeDate;
}
