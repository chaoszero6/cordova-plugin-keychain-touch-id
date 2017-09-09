var argscheck = require('cordova/argscheck'),
               exec = require('cordova/exec');

var touchid = {
	isAvailable: function(successCallback, errorCallback){
		exec(successCallback, errorCallback, "TouchID", "isAvailable", []);
	},
	save: function(key,password, successCallback, errorCallback, message, dialogTitle) {
		exec(successCallback, errorCallback, "TouchID", "save", [key,password,message,dialogTitle]);
	},
	verify: function(key,message,successCallback, errorCallback, dialogTitle){
		exec(successCallback, errorCallback, "TouchID", "verify", [key,message,dialogTitle]);
	},
	has: function(key,successCallback, errorCallback){
		exec(successCallback, errorCallback, "TouchID", "has", [key]);
	},
	delete: function(key,successCallback, errorCallback){
		exec(successCallback, errorCallback, "TouchID", "delete", [key]);
	},
	setLocale: function(locale,successCallback, errorCallback){
		exec(successCallback, errorCallback, "TouchID", "setLocale", [locale]);
	}
};

module.exports = touchid;
