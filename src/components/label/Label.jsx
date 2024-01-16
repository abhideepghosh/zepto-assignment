import "./Label.css";

const Label = ({ imgURL, title, onClick, lastLabel }) => {
  return (
    <div className="label-container">
      <div className={`label ${lastLabel ? "lastLabel" : ""}`}>
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
