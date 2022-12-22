const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Profile = require('./ProfileSchema.js');

const path = require('path');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

dotenv.config();
const url = process.env.DB_URL;

const options = {
	useNewUrlParser: true,
    useUnifiedTopology: true
};

const database = {
    connect: function () {
        mongoose.connect(url, options, function(error) {
            if (error) throw error;
            console.log('Connected to: ' + url);
        });
		
		var connection = mongoose.createConnection(url);
		
		/* Initialize gfs */
		var gfs;
		
		connection.once('open', function() {
			/* Initialize stream */
			gfs = Grid(connection.db, mongoose.mongo);
			gfs.collection('uploads');
		})
		
		/* Create storage engine */
		const storage = new GridFsStorage({
			url: url,
			file: (req, file) => {
				return new Promise((resolve, reject) => {
					crypto.randomBytes(16, (err, buf) => {
						if (err) {
							return reject(err);
						}
						const filename = buf.toString('hex') + path.extname(file.originalname);
						const fileInfo = {
							filename: filename,
							bucketName: 'uploads'
						};
						resolve(fileInfo);
					});
				});
			}
		});
		
		const upload = multer({ storage });
		
		return upload;
    },

    insertOne: function(model, doc, callback) {
        model.create (doc, function(error, result) {
            if (error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    insertMany: function (model, docs, callback) {
        model.insertMany (docs, function(error, result) {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    findOne: function(model, query, projection, callback) {
        model.findOne (query, projection, function(error, result) {
            if (error) return callback(false);
            return callback(result);
        });
    },

    findMany: function(model, query, projection, callback) {
        model.find (query, projection, function(error, result) {
            if (error) return callback(false);
            return callback(result);
        });
    },

    updateOne: function(model, filter, update, callback) {
        model.updateOne (filter, update, function(error, result) {
            if (error) return callback(false);
            console.log('Document modified: ' + result.nModified);
            return callback(true);
        });
    },

    updateMany: function(model, filter, update, callback) {
        model.updateMany (filter, update, function(error, result) {
            if (error) return callback(false);
            console.log('Documents modified: ' + result.nModified);
            return callback(true);
        });
    },

    deleteOne: function(model, conditions, callback) {
        model.deleteOne (conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    deleteMany: function(model, conditions, callback) {
        model.deleteMany (conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    }

}

module.exports = database;