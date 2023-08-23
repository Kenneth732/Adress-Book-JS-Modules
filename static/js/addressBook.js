// src/addressBook.js

function AddressBook() {
    Object.defineProperty(this, 'contacts', {
      value: {},
      writable: true
    });
  
    Object.defineProperty(this, 'currentId', {
      value: 0,
      writable: true
    });
  }
  
  AddressBook.prototype.addContact = function (contact) {
    contact.id = this.assignId();
    this.contacts[contact.id] = contact;
  };
  
  AddressBook.prototype.assignId = function () {
    this.currentId += 1;
    return this.currentId;
  };


