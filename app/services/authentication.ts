// app/services/authentication.ts

import { makeLogtoRemix } from "@logto/remix";

// services/authentication.ts
import { createCookieSessionStorage } from "@remix-run/node";

const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "logto-session",
        maxAge: 14 * 24 * 60 * 60,
        secrets: ['CM0Rq7ucX7EPAxwJcchi7QAz2aZ3MlDt'], // Auto-generated secret
    },
});
export const logto = makeLogtoRemix(
    {
        endpoint: 'https://logto-t08w48w.64.227.137.36.sslip.io/',
        appId: 'oonspsdvix88w8vu6ntrp',
        appSecret: 'qWcFrYRL9o07WDkz8ITVKGUzLryo9jps',
        baseUrl: process.env.APP_URL || 'http://localhost:3000', // Change to your own base URL,
        scopes: ['openid', 'profile', 'email'],
    },
    { sessionStorage }
);