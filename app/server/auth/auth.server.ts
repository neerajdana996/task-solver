import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import {
  GitHubStrategy,
  GoogleStrategy
} from "remix-auth-socials";


import { getSession, sessionStorage } from "./authSession.server";

import { UserService } from "../service/user.server";
export const ROLETYPEVALUE = {
  Super_Admin: 'Super_Admin',
  Company_Admin: 'Company_Admin',
  Company_Recruiter: 'Company_Recruiter',
  Company_Content_Manager: 'Company_Content_Manager',
  Student: 'Student',
  Employee: 'Employee',

}

export type RoleType = keyof typeof ROLETYPEVALUE;

interface IUser {
  id: number;
  email: string;
  name: string;
  role: number;
  company: any;
  studentProfile: any;
  permissions?: any[];
}

export const getLoginUrlWithRole = (role: any) => {
  return `/auth/login`;
};

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<IUser>(sessionStorage);
const userService = new UserService();
// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email: any = form.get("email");
    let password: any = form.get("password");

    return userService.login(email, password);
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);

authenticator.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_AUTH_CLIENT_ID as any,
      clientSecret: process.env.GITHUB_AUTH_CLIENT_SECRET as any,
      callbackURL: `${process.env.APP_URL}/auth/github/callback`,
    },
    async ({ accessToken, extraParams, profile }) => {
      try {
        debugger;
        const email = profile.emails[0].value;
        const user = await userService.findOrCreate(profile);

        if (!user) {
          console.log("User not found");
        }
        return user;
      } catch (error: any) {
        return error.message;
      }
    }
  )
);

authenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_AUTH_CLIENT_ID as any,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as any,
      callbackURL: `${process.env.APP_URL}/auth/google/callback`,
    },
    async ({ accessToken, refreshToken, extraParams, profile }) => {
      try {

        const user = await userService.findOrCreate(profile);

        if (!user) {
          console.log("User not found");
        }
        return user;
      } catch (error: any) {
        return error.message;
      }
    }
  )
);


export const requiredUserWithRole = async (
  request: Request,
  role: RoleType[]
) => {
  let session = await getSession(request.headers.get("cookie"));
  if (!session) {
    return authenticator.logout(request, {
      redirectTo: getLoginUrlWithRole(role),
    });
  }
  const user = session.get(authenticator.sessionKey);
  console.log("user", user, user?.type, role);
  if (!user) {
    return authenticator.logout(request, {
      redirectTo: getLoginUrlWithRole(role),
    });
  }
  if (user.type === ROLETYPEVALUE.Super_Admin) {
    return user as IUser;
  }
  if (!role.includes(user.type)) {
    return authenticator.logout(request, {
      redirectTo: getLoginUrlWithRole(role),
    });
  }
  return user as IUser;
};

export const getUserDataFromSession = async (request: Request) => {
  let session = await getSession(request.headers.get("cookie"));
  if (!session) {
    return authenticator.logout(request, {
      redirectTo: getLoginUrlWithRole(null),
    });
  }
  return session.get(authenticator.sessionKey);
};
