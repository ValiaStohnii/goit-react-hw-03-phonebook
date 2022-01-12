import React from 'react';
import Form from './Form';
import ContactList from './ContactList';
import { nanoid } from 'nanoid';
import Filter from './Filter';

class Phonebook extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmit = data => {
    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    const normalizeName = this.textNormalize(data.name);

    if (this.state.contacts.some(item => item.name.toLowerCase() === normalizeName)) {
      alert('This name is olready in contact');
      return;
    }
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  textNormalize = text => {
    return text.toLowerCase();
  };

  getFilteredContacts = () => {
    const { contacts } = this.state;
    const normalizedFilter = this.state.filter.toLowerCase();
    return contacts.filter(c => c.name.toLowerCase().includes(normalizedFilter));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(c => c.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;

    const filteredContacts = this.getFilteredContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <Form onSubmit={this.formSubmit} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList contacts={filteredContacts} onDeleteContact={this.deleteContact} />
      </div>
    );
  }
}

export default Phonebook;
