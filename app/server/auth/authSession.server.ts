import { createCookie, createCookieSessionStorage } from "@remix-run/node";

export let sessionStorage = createCookieSessionStorage({
    cookie: {
        // name: "_session", // use any name you want here
        // sameSite: "lax", // this helps with CSRF
        // path: "/", // remember to add this so the cookie will work in all routes
        // httpOnly: true, // for security reasons, make this cookie http only
        // secrets: ["s3cr3t"], // replace this with an actual secret
        // secure: process.env.NODE_ENV === "production", // enable this in prod only
        secure: false, // TODO: local session doesn't persist when using process.env.NODE_ENV === 'production'
        secrets: ['s3cr3t'],
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        httpOnly: true
    },
});

export const userPrefs = createCookie("user-prefs", {
    maxAge: 604_800, // one week
});
export let { getSession, commitSession, destroySession } = sessionStorage;