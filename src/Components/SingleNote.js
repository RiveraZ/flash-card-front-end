import { useState, useCallback } from "react";
import axios from "axios";

const SingleNote = ({ getNotes, setShowSingleNote, currentNote }) => {
  const [titleInputValue, setTitleInputValue] = useState();
  const [noteInputValue, setNoteInputValue] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [editButtonText, setEditButtonText] = useState("Edit");
  const [deleteButtonText, setDeleteButtonText] = useState("Delete");

  const handleEditButtonText = useCallback(() => {
    // Toggles edit button text
    if (editButtonText === "Edit") {
      setEditButtonText("Save");
    } else {
      setEditButtonText("Edit");
    }
  }, [editButtonText]);

  const handleDeleteButtonText = useCallback(() => {
    // Toggles delete button text
    if (deleteButtonText === "Delete") {
      setDeleteButtonText("Cancel");
    } else {
      setDeleteButtonText("Delete");
    }
  }, [deleteButtonText]);

  const deleteNote = useCallback(async (e, currentNote) => {
    e.preventDefault();
    // Deletes a single note based on currentNote parameter
    await axios.delete(`http://localhost:3001/note/${currentNote.id}`);

    // Gets all notes again
    await getNotes();

    // Returns to the landing page showing all notes
    setShowSingleNote(false);
  }, []);

  const editNote = useCallback(async (e, currentNote) => {
    e.preventDefault();

    await axios.patch(
      `http://localhost:3001/note/${currentNote.id}`,
      {},
      {
        params: {
          title: titleInputValue || currentNote.title,
          note: noteInputValue || currentNote.note,
        },
      }
    );
    getNotes();
  });

  const handleTitleInput = useCallback((event) => {
    setTitleInputValue(event.target.value);
  }, []);

  const handleSave = useCallback(() => {
    console.log("handleSave called");
  }, []);

  const handleCancel = useCallback(() => {
    console.log("handleCancel called");
  }, []);

  const handleNoteInput = useCallback((event) => {
    setNoteInputValue(event.target.value);
  }, []);

  return (
    <div className="noteViewer">
      <div>
        <button
          onClick={() => {
            setShowSingleNote(false);
            setIsEditing(false);
            setEditButtonText("Edit");
            setDeleteButtonText("Delete");
          }}
        >
          Home
        </button>
      </div>
      <form>
        <div className="titleFullView">
          <h2>
            {isEditing ? (
              <input
                className="titleInput"
                type="text"
                name="title"
                value={titleInputValue || currentNote.title}
                onChange={handleTitleInput}
              ></input>
            ) : (
              currentNote.title
            )}
          </h2>
        </div>
        <div className={`noteFullView ${isEditing && "editingView"}`}>
          {isEditing ? (
            <textarea
              className="editNoteInput"
              cols="40"
              rows="10"
              value={noteInputValue || currentNote.note}
              name="note"
              onChange={handleNoteInput}
            ></textarea>
          ) : (
            currentNote.note
          )}
        </div>
        <div className="crudButtons">
          <button
            className="editButton"
            onClick={(e) => {
              e.preventDefault();
              setIsEditing(true);

              if (editButtonText === "Save") {
                handleSave();
                editNote(e, currentNote);
              }
              handleDeleteButtonText();
              handleEditButtonText();
            }}
          >
            {editButtonText}
          </button>
          <button
            className="deleteButton"
            onClick={(e) => {
              e.preventDefault();
              if (deleteButtonText === "Cancel") {
                handleCancel();
                setIsEditing(false);
              } else {
                deleteNote(e, currentNote);
                setIsEditing(true);
              }
              handleDeleteButtonText();
              handleEditButtonText();
            }}
          >
            {deleteButtonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SingleNote;
