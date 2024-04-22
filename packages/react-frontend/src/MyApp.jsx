// // src/MyApp.jsx
// import React, {useState, useEffect} from 'react';
// import Table from "./Table";
// import Form from "./Form";



// // const characters = [
// //     {
// //       name: "Charlie",
// //       job: "Janitor"
// //     },
// //     {
// //       name: "Mac",
// //       job: "Bouncer"
// //     },
// //     {
// //       name: "Dee",
// //       job: "Aspring actress"
// //     },
// //     {
// //       name: "Dennis",
// //       job: "Bartender"
// //     }
// //   ];


// // function updateList(person) {
// //     setCharacters([...characters, person]);
// //   }


// function MyApp() {
//     const [characters, setCharacters] = useState([]);
//     //   {
//     //     name: "Charlie",
//     //     job: "Janitor" // the rest of the data
//     //   },
//     //   {
//     //     name: "Mac",
//     //     job: "Bouncer" // the rest of the data       
//     //   },
//     //   {
//     //     name: "Dee",
//     //     job: "Aspiring actress"
//     //   },
//     //   {
//     //     name: "Dennis",
//     //     job: "Bartender"
//     //   },
//     //   {
//     //     name: "Emi",
//     //     job: "Madonna Inn Waitress"
//     //   }
//     // ]);
//     function fetchUsers() {
//       return fetch("http://localhost:8000/users")
//       .then((res) => res.json())
//       .then((json) => json.users_list)
//       .catch((error) => {
//         console.log(error);
//         return [];
//       });
//   }

//   function postUser(person) {
//     return fetch("http://localhost:8000/users", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(person),
//     }).then(() => {
//       setCharacters([...characters, person]); // Update frontend state after successful post
//     }).catch((error) => {
//       console.log(error);
//     });
//   }
  
//   // Function to update the list of characters
//   function updateList(person) {
//     postUser(person);
//   }

//   useEffect(() => {
//     fetchUsers()
//       .then((users) => setCharacters(users))
//       .catch((error) => console.log(error));
//   }, []); // Run once when component mounts

//   // Function to remove a character
//   function removeOneCharacter(index) {
//     setCharacters(prevCharacters => prevCharacters.filter((_, i) => i !== index));
//   }

//   return (
//     <div className="container">
//       <Table characterData={characters} removeCharacter={removeOneCharacter} />
//       <Form handleSubmit={updateList} />
//     </div>
//   );

//   }

// export default MyApp;

// src/MyApp.jsx
// src/MyApp.jsx
import React, { useState, useEffect } from 'react';
import Table from "./Table";
import Form from "./Form";
import "./main.css";

function fetchUsers() {
  const promise = fetch("http://localhost:8000/users");
  return promise;
}

function postUser(person) {
  const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
  });

  return promise;
}

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
}, []);

// Function to update the list of characters after adding a new user
function updateList(person) {
  postUser(person)
      .then((res) => {
          if (res.status === 201) {
              return res.json();
          } else {
              throw new Error('Failed to add user');
          }
      })
      .then((json) => setCharacters([...characters, json]))
      .catch((error) => {
          console.log(error);
      });
}


function removeOneCharacter(index) {
  const updated = characters.filter((character, i) => i !== index);
  setCharacters(updated);
}

return (
  <div className="container">
    <h1>Hello, React!</h1>
    <Table characterData={characters} removeCharacter={removeOneCharacter} />
    <Form handleSubmit={updateList} />
  </div>
);
}

export default MyApp;