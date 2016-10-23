/*
 Note: Please verify below understandings with some official documentation. Below is solely for individual's practice purpose.
 
 
 
 Singleton Pattern revolves around an Entity of which one and only one instance can exist.
 Lets depict journey of Kohinoor a rare diamond. 
 CommonMan can discover the Kohinoor only or can gift Diamond to king of same place
 It can only be transferred with treaty between two kings.
*/

function Kohinoor(){
  var self = this;
  if(!Kohinoor.instance){
    Kohinoor.instance = {
	   possessor:null,
	   setPossessedBy: function(kingOrCommonMan){
	     this.possessor = kingOrCommonMan;
		 console.log('Kohinoor now possessedBy '+this.possessor.name+' of '+this.possessor.place);
	   },
	   possessedBy: function(){
	     return this.possessor;
	   }
	}
  }
  
  self = Kohinoor.instance;
  return Kohinoor.instance;

}

function Person(name,place){
	var self = this;
	if(!name || !place)
		self = null;
	else{
		self.name = name;
		self.place = place;
		self.hasKohinoor = false;
	}
			
}
Person.prototype.getName = function(){
	return this.name;
}
Person.prototype.getPlace = function(){
	return this.place;
}
Person.prototype.findKohinoor = function(){
	var kohinoor = new Kohinoor();
	kohinoor.setPossessedBy(this);
	this.hasKohinoor = true;
}




function log(firstperson, secondPerson, as){
	console.log(firstperson.name+' gifted kohinoor to '+secondPerson.name+' as '+as);
}
function CommonMan(name, place){
	var self = this;
	if(!name || !place)
		self = null;
	else{
		self.name = name;
		self.place = place;
		self.hasKohinoor = false;
	}	
}
CommonMan.prototype = Object.create(new Person('default','default'));
CommonMan.prototype.giftToKing = function(king){
	var self = this;
	
	/**
	if king or common man belong to same place
	*/
	if(self.hasKohinoor && king instanceof King && king.getPlace() == self.getPlace()){
		var kohinoor = new Kohinoor();
		log(self, king, 'gift');
		kohinoor.setPossessedBy(king);
		self.hasKohinoor = false;
		king.hasKohinoor = true;
		
		
	}else{
		console.log("No Kohinoor Gifted");
	}
}
CommonMan.prototype.constructor = CommonMan;

function King(name, place){
		var self = this;
	if(!name || !place)
		self = null;
	else{
		self.name = name;
		self.place = place;
		self.hasKohinoor = false;
	}
	
}
King.prototype = Object.create(new Person('default','default')); //Limitation of Javascript inheritance
King.prototype.constructor = King;
King.prototype.makeTreaty = function(king2){
	var self = this;
	if(self.hasKohinoor && king2 instanceof King){
		var kohinoor = new Kohinoor();
		log(self, king2, 'Treaty');
		kohinoor.setPossessedBy(king2);
		self.hasKohinoor = false;
		king2.hasKohinoor = true;
		
	}else{
		console.log("No treaty");
	}
}

function main(){
  var ramuTheCommonMan = new CommonMan('Ramu','India');
  var shahJahanTheKing = new King('Shahjahan','India');
  var ranjitSinghTheKing = new King('RanjitSingh','India');
  var queenVictoriaTheKing = new King('Victoria','Britain');
  ramuTheCommonMan.findKohinoor();
  ramuTheCommonMan.giftToKing(shahJahanTheKing);
  shahJahanTheKing.makeTreaty(ranjitSinghTheKing);
  ranjitSinghTheKing.makeTreaty(queenVictoriaTheKing);
  
}

main();


