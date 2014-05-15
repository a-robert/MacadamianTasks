function Genre (name) {
	var self = this;

	Object.defineProperty(this, "name", {value: name, writable: false});

	this.artists = [];

	this.addPopularArtist = function (artistName) {
		for(var i = 0; i < self.artists.length; i++) {
			if (self.artists.indexOf(artistName) < 0) {
				var filter = true;
			}
			else { 
				var filter = false;
			}
		}
		if (self.artists.length == 0) filter = true;

		if (filter) {
			if (artistName) {
				self.artists.push(artistName);
				console.log("Artsit " + artistName + " is added to " + self.name + " genre");
			}
			else {
				console.log("Please add artist name");
			}
		} 
		else {
			console.log("Artist "+artistName+ " is already exist"); 
		}
	};

	this.history = "";

	this.addHistory = function (genreHistory) {
		if (genreHistory) {
			self.history = genreHistory;
			console.log("History to genre " + self.name + " added");
		}
		else {
			console.log("Please add history");
		}
	};

	this.print = function () {
		if (self.artists.length > 0) {
			console.log("Here the list of popular artists in genre " + self.name);
			var list = "";
			for(var i = 0; i < self.artists.length; i++) {
				list = list + self.artists[i] + ", ";
			};
			list = list.substring(0, list.length - 2);
			console.log(list);
		}
		else {
			console.log("In genre " + self.name + " no popular artists");
		};

		if (self.history) {
			console.log("In genre " + self.name + " history is " + self.history);
		}
		else {
			console.log("In genre " + self.name + " we dont have any history");
		};

		if (self.listOfInstruments) {
			if (self.listOfInstruments.length > 0) {
				console.log("Here the list of instruments in genre " + self.name);
				var list = "";
				for(var i = 0; i < self.listOfInstruments.length; i++) {
					list = list + self.listOfInstruments[i] + ", ";
				};
				list = list.substring(0, list.length - 2);
				console.log(list);
			} else {
				console.log("In genre " + self.name + " we don't have instruments");
			};
		};
	};

	this.hasInfo = function (info) {
		if (info) {
			for(var i = 0; i < self.artists.length; i++) {
				if(self.artists[i].indexOf(info) >= 0) {
					return true;
				};
			};

			if (self.history.indexOf(info) >=0) {
				return true;
			};

			//Looking in alternative places
			if (self.listOfInstruments) {
				for(var i = 0; i < self.listOfInstruments.length; i++) {
					if(self.listOfInstruments[i].indexOf(info) >= 0) {
						return true;
					}
					else return false;
				}
			} else {
				return false;
			};
		}
		else {
			console.log("Add info");
		};
	};

	this.deletePopularArtist = function (index) {
		if (index < self.artists.length) {
			self.artists.splice(index, 1);
		} else {
			console.log("No such artist");
		};
	};

	self.constructor = Genre;

};

var listOfValidInstruments = ["Guitar", "Saxaphone", "Drumms", "Violin", "Piano"];

function Instrumental (name) {
	var self = this;

	Genre.call(this, name); 

	this.listOfInstruments = [];

	this.addInstrument = function (instrumentName) {
		if (instrumentName) {
			if (listOfValidInstruments.indexOf(instrumentName) >= 0) {
				self.listOfInstruments.push(instrumentName);
				console.log("Instrument added");
			} else {
				console.log("This instrument name is not valid");
			}
		} else {
			console.log("Add instrument name");
		};
	};
};

Instrumental.prototype = Object.create(Genre.prototype);

var instrumental = new Instrumental("Instrumental");

var folk = new Instrumental("Folk");
Object.defineProperty(folk, "origin", {value: "America", writable: true});
Object.defineProperty(folk, "addOrigin", 
	{value: function (origin) {
		if (origin) {
			this.origin = origin;
		} else {
			console.log("Add origin");
		};
}});

var rock = new Genre("Rock");

var rap = new Genre("Rap");

var alternative = new Genre("Alternative");