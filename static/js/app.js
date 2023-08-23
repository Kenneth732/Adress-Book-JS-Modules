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

        const contactElement = document.createElement('div');
        contactElement.classList.add('contact-card'); // Add the contact card class
        contactElement.innerHTML = `
            <h3>${contact.firstName} ${contact.lastName}</h3>
            <p>Phone: ${contact.phoneNumber}</p>
            <p>Email: ${contact.email}</p>
            <button id="editBtn-${contactId}">Edit</button>
            <button id="deleteBtn-${contactId}">Delete</button>`;
        contactContainer.appendChild(contactElement);

        // Attach event listeners to edit and delete buttons
        const editButton = contactElement.querySelector(`#editBtn-${contactId}`);
        const deleteButton = contactElement.querySelector(`#deleteBtn-${contactId}`);

        editButton.addEventListener('click', () => editContact(contactId));
        deleteButton.addEventListener('click', () => deleteContact(contactId));
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
