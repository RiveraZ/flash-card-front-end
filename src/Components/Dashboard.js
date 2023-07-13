import { useCallback, useEffect, useState } from "react";
import SingleNote from "./SingleNote";
import AddNote from "./AddNote";
import NoteCard from "./NoteCard";
import axios from "axios";

const Dashboard = () => {
  const [showSingleNote, setShowSingleNote] = useState(false);
  const [addFormButtonText, setAddFormButtonText] = useState();
  const [titles, setTitles] = useState();
  const [currentNote, setCurrentNote] = useState();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAllNoteTitles, setShowAllNoteTitles] = useState(true);

  const getNotes = async () => {
    const notes = await axios.get("http://localhost:3001/notes");
    const allNotes = notes.data;

    if (allNotes) {
      setTitles(() =>
        allNotes.map((note, i) => (
          <NoteCard
            class="titleBanner01"
            title={note.title}
            key={`${note.title}-${i}`}
            note={note}
            setShowSingleNote={setShowSingleNote}
            setCurrentNote={setCurrentNote}
          />
        ))
      );
    }
  };

  const handleLandingPage = useCallback(() => {
    const addFormIsShown = !showAddForm;

    // Toggles whether to show the form or not
    setShowAddForm(!showAddForm);

    // Toggles whether to show all note titles or not
    setShowAllNoteTitles(!showAllNoteTitles);

    // Toggles add form button text
    if (!addFormIsShown) {
      setAddFormButtonText("Add Note");
    } else {
      setAddFormButtonText("Home");
    }
  }, [showAddForm, showAllNoteTitles]);

  useEffect(() => {
    getNotes();
  }, [showAddForm]);

  return (
    <>
      {showSingleNote ? (
        <SingleNote
          getNotes={getNotes}
          setShowSingleNote={setShowSingleNote}
          currentNote={currentNote}
        />
      ) : (
        <>
          <div className="addNewButton">
            <button onClick={handleLandingPage}>
              {addFormButtonText || "Add Note"}
            </button>
          </div>
          {showAddForm && (
            <AddNote
              setShowAddForm={setShowAddForm}
              setShowAllNoteTitles={setShowAllNoteTitles}
              setAddFormButtonText={setAddFormButtonText}
              getNotes={getNotes}
            />
          )}
          {showAllNoteTitles && (
            <div className="noteFiles">
              <div className="noteContainer">{titles}</div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;
