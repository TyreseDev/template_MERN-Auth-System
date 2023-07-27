import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/user.mjs";
import { JWT_SECRET_KEY } from "../config/index.mjs";

export default (passport) => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET_KEY,
      },
      (jwt_payload, done) => {
        User.findById(jwt_payload.id)
          .then((user) => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch((err) => console.log(err));
      }
    )
  );
};
