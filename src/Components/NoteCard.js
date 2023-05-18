const NoteCard = (props) => {
  return (
    <div
      className={props.class}
      onClick={() => {
        console.log("note clicked", props.note);
        props.setShowSingleNote(true);
        props.setCurrentNote(props.note);
      }}
    >
      <div className="titleViewer">
        <h2>{props.title}</h2>
      </div>
    </div>
  );
};

export default NoteCard;
