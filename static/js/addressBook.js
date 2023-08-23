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
  
  AddressBook.prototype.findContact = function (id) {
    if (this.contacts[id] !== undefined) {
      return this.contacts[id];
    }
    return false;
  };
  
  AddressBook.prototype.deleteContact = function (id) {
    if (this.contacts[id] === undefined) {
      return false;
    }
    delete this.contacts[id];
    return true;
  };
  
  AddressBook.prototype.editContact = function (id, updatedData) {
    if (this.contacts[id] !== undefined) {
      const contact = this.contacts[id];
      for (const key in updatedData) {
        if (contact.hasOwnProperty(key)) {
          contact[key] = updatedData[key];
        }
      }
      return true;
    }
    return false;
  };
  
  module.exports = AddressBook;
  







