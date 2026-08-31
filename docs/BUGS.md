# Bug logs
Bugs I encountered during developement and the solution to each one of them.

{
  ## Bug 001 
  - # the Bug:
  Change password API returning all field are required even tho frontend send complete data.

  - # The problems:
  the frontend sent current and new, but the backend expected oldPassword and newPassword from the req.body. because the backend can't read oldPassword and newPassword properties from the request, it causes the backend to return required field error.

  - # Solutions:
  make the data name consistent in both frontend and backend.
}

{
  ## Bug 002

* **# The Bug:**

  `userId` was `undefined` in the `verifyUserEmail` repository, which caused it to return **User not found**.

* **# The Problem:**

  After finding out that `verifyUserEmail` was receiving an `undefined` `userId`, I traced the value back to the `verifyToken` service, where `userId` was being passed to the repository.

  I logged `validTokenData` and discovered that the data returned from PostgreSQL contained `user_id`, not `userId`.

  Because of this, `validTokenData.userId` returned `undefined`, which meant I was passing `undefined` as the `userId` to the repository.

* **# Solution:**

  I changed the PostgreSQL query to return the columns using the same naming convention as the `EmailVerificationData` type.

  This allowed `validTokenData.userId` to correctly access the value returned from the database.

* **# Lesson Learned:**

  TypeScript only provides a structure for how I expect data to look within my application. It does not change, transform, or guarantee the shape of runtime data returned from external sources such as a database.

  The TypeScript type and the actual runtime data need to match, or I need to explicitly transform the data before using it.

}