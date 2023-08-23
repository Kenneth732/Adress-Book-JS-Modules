(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
  








},{}],2:[function(require,module,exports){
// src/app.js

const AddressBook = require('./addressBook');
const Contact = require('./contact');

const addressBook = new AddressBook();

function handleFormSubmit(event) {
  event.preventDefault();

  const firstName = document.getElementById('firstNameInput').value;
  const lastName = document.getElementById('lastNameInput').value;
  const phoneNumber = document.getElementById('phoneInput').value;
  const email = document.getElementById('emailInput').value;

  const newContact = new Contact(firstName, lastName, phoneNumber, email);
  addressBook.addContact(newContact);

  document.getElementById('firstNameInput').value = '';
  document.getElementById('lastNameInput').value = '';
  document.getElementById('phoneInput').value = '';
  document.getElementById('emailInput').value = '';

  displayContacts(addressBook);
}

document.querySelector('#form').addEventListener('submit', handleFormSubmit);

function displayContacts(addressBook) {
  const contactContainer = document.querySelector('#contacts');
  contactContainer.innerHTML = '';

  for (const contactId in addressBook.contacts) {
    const contact = addressBook.contacts[contactId];
    const { firstName, lastName, phoneNumber, email } = contact;

    const contactElement = document.createElement('div');
    contactElement.innerHTML = `
      <h3>${firstName}</h3>
      <h3>${lastName}</h3>
      <p>Phone: ${phoneNumber}</p>
      <p>Email: ${email}</p>
      <button onclick='editContact(${contactId})'>Edit</button>
      <button onclick='deleteContact(${contactId})'>Delete</button>`;
    contactContainer.appendChild(contactElement);
  }
}

  // Function to edit a contact
  function editContact(contactId) {
    const contact = addressBook.findContact(contactId);
    if (contact) {
      const updatedFirstName = prompt('Enter the new first name:', contact.firstName);
      const updatedLastName = prompt('Enter the new last name:', contact.lastName);
      const updatedPhoneNumber = prompt('Enter the new phone number:', contact.phoneNumber);
      const updatedEmail = prompt('Enter the new email address:', contact.email);
  
      const updatedData = {
        firstName: updatedFirstName,
        lastName: updatedLastName,
        phoneNumber: updatedPhoneNumber,
        email: updatedEmail,
      };
  
      addressBook.editContact(contactId, updatedData);
      displayContacts(addressBook);
    } else {
      alert('Contact not found.');
    }
  }

  // Function to delete a contact
  function deleteContact(contactId) {
    const result = confirm('Are you sure you want to delete this contact?');
    if (result) {
      const deleted = addressBook.deleteContact(contactId);
      if (deleted) {
        displayContacts(addressBook);
      } else {
        alert('Contact not found.');
      }
    }
  }

},{"./addressBook":1,"./contact":3}],3:[function(require,module,exports){
// src/contact.js

function Contact(firstName, lastName, phoneNumber, email) {
    Object.defineProperty(this, 'firstName', {
      value: firstName,
      writable: true
    });
  
    Object.defineProperty(this, 'lastName', {
      value: lastName,
      writable: true
    });
  
    Object.defineProperty(this, 'phoneNumber', {
      value: phoneNumber,
      writable: true
    });
  
    Object.defineProperty(this, 'email', {
      value: email,
      writable: true
    });
  }
  
  Contact.prototype.fullName = function () {
    return this.firstName + ' ' + this.lastName;
  };
  
  module.exports = Contact;
  
},{}]},{},[2]);
