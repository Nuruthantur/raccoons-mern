import bcrypt from "bcrypt";

const encryptUserPassword = async (userPassword) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(userPassword, salt);
    return hashedPassword;
  } catch (error) {
    console.log("error hashing password", error);
    return null;
  }
};

const verifyPassword = async (myPlaintextPassword, hashedPassword) => {
  const isPassword = bcrypt.compare(myPlaintextPassword, hashedPassword);
  console.log("issPassword: ", isPassword);
  return isPassword;
};
// bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
//   // result == true
// });

export { encryptUserPassword, verifyPassword };
