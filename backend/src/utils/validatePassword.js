export default function validatePassword(password) {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-+.]).{6,20}$/;
  return regex.test(password);
}
