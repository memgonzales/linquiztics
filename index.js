const express = require('express');
const hbs = require('hbs');
const routes = require('./routes/routes.js');
const dotenv = require('dotenv');
const db = require('./models/db.js');
const session = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const MongoStore = require('connect-mongo')(session);
const Profile = require('./models/ProfileSchema.js');

const bodyParser = require('body-parser');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const app = express();

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME || 3000;

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

hbs.handlebars.registerHelper('checkIfUserComment', function(user, commenter) {
	return user == commenter;
})

hbs.handlebars.registerHelper('questionItem', function(indexNum) {
    return indexNum + 1;
})

hbs.handlebars.registerHelper('checker', function(link) {
    if (link != "")
        return true;
    else
        return false;
})

hbs.handlebars.registerHelper('choiceConvert', function(raw) {
    if (raw == "choice-a")
        return 'A';
    else if (raw == "choice-b")
        return 'B';
    else if (raw == "choice-c")
        return 'C';
    else
        return 'D';
})

app.use(bodyParser.json());

app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '../public'));

app.use(session({
    'secret': 'linquiztics',
    'resave': false,
    'saveUninitialized': false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use('/', routes);

app.use(function (req, res) {
	res.status(404);
	
	var details = {};

    if(req.session.username == undefined) {
        details.flag = false;
        details.adminflag = false;
        res.render('error', details);
    }

    else {
		if (req.session.username != "linquizticsadmin") {
            var firstname = req.session.name.split(" ", 1);
        
            var details = {
                    flag: true,
                    adminflag: false,
                    username: req.session.username,
                    firstname: firstname,
                    picture: req.session.picture,
                    name: req.session.name,
                    streak: req.session.streak,
                    exp: req.session.exp,
                    league: req.session.league,
                    position: req.session.position
            }
        }
        
        else {
            var firstname = req.session.name.split(" ", 1);
        
            var details = {
                    flag: true,
                    adminflag: true,
                    username: req.session.username,
                    firstname: firstname,
                    picture: req.session.picture,
                    name: req.session.name,
                    streak: req.session.streak,
                    exp: req.session.exp,
                    league: req.session.league,
                    position: req.session.position
            }
        }

        res.render('error', details);
    }
});

db.connect();

app.listen(port, function () {
    console.log('app listening at port ' + port);
});