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
}

ko.applyBindings(new ContactsModelView ());