function Person (name, number) {
	var self = this;
	
	self.name = name;
	self.number = number;
}

function ContactsModelView () {
	var self = this;

	var personList = [
		new Person("Robert Asaturyan", "077504950")
	];

	self.contacts = ko.observableArray(null);

	self.addContactShow = ko.observable(false);

	self.selectedPerson = ko.observable(null);

	self.goToDialer = ko.observable(true);

	self.addContactFormShow = ko.observable(false);

	self.number = ko.observable("");

	self.goToDialerTab = function () {
		self.contacts(null);
		self.goToDialer(true);
		self.addContactShow(false);
		self.addContactFormShow(false);
	}


	self.goToFullInfo = function (selectedPersonEvant) {
		self.selectedPerson(selectedPersonEvant);
		self.contacts(null);
		self.addContactShow(false);
		self.addContactFormShow(false);
	}
			
	self.goToContactsTab = function () {
		self.contacts(personList);
		self.goToDialer(false);
		self.selectedPerson(null);
		self.addContactShow(true);
		self.addContactFormShow(false);
	}

	self.addContact = function () {
		self.addContactShow(false);
		self.contacts(null);
		self.addContactFormShow(true);
	}

	self.addNewContactToList = function () {
		var newName = document.getElementById("newContactName").value;
		var newNumber = document.getElementById("newContactNumber").value;
		personList.push(new Person(newName, newNumber));
		self.contacts(personList);
		self.goToDialer(false);
		self.selectedPerson(null);
		self.addContactShow(true);
		self.addContactFormShow(false);
	}

	self.addNumber = function(data, event) {

        console.log("you clicked ");
        for(var i = 0; i < personList.length; i++) {
			console.log(self.number());
			if (personList[i].number.indexOf(self.number())) {
				console.log(personList[i].number);
			}
		}
    }
}

ko.applyBindings(new ContactsModelView ());

//$('.numberButton').click(function () {
//	var buttonValue =$(this).text().slice(0,1);
//	$('#numberInput').val($('#numberInput').val() + buttonValue);
//});