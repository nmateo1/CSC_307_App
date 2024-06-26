// src/MyApp.jsx
import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";



// const characters = [
//     {
//       name: "Charlie",
//       job: "Janitor"
//     },
//     {
//       name: "Mac",
//       job: "Bouncer"
//     },
//     {
//       name: "Dee",
//       job: "Aspring actress"
//     },
//     {
//       name: "Dennis",
//       job: "Bartender"
//     }
//   ];

function updateList(person) {
    setCharacters([...characters, person]);
  }

function MyApp() {
    const [characters, setCharacters] = useState([
      {
        name: "Charlie",
        job: "Janitor" // the rest of the data
      },
      {
        name: "Mac",
        job: "Bouncer" // the rest of the data       
      },
      {
        name: "Dee",
        job: "Aspiring actress"
      },
      {
        name: "Dennis",
        job: "Bartender"
      }
    ]);
  
    function removeOneCharacter(index) {
      const updated = characters.filter((character, i) => {
        return i != index;
      });
      setCharacters(updated);
    }
    return (
        <div className="container">
          <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
          />
          <Form handleSubmit={updateList}/>
        </div>
    );
  }

export default MyApp;