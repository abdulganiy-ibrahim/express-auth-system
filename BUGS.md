# Bug logs
Bugs I encountered during developement and the solution to each one of them.

## Bugs 001
- # the Bugs:
Change password API returning all field are required even tho frontend send complete data.

- # The problems:
the frontend sent current and new, but the backend expected oldPassword and newPassword from the req.body. because the backend can't read oldPassword and newPassword properties from the request, it causes the backend to return required field error.

- # Solutions:
make the data name consistent in both frontend and backend.