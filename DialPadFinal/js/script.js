function Person(name, number) {
    this.name = name;
    this.number = number;
}

function ContactDialerViewModel () {
   
    var self = this;

    this.currentTab = ko.observable(0);

    this.setCurrentTabContacts = function () {
        self.currentTab(1);
    }

    this.setCurrentTabDialer = function () {
        self.currentTab(0);
    }

    this.buttonsColumn1 = ko.observableArray([
        {"number":1, "text":""},        
        {"number":4, "text":'GHI'}, 
        {"number":7, "text":'PQRS'},
        {"number":"*", "text":'P'},
    ]);

    this.buttonsColumn2 = ko.observableArray([
        {"number":2, "text":'ABC'},
        {"number":5, "text":'JKL'},
        {"number":8, "text":'TUV'},
        {"number":0, "text":'+'},
    ]);

    this.buttonsColumn3 = ko.observableArray([
        {"number":3, "text":'DEF'},
        {"number":5, "text":'JKL'},
        {"number":9, "text":'WXYZ'},
        {"number":"#", "text":""}
    ]);

    var contactList = [
        new Person("Robert", "077504950")
    ];

    this.contacts = ko.observableArray(contactList);

    this.addContact = function () {
        self.currentTab(2);
    }

    this.addNewContactName = ko.observable("");

    this.addNewContactNumber = ko.observable("");

    this.inputedNumber = ko.observable("");

    this.addNewContactToList = function () {
        if (!isNaN(self.addNewContactNumber()) && self.addNewContactName()) {
            contactList.push(new Person(self.addNewContactName(), self.addNewContactNumber()));
            self.contacts(contactList);
            self.currentTab(1);
        } else {
            alert('Please Add Valid Name And Number');
        }
        
    }

    this.addNumberToDialer = function (data) {
        self.inputedNumber(self.inputedNumber() + data.number);
    }

    this.deleteInputedLastNumber = function () {
        self.inputedNumber(self.inputedNumber().substring(0, self.inputedNumber().length - 1));
    }

    var foundedPersonsList = [];

    this.foundedPersons = ko.observableArray(foundedPersonsList);

    this.foundedFirstPersonName = ko.observable("");

    this.foundedFirstPersonNumber = ko.observable("");

    this.foundedPersonsCount = ko.observable("");

    this.inputedNumber.subscribe(function(newNumber) {
        foundedPersonsList = [];
        self.foundedFirstPersonName("");
        self.foundedFirstPersonNumber("");
        self.foundedPersonsCount("");
        if (newNumber.length !== 0) {
            for(var i = 0; i < contactList.length; i++) {
                if (contactList[i].number.indexOf(newNumber) >= 0) {
                    foundedPersonsList.push(contactList[i]);
                    self.foundedFirstPersonName(foundedPersonsList[0].name);
                    self.foundedFirstPersonNumber(foundedPersonsList[0].number);
                    self.foundedPersonsCount(foundedPersonsList.length);
                };
            }
        };
    });

    this.showAllFoundedPersons = ko.observable(false);

    this.showPersons = function () {
        if (foundedPersonsList.length > 0) {
            self.showAllFoundedPersons(!self.showAllFoundedPersons());
        };
        self.foundedPersons(foundedPersonsList);
    }

}