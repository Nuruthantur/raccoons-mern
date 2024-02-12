import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const payload = {
    sub: userId,
  };

  // SecretOrPrivate key is our own password needed to generate and later validate the token
  const secretOrKey = process.env.SECRET_KEY;

  // in signoptions we can include the longer version of private claims and other custom claims
  const signOptions = {
    expiresIn: "4d",
  };
  const token = jwt.sign(payload, secretOrKey, signOptions);
  return token;
};

export { generateToken };
