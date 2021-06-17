const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const { User } = require("../models");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        console.log("Starting passport Authentication using local strategy.");
        console.log('Data received:', "\nEmail : ", email, "\nPassword : ", password)
        // Find the user associated with the email provided by the user
        const user = await User.findOne({ email });
        //will return null if no match in db

        if (!user) {
          // If the user isn't found in the database, return a message
          return done({message:"Email not found."}, false);
        }

        //check if passwords match
        if (!(await user.validatePassword(password))) {
          return done({message: "Password does not match."}, false);
        }

        // pass the user details to callback
        return done(null, user);
      
      } catch (error) {
        // watch for errors and handle them accordingly
        console.log("\nError in passport local strategy. \n");
        console.error(error)
        return done(error);
      }
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY
    },
    async (payload, done) => {
      try {
        // fetching user based on the data data extracted from token
        const user = await User.findById({ _id: payload.user._id }).select("-password");

        if (!user) {
          return done({message: "User not found"}, false);
        }

        return done(null, user);
      } catch (error) {
        console.log("Error in jwtAuth : \n")
        console.error(error)

        return done(error, false);
      }
    }
  )
);