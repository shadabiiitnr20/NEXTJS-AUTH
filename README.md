### Getting Started

- First understand the project directory structure. All the api logic and front end logic will go inside the app folder.
- Second make the user model. The models folder and the app folder will be on the same level.
- Define the ```userSchema```. Export the userSchema by checking if the connection is made for the first time or connection has already been made.
- Make a config folder inside the src directory. It contains the dbConfig connection method. Export the function.
- Make a utils folder inside the src directory. It contains the mailer.ts file. 
- Inside the ```mailer.ts``` file, make the ```sendEmail``` function defining the mailing logic.
- Write the logic for Signup api and after adding the user to the DB, send the verification mail.
- Write the logic of sending verification mail in the ```mailer.ts``` file.
- Test the signup route using postman. Make a separate postman collection for your project.
- next make apis for other routes in the project - login, logout, verifyEmail, aboutme. Write the api logic in each file's route.tsx.
- To be continued