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
  