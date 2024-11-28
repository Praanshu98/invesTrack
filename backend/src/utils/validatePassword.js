import bcrypt from "bcrypt";

function validatePassword(password) {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-+.]).{6,20}$/;
  return regex.test(password);
}

function verifyPasswordHash(password, hash) {
  return bcrypt.compare(password, hash);
}

export { validatePassword, verifyPasswordHash };
