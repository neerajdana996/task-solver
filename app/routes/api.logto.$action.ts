// app/routes/api/logto/$action.ts

import { logto } from "../services/authentication";


export const loader = logto.handleAuthRoutes({
  "sign-in": {
    path: "/api/logto/sign-in",
    redirectBackTo: "/api/logto/callback", // The redirect URI just entered

  },
  "sign-in-callback": {
    path: "/api/logto/callback",
    redirectBackTo: "/task",
  },
  "sign-out": {
    path: "/api/logto/sign-out",
    redirectBackTo: "/",

  },
});