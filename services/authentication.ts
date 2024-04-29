
// services/authentication.ts
import { createCookieSessionStorage } from "@remix-run/node";

const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "logto-session",
        maxAge: 14 * 24 * 60 * 60,
        secrets: ['CM0Rq7ucX7EPAxwJcchi7QAz2aZ3MlDt'], // Auto-generated secret
    },
});