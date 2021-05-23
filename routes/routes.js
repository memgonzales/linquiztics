const express = require('express');

const controller = require('../controllers/controller.js');
const createAccountController = require('../controllers/createAccountController.js');
const loginController = require('../controllers/loginController.js');
const profileController = require('../controllers/profileController.js');
const quizController = require('../controllers/quizController.js');
const logoutController = require('../controllers/logoutController.js');
const leaderboardController = require('../controllers/leaderboardController.js');
const quizzesController = require('../controllers/quizzesController.js');
const validation = require('../helpers/validation.js');
const filesController = require('../controllers/filesController.js');
const db = require('../models/db.js');

const app = express();

app.get('/', controller.getIndex);
app.get('/credits', controller.getCredits);

app.get('/login', loginController.displayLogin);
app.post('/checkLogin', loginController.postLogin);

app.get('/files/:filename', filesController.getFile);

app.get('/createAccount', createAccountController.getCreateAccount);
app.post('/createAccount', db.connect().single('profilePicture'), validation.createAccountValidation(), createAccountController.postCreateAccount);
app.get('/getCheckUsername', createAccountController.getCheckUsername);

app.get('/publicProfile/:username', profileController.getPublicProfile);
app.get('/myProfile/:username', profileController.getMyProfile);
app.post('/checkName', profileController.postCheckName);
app.post('/checkEmail', profileController.postCheckEmail);
app.post('/checkPassword', profileController.postCheckPassword);
app.post('/checkDisplayLanguages', profileController.postCheckDisplayLanguages);
app.post('/checkProfilePicture', db.connect().single('newProfilePicture'), profileController.postCheckProfilePicture);
app.post('/deleteAccount', profileController.postDeleteAccount);
app.get('/admin', profileController.getAdmin);
app.post('/deleteUserAdmin', profileController.postDeleteUserAdmin);
app.post('/unpublishQuizAdmin', profileController.postUnpublishQuizAdmin);
app.post('/deleteCommentAdmin', profileController.postDeleteCommentAdmin);
app.post('/reportUser', profileController.postReportUser);

app.get('/quizTeaser/:idNum', quizController.getQuizTeaser);
app.post('/addComment', quizController.postAddComment);
app.post('/editComment', quizController.postEditComment);
app.post('/deleteComment', quizController.postDeleteComment);
app.get('/quiz/:idNum', quizController.getQuiz);
app.get('/quizSummary/:idNum', quizController.getQuizSummary);
app.get('/myQuizzes', quizController.getMyQuizzes);
app.post('/deleteAllQuizzes', quizController.postDeleteAllQuizzes);
app.post('/unpublishAllQuizzes', quizController.postUnpublishAllQuizzes);
app.get('/quizCreator/:idNum', quizController.getQuizCreator);
app.post('/editBasicDetails', quizController.postEditBasicDetails);
app.post('/editDescription', quizController.postEditDescription);
app.post('/publishQuiz', quizController.postPublishQuiz);
app.post('/unpublishQuiz', quizController.postUnpublishQuiz);
app.post('/deleteQuiz', quizController.postDeleteQuiz);
app.post('/editQuestion', quizController.postEditQuestion);
app.post('/editQuizItemComment', quizController.postEditQuizItemComment);
app.post('/deleteQuizItemComment', quizController.postDeleteQuizItemComment);
app.post('/addQuizItemComment', quizController.postAddQuizItemComment);
app.post('/editImage', db.connect().single('imageFileUpload'), quizController.postEditImage);
app.post('/editAudio', db.connect().single('audioFileUpload'), quizController.postEditAudio);
app.post('/showSummary', quizController.postShowSummary);

// app.post('/editMultimedia', quizController.postEditMultimedia);
app.post('/editAnswer', quizController.postEditAnswer);
app.post('/deleteQuizItem', quizController.postDeleteQuizItem);
app.post('/addQuestion', quizController.postAddQuestion);
app.post('/createQuiz', quizController.postCreateQuiz);

app.post('/addRating', quizController.postAddRating);
app.post('/deleteRating', quizController.postDeleteRating);

app.post('/reportQuiz', quizController.postReportQuiz);
app.post('/reportComment', quizController.postReportComment);

app.get('/leaderboard', leaderboardController.getLeaderboard);

app.get('/quizzes', quizzesController.getQuizzes);

app.get('/logout', logoutController.getLogout);

module.exports = app;