import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

export const App = () => {
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const contacts = localStorage.getItem('contacts');
        const parsedContacts = JSON.parse(contacts);
        if (parsedContacts !== null) {
          setContacts(parsedContacts);
        }
      }, []);
    
    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
      }, [contacts]);

    const addContact = ({ name, number }) => {
        if (contacts.some(
            contact =>
            contact.name.toLowerCase() === name.toLowerCase() ||
            contact.number.toLowerCase() === number.toLowerCase()
            )
            ) {
              alert(`${name} or entered number is already in contacts.`);
              return;
            }
    
        const newContact = {
          id: nanoid(),
          name,
          number,
        };
        setContacts([newContact, ...contacts]);
      };

    const contactsFilterHandler = event => {
        const { value } = event.currentTarget;
        setFilter(value);
      };

    const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
    );

      
    const deleteContact = id => {
        setContacts(prevState => prevState.filter(contact => contact.id !== id));
      };

    return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 40,
            color: '#010101'
          }}
        >
          
          <div>
            <h1>Phonebook</h1>
            <ContactForm onAdd={addContact} />
    
            <h2>Contacts</h2>
            <Filter onChange={e => {contactsFilterHandler(e);}}/>
            <ContactList contacts={filteredContacts} deleteContact={deleteContact}/>
          </div>
                
        </div>
      );
}