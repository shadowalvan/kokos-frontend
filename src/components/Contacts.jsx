import React, { useState, useEffect } from 'react';
import '../assets/styles/App.css'; // Import CSS file

export default function Contacts({ id }) {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/contacts', {
      headers: {
        'Authorization': 'Basic ' + btoa('staff:password') // Temporary
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch contacts');
        return res.json();
      })
      .then((data) => setContacts(data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <section id={id} className="contacts-section">
      <div className="container">
        <div className="section-header center">
          <h2 className="f-xl f-bold">Contact Submissions</h2>
          <p className="f-normal">Interested Schools so far:</p>
        </div>
        {error && <p className="error">{error}</p>}
        {contacts.length === 0 ? (
          <p className="no-data">No submissions yet.</p>
        ) : (
          // <div className="contacts-table-wrapper">
          //   <table className="contacts-table">
          //     <thead>
          //       <tr>
          //         <th>Name</th>
          //         <th>Email</th>
          //         <th>School</th>
          //         <th>Message</th>
          //         <th>Submitted At</th>
          //       </tr>
          //     </thead>
          //     <tbody>
          //       {contacts.map((contact) => (
          //         <tr key={contact.id}>
          //           <td>{contact.firstName} {contact.lastName}</td>
          //           <td>{contact.email}</td>
          //           <td>{contact.schoolName}</td>
          //           <td>{contact.message}</td>
          //           <td>{new Date(contact.submittedAt).toLocaleString()}</td>
          //         </tr>
          //       ))}
          //     </tbody>
          //   </table>
          // </div>
              <div className="contacts-grid">
                {contacts.map((contact) => (
                  <div key={contact.id} className="contact-card">
                    <h3 className='center f-bigest'>{contact.firstName} {contact.lastName}</h3>
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>School:</strong> {contact.schoolName}</p>
                    <p><strong>Message:</strong> {contact.message}</p>
                    <p><strong>Submitted:</strong> {new Date(contact.submittedAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
        )}
      </div>
    </section>
  );
}