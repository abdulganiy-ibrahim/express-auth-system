# Reset Password

## Password Reset Flow

### 1. Request Password Reset

* The user requests to reset their password by providing their email.
* The server gets the user's email, processes the request, generates a one-time password (OTP), and sends it to the user's email.

### 2. Verify One-Time Password (OTP)

* The user enters the OTP they received and requests verification.
* The server gets the OTP from the request body, checks the OTP validity, generates a `resetToken`, saves the `resetToken` in a cookie, and returns a success message.

### 3. Update User Password

* The user enters their new password and requests to update their password.
* The server gets the `newPassword` from the request body and gets the `resetToken` from the cookie. It makes sure both `newPassword` and `resetToken` are defined and valid. If they are, it updates the user's password and returns a success message.

---

## API Endpoints, Their Responsibilities, and Logic

### `/forgot-password`

#### Responsibility

It handles the forgot password request from the user, generates an OTP, and sends the OTP to the user.

#### Logic

1. The server gets the email from the request body and makes sure the email is defined.

2. The server validates the email. It makes sure the email provided is in the correct format and normalizes the email.

3. The server gets the user from the database using the `validatedEmail`. If the database returns `null`, the server returns the message:

   `"If an account with that email exists, an OTP code has been sent to the email."`

   The reason for returning this message is to prevent an attacker from finding out whether a user exists.

4. The server generates a 6-digit OTP using `crypto`, hashes the OTP, and sets an expiration time of 10 minutes.

5. The server stores the `hashedOTP`, `user.id`, and expiration time in the `password_reset_otps` table.

6. The server sends `user.email` and the OTP to `SendPasswordResetOTP` for OTP delivery.

---

### `SendPasswordResetOTP`

This is an email service function. It is responsible for sending the OTP code to the user's email.

#### Flow

1. It gets the OTP and email from the `requestPasswordReset` service.

2. It constructs the message template.

3. It sends the OTP to the provided email through the email service provider.

---

### Database Table

```text
password_reset_otps (
  id,
  user_id,
  hashed_otp,
  created_at,
  expires_at,
  used
)
```

---

### `/verify-password-otp`

#### Responsibility

This API endpoint is responsible for verifying the OTP entered by the user and generating a unique token for resetting the password.

#### Logic

1. The server gets the OTP from the request body and makes sure the OTP is defined.

2. The server gets `passwordResetOTPData` using the OTP provided from the `password_reset_otps` table. It returns an error if the database query returns `null`.

3. The server checks if the OTP has expired. If it has expired, it returns an error.

4. The server checks if the OTP has not been used. If it has been used, it returns an error.

5. The server updates `passwordResetOTPData.used` to `true`.

6. The server generates a `resetToken`, hashes the token, and sets an expiration time.

7. The server stores the `hashedToken`, `passwordResetOTPData.id`, and expiration time in the `password_reset_tokens` table.

8. The server sets the original `resetToken` in a cookie and returns a success message.

---

### Database Table

```text
password_reset_tokens (
  id,
  user_id,
  token,
  created_at,
  expires_at,
  used
)
```

---

### `/reset-password`

#### Responsibility

This API endpoint is responsible for updating the user's password.

#### Logic

1. The server gets the `newPassword` from the request body and gets the `resetToken` from the cookie. It makes sure both data are defined.

2. The server validates the `newPassword` and saves the `validatedPassword`.

3. The server hashes the reset token and gets `passwordResetToken` using the `hashedResetToken`.

4. The server returns an error if `passwordResetToken` is undefined, if it has expired, or if it has been used.

5. The server gets the user's password using `passwordResetToken.user.id`. It handles the case where the user's password is undefined.

6. The server compares `validatedPassword` and `userPassword`. If they match, the server returns an error.

7. The server hashes the `validatedPassword`.

8. The server sends the `hashedPassword` and `passwordResetToken.user.id` to the `updateUserPassword` repository.

---

### `updateUserPassword`

It is responsible for updating the user's password.

* It gets the `user.id` and `hashedPassword` from the `resetPassword` service.
* It gets the user with the same ID and sets their password to `hashedPassword`.
