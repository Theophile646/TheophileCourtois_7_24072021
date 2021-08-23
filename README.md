# 🌐 GROUPOMANIA

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


## 🛠 Built with

<div>
<img src="https://img.shields.io/badge/HTML5-282C34?logo=html5&logoColor=E34F26" alt="HTML5 logo" title="HTML5" height="25" />
<img src="https://img.shields.io/badge/CSS3-282C34?logo=css3&logoColor=1572B6" alt="CSS3 logo" title="CSS3" height="25" />
<img src="https://img.shields.io/badge/Sass-282C34?logo=sass&logoColor=CC6699" alt="Sass logo" title="Sass" height="25" />
<img src="https://img.shields.io/badge/JavaScript-282C34?logo=javascript&logoColor=F7DF1E" alt="JavaScript logo" title="JavaScript" height="25" />
<img src="https://img.shields.io/badge/Vue.js-282C34?logo=vue.js&logoColor=4FC08D" alt="Vue logo" title="VueJs" height="25" />
</div>
<br/>
<div>
<img src="https://img.shields.io/badge/Node.js-282C34?logo=node.js&logoColor=339933" alt="Node.js logo" title="Node.js" height="25" />
<img src="https://img.shields.io/badge/Express-282C34?logo=express&logoColor=FFFFFF" alt="Express.js logo" title="Express.js" height="25" />
<img src="https://img.shields.io/badge/MySQL-282C34?logo=mysql&logoColor=4479A1" alt="MySQL logo" title="MySQL" height="25" />
</div>
<br/>
<div>
<img src="https://img.shields.io/badge/Git-282C34?logo=git&logoColor=F05032" alt="git logo" title="git" height="25" />
<img src="https://img.shields.io/badge/GitHub-282C34?logo=github&logoColor=FFFFFF" alt="GitHub logo" title="GitHub" height="25" />
<img src="https://img.shields.io/badge/VS%20Code-282C34?logo=visual-studio-code&logoColor=007ACC" alt="Visual Studio Code logo" title="Visual Studio Code" height="25" />
</div>


## Built in

Github : TheophileCourtois_7_27072021


## :computer: Make it works

After cloning the repository : 

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

## :speech_balloon: Author

[Théophile Courtois](https://www.linkedin.com/in/th%C3%A9ophile-courtois-595a9b136/)
