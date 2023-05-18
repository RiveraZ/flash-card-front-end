import "../styles/App.css";
import axios from "axios";

const AddNote = (props) => {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log("form sent", e);
        console.log("form title", e.target[0].value);
        console.log("form note", e.target[1].value);
        axios.defaults.headers.common = {
          "Content-Type": "application/json",
        };
        axios.post(
          "http://localhost:3001/new_note",
          {},
          {
            params: {
              title: e.target[0].value,
              note: e.target[1].value,
            },
          }
        );

        await props.getNotes();
        props.setShowAddForm(false);
        props.setShowAllNoteTitles(true);
        props.setAddFormButtonText("Add Note");
      }}
    >
      <div className="addNoteContainer">
        <div className="titleBox">
          <p>Enter a Title Name</p>
          <input
            className="titleInput"
            type="text"
            name="title"
            placeholder="Enter Title Here"
          ></input>
        </div>
      </div>
      <div>
        <div className="noteBox">
          <p>Enter Note</p>
          <textarea
            className="noteInput"
            cols="40"
            rows="10"
            placeholder="Enter Note Here"
            name="note"
          ></textarea>
        </div>
        <button className="saveNoteButton" type="submit">
          Save Note
        </button>
      </div>
    </form>
  );
};

export default AddNote;
