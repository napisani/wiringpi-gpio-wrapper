'use strict';
/**
 * This module is intended to be used with the wiringPi GPIO utility on a Raspberry Pi
 *	@author napisani
 *
 */
var cmdInfo = function(){
	return{ 
		cmd : 'gpio',
		maxTimeout: '3000',
		direction: {
			output: 'output',
			input: 'input'
		},
		value: {
			HIGH: 1,
			LOW: 0
		},
		fn: {
			'export' : 'export',
			'write' : 'write',
			'read' : 'read',
			'unexport' : 'unexport',
			'unexportall' : 'unexportall'
		}
	};
};

var execGpio = require('child_process').execSync;
var childProc;

var exports = {
	setupPin : function(pin, direction) {
		if(cmdInfo.direction[direction]){
			execGpio(cmdInfo.cmd ' ' + cmdInfo.fn['export'] + ' ' + pin + ' ' + cmdInfo.direction[direction],{
				timeout: cmdInfo.maxTimeout;
			});
		} else {
			throw Error("an invalid direction was passed: " + direction + " please use one of the following directions" +  cmdInfo.directions);
		}
	},
	closePin : function(pin){
		if(cmdInfo.direction[direction]){
			execGpio(cmdInfo.cmd ' ' + cmdInfo.fn['unexport'] + ' ' + pin,{
				timeout: cmdInfo.maxTimeout;
			});
		} else {
			throw Error("an invalid direction was passed: " + direction + " please use one of the following directions" +  cmdInfo.directions);
		}
	},
	closeAll : function() {
		execGpio(cmdInfo.cmd ' ' + cmdInfo.fn['unexportall'],{
			timeout: cmdInfo.maxTimeout;
		});
	},
	write: function(pin, value) {
		if(cmdInfo.value[value] != undefined){
			execGpio(cmdInfo.cmd ' ' + cmdInfo.fn['write'] + ' ' + value ,{
				timeout: cmdInfo.maxTimeout;
			});
		} else {
			throw Error("invalid value passed to be written: " + value);
		}
	},
	read: function(pin){
		var stdoutContent = execGpio(cmdInfo.cmd ' ' + cmdInfo.fn['read'] + ' ' + pin,{
			timeout: cmdInfo.maxTimeout;
		});
		return parseInt(stdoutContent);
	}
}

module.exports = exports;