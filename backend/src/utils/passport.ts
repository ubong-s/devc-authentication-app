import { PassportStatic } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GithubStrategy } from 'passport-github2';
import authControllers from '../controllers/authControllers';
import User from '../models/User';
import config from './config';
import passport from 'passport';

// export default (passport: PassportStatic) => {
passport.use(
   new GoogleStrategy(
      {
         clientID: config.GOOGLE_CLIENT_ID,
         clientSecret: config.GOOGLE_CLIENT_SECRET,
         callbackURL: 'http://localhost:5000/api/auth/google/callback',
         passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile: any, done) => {
         let tokenUser;

         const id = profile.id;
         const email = profile.emails[0].value;
         const name = profile.displayName;
         const photo = profile.photos[0].value;

         let user = await User.findOne({ email });

         if (!user) {
            const newUser = await authControllers.addGoogleUser({
               id,
               email,
               name,
               photo,
            });

            return done(null, newUser);
         }

         if (user) {
            user.google = user.google?.id ? user.google : { id, name, email };
            user.name = user.name || name;
            user.photo = user.photo || photo;
            user.isVerified = user.isVerified || true;
            user.verified = user.verified || new Date(Date.now());
         }

         await user.save();

         return done(null, user);
      }
   )
);

passport.use(
   new GithubStrategy(
      {
         clientID: config.GITHUB_CLIENT_ID,
         clientSecret: config.GITHUB_CLIENT_SECRET,
         callbackURL: 'http://localhost:5000/api/auth/github/callback',
      },
      async (accessToken: any, refreshToken: any, profile: any, done: any) => {
         let tokenUser;

         console.log(profile);

         return done(null, profile);
      }
   )
);

passport.serializeUser((user, done) => {
   done(null, user);
});

passport.deserializeUser(async (user, done) => {
   // @ts-ignore
   const currentUser = await User.findOne({ email: user.email });
   done(null, currentUser);
});
// };

export default passport;
