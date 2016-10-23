

function Person(name){
  this.name = name;
  this.followers = [];
  this.feedOfMessages = {};
};

Person.prototype.registerFollower = function(follower){
   var self = this;
   if(follower!==self)
   {
	   this.followers.push(follower);
	   console.log(follower.name+' now following '+self.name);
   }
   
};
Person.prototype.displayAllMessages = function(){
	var self = this;
	var i = 0;
	var following = Object.keys(this.feedOfMessages);
	while(i < following.length){
		console.log(self.name+' now Displaying messages of '+following[i]);
		var j = 0;
		while(j<this.feedOfMessages[following[i]].length){
			 console.log(this.feedOfMessages[following[i]][j]);
			j++;
		}
		
		i++;
	}
}
Person.prototype.recieveTweet = function(message, senderOfMessage){
	if(typeof message === "string"){
		console.log(this.name+' recieved tweet from '+senderOfMessage.name);
		if(!this.feedOfMessages[senderOfMessage.name]){
			this.feedOfMessages[senderOfMessage.name] = [];
		}
		this.feedOfMessages[senderOfMessage.name].push(message);
	}
	
}
Person.prototype.tweet = function(myMessage){
	var self = this;
	console.log(self.name+' tweeted ::'+myMessage);
	if(typeof myMessage === "string"){
		var i = 0;
		while(i<self.followers.length){
			self.followers[i].recieveTweet(myMessage, self);
			i++;
		}
	}
};
Person.prototype.startFollowing = function(toFollow){
	toFollow.registerFollower(this);
}

function main(){
	var presidentObama = new Person('Obama');
	var ramu = new Person('Ramu');
	ramu.startFollowing(presidentObama);
	presidentObama.tweet("Hello World");
	presidentObama.tweet("My Second Tweet");
	ramu.displayAllMessages();
	var shyamu = new Person('Shaymu');
	shyamu.startFollowing(presidentObama);
	shyamu.startFollowing(ramu);
	ramu.tweet('I am Ramu this is my first tweet');
	presidentObama.tweet('This is my third tweet');
	shyamu.displayAllMessages();
}

main();