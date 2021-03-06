function init(){
	var canvas = document.getElementById('graph').getContext('2d')
	var artistapi = new createXHR(parseartist);
	artistapi.xhr.open('GET','http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+artistName.replace(' ','+')+'&api_key='+lastfmkey+'&format=json',false);
	artistapi.xhr.send();
}
function parseartist(data){
	var artist = {
		'icon': data['artist']['image'][data['artist']['image'].length-1]['#text'],
		'plays': data['artist']['stats']['playcount']
	}
	document.getElementById('plays').innerHTML = artist.plays
	document.getElementById('icon').innerHTML = '<img src='+artist.icon+'>'
}
function createXHR(callback){
	this.callback = callback;
	if (window.XMLHttpRequest){
    	this.xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject){
    	this.xhr = new ActiveXObject("Microsoft.XMLHTTP");
	} else{
		alert('Can\'t find a way to send an XHR!');
	};
	that = this;
	this.xhr.onload = function(){
		that.callback.call(this,JSON.parse(that.xhr.responseText));
	};
};
window.onload = function(){
	init();
}