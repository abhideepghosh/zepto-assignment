import "./Label.css";

const Label = ({ imgURL, title, onClick, lastChip }) => {
  return (
    <div className="chip-container">
      <div className={`chip ${lastChip ? "lastChip" : ""}`}>
        <img src={imgURL} alt={title} width="96" height="96" />
        {title}
        <span className="closeButton" onClick={() => onClick()}>
          &times;
        </span>
      </div>
    </div>
  );
};

export default Label;
