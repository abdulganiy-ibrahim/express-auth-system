# Rate Limiting

## What is Rate Limiting?

Rate limiting is a technique used to control and limit the number of requests a client can make to a server within a specific period.

It helps prevent excessive requests from overwhelming the server and protects sensitive API endpoints from abuse.

## Why Use Rate Limiting?

A user or attacker could repeatedly send requests to a particular API endpoint. A large number of requests can consume server resources and, in some cases, be used to perform brute-force attacks.

Rate limiting helps mitigate these risks by restricting how many requests a client can make to a specific endpoint within a defined time window.

For example, an authentication endpoint could be configured to allow only a certain number of login attempts within a given period. Once the limit is reached, additional requests are rejected until the rate-limit window resets.

## Where Does Rate Limiting Fit Into the Architecture?

Rate limiting is implemented as a **security middleware**.

Requests to protected endpoints pass through the rate-limiting middleware before reaching the route handler. The middleware checks whether the client has exceeded the allowed request limit and either allows the request to continue or rejects it.

```text
Client
  ↓
Rate Limit Middleware
  ↓
Authentication / Authorization
  ↓
Route Handler
  ↓
Business Logic
```

## Rate Limiting File Structure

```text
middleware/
└── security/
    └── rate.limit.ts
```

The `rate.limit.ts` file contains the rate-limiting middleware configurations used by the application.

### Why Separate Rate Limits by Route?

Different endpoints may require different rate limits depending on their purpose and sensitivity.

For example:

* Login: stricter limit because it can be targeted by brute-force attacks.
* Password reset: stricter limit because it can be abused to trigger repeated OTP/email requests.
* General API endpoints: more relaxed limit because they may need to handle more requests.

Keeping these configurations separate makes the limits easier to understand, modify, and maintain as the application grows.

Another approach would be to create a single rate-limiting function that contains the configuration for every route and determines the appropriate limit using `req.path`.

However, I decided against this approach because, as the application grows, the function could become difficult to maintain. It would contain an increasing number of route checks, making it harder to locate and modify the rate limit for a specific endpoint.

Separating the configurations keeps each rate limit closer to the route where it is used and makes the security configuration easier to manage.

## Rate Limiting Implementation

For this project, I used **`express-rate-limit`**, a rate-limiting middleware package for Express.js.

Instead of implementing the rate-limiting mechanism from scratch, I use the `rateLimit` middleware provided by the package and configure it according to the requirements of each endpoint.

This approach allows me to focus on defining appropriate limits for my application while relying on a well-established library to handle the underlying rate-limiting behavior.
