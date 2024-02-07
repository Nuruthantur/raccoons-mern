const encryptPassword = async () => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(userPassword, salt);
  } catch (error) {
    console.log(error);
  }
};
