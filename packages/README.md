## Known Issues
- The database is included in the repository to facilitate the review of this challenge
- The validation of the requests can be improved by checking the shape of the received object in the backend
- Error Handling in the frontend can be improved. The current implementation displays the error message of 
the cached exception. It could display the error that comes from the backend as is more descriptive
- The UI/UX can be improved
- Testing can be improved. Not every component in the frontend or controller in the backend was tested.
- Vuetify has a weird bug when using in conjunction with vue-test-utils. Currently has been reported 
s couple of times in both of the repositories (vuetify and vue-test-utils) issues section. The issue is that 
sometimes a test fails with the error: `"TypeError: Cannot read property '_transitionClasses' of undefined"`.
For the scope of the unit testings of this project, a test for the sign in form fails if the test suite is ran, 
but will pass if only this test is executed in isolation.

 