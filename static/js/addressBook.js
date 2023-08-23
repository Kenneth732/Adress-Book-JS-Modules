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



