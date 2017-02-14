var keys = require("./keys.js");
var Twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var command = process.argv[2];
var twit= new Twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
});
//console.log(twit);
var params = {count: 20, screen_name: 'isfturtle'};

if(command === "my-tweets"){
twit.get('statuses/user_timeline', params, function(error, tweets, response){
	//console.log(tweets);
	// for(tweet in tweets){
	// 	console.log(tweet.text);
	// }
	for(i=0; i<tweets.length; i++){
		console.log(tweets[i].text);
	}
});
}
else if(command === "spotify-this-song"){
	if(process.argv.length===3){
		var song = "The Sign"
	}
	else{
		var song = process.argv[3];
	}
	spotify.search({type: "track", query: song}, function(err,data){
		if(err){
			console.log("Error: "+err);
		}
		else{
			//console.log(data);
			var songInfo = data.tracks.items[0];
			console.log("Title: "+songInfo.name);
			console.log("Artists:");
			for(i=0;i<songInfo.artists.length;i++){
				console.log("    " +songInfo.artists[i].name);
			}
			console.log("Album: "+songInfo.album.name);
			console.log("Preview: "+songInfo.preview_url);
		}
	});
}
//else if(command === "")