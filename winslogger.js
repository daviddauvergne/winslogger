const winston = require('winston');
var winsID;

const logFormatter = function(args){
	var date = new Date().toLocaleDateString(undefined,{
		day : 'numeric',
		month : 'numeric',
		year : 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	});
	var msg = '';
	if(Object.keys(args.meta).length !== 0){
		msg += '\n' + JSON.stringify(args.meta,null,'\t');
	}
	return date+' - '+args.level.toUpperCase()+' - '+winsID+' - '+args.message + msg;
};

module.exports = function(_winsID,log){
	winsID = _winsID;
	if(log.type=='file'){
		return new winston.Logger({
			transports: [
				new (winston.transports.File)({
					name: 'error-file-' + winsID,
					level: 'debug',
					filename: log.dir + '/' + winsID + '.log',
					handleExceptions: true,
					json: false,
					maxsize: 1000000,
					maxFiles: 5,
					colorize: false,
					formatter : logFormatter
				})
			],
			exitOnError: false
		});
	}
};
