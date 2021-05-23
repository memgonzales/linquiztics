# Linquiztics
Linquiztics &mdash; a play on <i>linguistics</i> and <i>quiz</i> &mdash; is a language learning web application that allows users to create their own quizzes and to answer those made by the community of users. It also features incentivization dynamics designed to gamify learning through customized quiz suggestions, experience points, streaks, leagues, and a global leaderboard. 

The deployed website can be accessed through this link: http://linquiztics.herokuapp.com.

## Task
**Linquiztics** is the major course output in a web development class. The students are tasked to create a web application of their choice, provided that it satisfies the minimum requirement of supporting the following operations: <i>log in, log out, register, CRUD (create, read, update, and delete),</i> and <i>search</i>. The application development is divided into three phases:

| Phase | Duration | Description |
| --- | --- | --- |
| 1 | 4 weeks | Implementation of the front-end view using HTML, CSS, and JavaScript (with hardcoded life-like data for each applicable feature) |
| 2 | 7 weeks |  Implementation of the back-end logic, including database operations (MongoDB), page rendering using a template engine (preferably Handlebars), and local server hosting (Node.js) |
| 3 | 3 weeks, coinciding with the last weeks of Phase 2 | Implementation of session management and password hashing, refactoring of the project following the MVC architectural pattern, and deployment of the application |

This project consists of the following folders:

| Folder | Description |
| --- | --- |
| <a href = "https://github.com/memgonzales/linquiztics/tree/master/controllers"><code>controllers</code></a> | Contains the JavaScript files that define callback functions for client-side requests |
| <a href = "https://github.com/memgonzales/linquiztics/tree/master/helpers"><code>helpers</code> | Contains the JavaScript files that define helper functions for front-end display and server-side validation | 
| <a href = "https://github.com/memgonzales/linquiztics/tree/master/misc"><code>misc</code></a> | Contains the JavaScript files for initial database population |
| <a href = "https://github.com/memgonzales/linquiztics/tree/master/models"><code>models</code></a> | Contains the JavaScript files for database modeling and access | 
| <a href = "https://github.com/memgonzales/linquiztics/tree/master/public"><code>public</code></a> | Contains the static CSS and JavaScript files, as well as the project assets (images and audio files), for front-end display |
| <a href = "https://github.com/memgonzales/linquiztics/tree/master/routes"><code>routes</code></a> | Contains the JavaScript file that defines the server response to each HTTP method request |
| <a href = "https://github.com/memgonzales/linquiztics/tree/master/views"><code>views</code></a> | Contains the Handlebars template files to be rendered and displayed upon request |

It also includes the following files:

| File | Description |
| --- | --- |
| <a href = "https://github.com/memgonzales/linquiztics/blob/master/.env"><code>.env</code></a> | Contains the working environment variables |
| <a href = "https://github.com/memgonzales/linquiztics/blob/master/package-lock.json"><code>package-lock.json</code></a> and <a href = "https://github.com/memgonzales/linquiztics/blob/master/package.json"><code>package.json</code></a> | Store information on the project dependencies |
| <a href = "https://github.com/memgonzales/linquiztics/blob/master/index.js"><code>index.js</code></a> | Entry point of the web application |

The complete project specifications can be found in the file <a href = "https://github.com/memgonzales/linquiztics/blob/master/Proposed%20Specifications.pdf"><code>Proposed Specifications.pdf</code></a>.

## Running the Application
### Running on the Web
Open the following website: http://linquiztics.herokuapp.com.

### Running Locally
1. Before running the application locally, the following software have to be installed:

   | Software | Description | Download Link | License |
   | --- | --- | --- | --- |
   | Node.js | JavaScript runtime built on Chrome's V8 JavaScript engine | https://nodejs.org/en/download/ | MIT License |
   | git *(optional)* | Distributed version control system | https://git-scm.com/downloads | GNU General Public License v2.0 |

2. Create a copy of this repository:
   - If git is installed, type the following command on the terminal:
   
     ```
     git clone https://github.com/DLSU-CCAPDEV/2021T2-G31
     ```
   - If git is not installed, click the green 'Code' button near the top right of the repository and choose 'Download ZIP'. Once the zipped folder has been downloaded, extract its contents.

3. On the main project directory, run the following command to **install the dependencies**: 

   ```
   npm install
   ```

   If the command is executed successfully, the dependencies will be installed into the folder <code>node_modules</code> following the dependency tree found in <code>package-lock.json</code>.

#### *THE PROJECT USES A PRE-POPULATED REMOTE DATABASE. Do steps 4 to 8 only after a database reset or migration to a local database.*

4. On the main project directory, run the following command to populate the database with **user accounts**: 

   ```
   node misc/add_profile_data.js
   ```

   If the command is executed successfully, the following will be printed on the terminal (the assigned <code>_id</code> may vary):
   ```
   Added {
       displayLanguages: [ 'English', 'Filipino' ],
       quizzesCreated: [ 2, 6 ],
       _id: 60a32d4fafac3e1430152ae4,
       name: 'Jace Gianina Yuchengco',
       picture: '../assets/doggo.jpg',
       username: 'jacegyuchengco',
       email: 'jacegyuchengco@gmail.com' 
       
   [... truncated ...]
   
   Database population complete! Press Ctrl + C to continue.
   ```

5. On the main project directory, run the following command to populate the database with **quizzes**:
   ```
   node misc/add_quiz_data.js
   ```
   
   If the command is executed successfully, the following will be printed on the terminal (the assigned <code>_id</code> may vary):

   ```
   Added {
       tags: [ 'animals', 'basic', 'German', 'introductory', 'vocabulary' ],
       subjectLanguages: [ 'German' ],
       ratings: [
           5, 5, 5, 5, 4,
           5, 5, 3, 1, 5
       ],
       accuracies: [
           100, 100, 86, 86, 71,
           71, 57, 43, 29
       ],
       _id: 60a9556188b8f82cdc92368d,
       idNum: 1,
       status: 'Published',
       title: 'Basic Animals',
       
   [... truncated ...]
   
   Database population complete! Press Ctrl + C to continue.
   ```
   
6. On the main project directory, run the following command to populate the database with **reported users**:
   ```
   node misc/add_userreport_data.js
   ```
   
   If the command is executed successfully, the following will be printed on the terminal (the assigned <code>_id</code> may vary):

   ```
   Added {
       _id: 60a959da39ac9f0c7cc6fa94,
       index: 1,
       name: 'Benny Terrier',
       username: 'bulljanai',
       reportDate: 2021-03-28T00:00:00.000Z,
       report: 'Hate speech',
       __v: 0
       
   [... truncated ...]
   
   Database population complete! Press Ctrl + C to continue.
   ```
   
7. On the main project directory, run the following command to populate the database with **reported quizzes**:
   ```
   node misc/add_quizreport_data.js
   ```
   
   If the command is executed successfully, the following will be printed on the terminal (the assigned <code>_id</code> may vary):

   ```
   Added {
       _id: 60a959f76ea1853bf06ced89,
       index: 1,
       quizNum: 3,
       title: 'Conyo 101',
       author: 'danccgabe',
       reportDate: 2021-03-31T00:00:00.000Z,
       report: 'Hate speech',
       __v: 0
       
   [... truncated ...]
   
   Database population complete! Press Ctrl + C to continue.
   ```
   
8. On the main project directory, run the following command to populate the database with **reported comments**:
   ```
   node misc/add_commentreport_data.js
   ```
   
   If the command is executed successfully, the following will be printed on the terminal:

   ```
   Added {
       _id: 60a960ec6bc1dc3340e1d967,
       index: 12,
       commentNum: 21001,
       quizNum: 2,
       comment: 'Not beginner-friendly, but very cool :)',
       author: 'japashiba',
       quiz: 'Anime Quotes',
       reportDate: 2021-05-22T19:52:12.556z,
       report: 'Inappropriate content',
       __v: 0
       
   [... truncated ...]
   
   Database population complete! Press Ctrl + C to continue.
   ```
  
   
9. On the main project directory, run the following command to **run the server**: 
   ```
   node index.js
   ```

   If the command is executed successfully, the following will be displayed on the terminal:
   
    ```
   app listening at port 3000
   Connected to: mongodb+srv://admin:admin@linquiztics.k1zxp.mongodb.net/linquiztics?retryWrites=true&w=majority
   ```
   
   
 10. Open the web application by accessing the following link on a browser:
     ```
     http://localhost:3000
     ```

     <img src="https://github.com/memgonzales/linquiztics/blob/master/website_screenshots/home.PNG?raw=True" alt="Homepage" width = 750> 
   
### Administrator Credentials  
To log in as an administrator, go to the <a href = "https://linquiztics.herokuapp.com/login">Login</a> page and enter the following credentials:
   - Username: <code>linquizticsadmin</code>
   - Password: <code>ASDFGHJKL123;</code>

## Built Using
This project follows the Model-View-Controller (MVC) architectural pattern:
- **Model:** <a href = "https://www.mongodb.com/">MongoDB</a> as the database program and <a href = "https://mongoosejs.com/">Mongoose</a> as the object data modeling tool
- **View:** <a href = "https://handlebarsjs.com/">Handlebars</a> as the template engine
- **Controller:** <a href = "https://nodejs.org/en/">Node.js</a> as the server environment

This web application is deployed on the cloud platform <a href = "https://dashboard.heroku.com/">Heroku</a>. Since Heroku has an ephemeral filesystem, <a href = "https://docs.mongodb.com/manual/core/gridfs/">GridFS</a> is used for the persistent storage of image and audio files.

## Dependencies
This project uses the following dependencies, which can be installed via the <code>npm install</code> command:

| Package | Version | Description | License |
| --- | --- | --- | --- |
| <code>bcrypt</code> | 5.0.1 | Package for hashing passwords | Apache License 2.0 |
| <code>body-parser</code> | 1.19.0 | Package for parsing incoming requests in a middleware before the handlers | MIT License |
| <code>connect-mongo</code> | 3.2.0 | MongoDB session store for Connect and Express | MIT License |
| <code>dotenv</code> | 8.2.0 | Package for loading environment variables from an <code>.env</code> file | BSD 2-Clause "Simplified" License |
| <code>express</code> | 4.17.1 | Unopinionated and minimalist framework for Node.js | MIT License |
| <code>express-session</code> | 1.17.1 | Session middleware for Express | MIT License |
| <code>express-validator</code> | 6.10.1 | Express middleware for validator, a library of string validators and sanitizers | MIT License |
| <code>gridfs-stream</code> | 1.1.1 | Package for streaming files to and from MongoDB GridFS | MIT License |
| <code>hbs</code> | 4.1.1 | Express view engine for Handlebars | MIT License |
| <code>mongodb</code> | 3.6.6 | Official MongoDB driver for Node.js | Apache License 2.0 |
| <code>mongoose</code> | 5.6.13 | MongoDB object modeling tool designed to work in an asynchronous environment | MIT License |
| <code>multer</code> | 1.4.2 | Middleware for handling <code>multipart/form-data</code>, primarily used for file uploads | MIT License |
| <code>multer-gridfs-storage</code> | 4.2.0 | GridFS storage engine for Multer to store uploaded files directly to MongoDB | MIT License |
| <code>nodemailer</code> | 6.6.0 | Package for sending emails with Node.js | MIT License | 

*The descriptions are taken from https://www.npmjs.com/.*

## Authors
- <b>Mark Edward M. Gonzales</b> <br/>
  mark_gonzales@dlsu.edu.ph <br/>
  gonzales.markedward@gmail.com <br/>
  
- <b>Hylene Jules G. Lee</b> <br/>
  hylene_jules_lee@dlsu.edu.ph <br/>
  lee.hylene@gmail.com
  
For queries or concerns related to the Linquiztics project, kindly email linquiztics.webmaster@gmail.com.
  
Assets (images and audio files) are properties of their respective owners. Attribution is found in the file <a href = "https://github.com/memgonzales/linquiztics/blob/master/public/assets/credits.txt"><code>public/assets/credits.txt</code></a> and displayed publicly on the <a href = "http://linquiztics.herokuapp.com/credits">Credits</a> page.
