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

