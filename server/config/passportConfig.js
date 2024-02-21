import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import UserModel from "../models/userModels.js";

// ExtractJwt = require("passport-jwt").ExtractJwt;
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};
// opts.secretOrKey = 'secret';

const jwtStrategy = new JwtStrategy(options, async function (
  jwt_payload,
  done
) {
  console.log("ladida");
  try {
    const user = await UserModel.findOne({ _id: jwt_payload.sub });
    console.log("user :>> ", user);
    if (!user) {
      console.log("token invalid");
      return done(null, false);
    }
    if (user) {
      console.log("user found");
      return done(null, user);
    }
  } catch (err) {
    console.log("something else happened");
    return done(err, false);
  }
});

export default jwtStrategy;
