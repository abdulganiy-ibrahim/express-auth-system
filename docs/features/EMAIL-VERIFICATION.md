## Email Verification

### Problem

A user can create an account using any email address.
At this point, the server has no proof that the user actually
has access to that email address.

### Decision

I decided to implement email verification.

### Why Email Verification?

Email verification allows the system to confirm that the user
has access to the email address they provided during signup.

### Why Do I Need a Token?

The verification token acts as a temporary secret that connects
the verification link sent to the user's email with their account.

The token must be random and difficult to guess so that another
person cannot simply create or guess a verification link.

### Verification Flow

1. User signs up.
2. Server creates the user account.
3. Server generates a random verification token.
4. Server stores the token and its expiration time.
5. Server sends the verification link to the user's email.
6. User clicks the link.
7. Server receives the token.
8. Server checks that the token exists and has not expired.
9. Server marks the user's email as verified.
10. Server invalidates or deletes the token.

### Database

email_verification_tokens

- id
- user_id
- token
- created_at
- expires_at

### Security Considerations

- Token must be cryptographically random.
- Token should expire after a limited period.
- Token should only be usable once.
- Consider storing a hash of the token instead of the raw token.



### RESEND EMAIL VERIFICATION flows::

1. Server generate token for user
2. Server sends verification link to user's email
3. User click the link
4. navigate user to verifyEmail endpoint.