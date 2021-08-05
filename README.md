# GROUPOMANIA

Groupomania is the seventh and last project of my Web Developper formation with Openclassrooms. 
I created a fullstack app which is a social network for an enterprise. It permits the users to:
- Signup
- Login
- Publish a post and remove it
- Comment post and remove these comments
- Delete their account

The application is also provided with an admin user who can :
- Remove posts, comments and accounts

The application must respect OWASP and GDPR norms.


## Built with

Back-end :
- JavaScript
- Framework : Express
- Server : NodeJS
- DataBase : MySQL

Front-end:
- HTML
- CSS/SCSS
- Javascript with the framework Vue

Tools:
- VSCode
- GitHub

## Built in

Github repo : TheophileCourtois_7_27072021


## Make it works

After cloning the repository: 

- Database Setup:

Start your MySQL server and import the database from database/groupomania.sql

In back-end/config/db.config.js modify the PASSWORD with the one of your root user.

- Front-end :
```
cd front-end
npm install -g @vue/cli
npm install
npm run serve

```

- Back-end :

```
cd back-end
npm install
nodemon server

```

You can now visit http://localhost:8080 and test the app.

If you want to access it with the admin user, connect with the following informations:
- email : admin@admin.com
- password : admin

## Author

[Théophile Courtois](https://www.linkedin.com/in/th%C3%A9ophile-courtois-595a9b136/)