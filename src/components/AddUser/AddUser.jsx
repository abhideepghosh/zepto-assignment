import React, { useRef, useState, useEffect } from "react";
import "./AddUser.css";
import data from "../../mock_data/mock_data";
import Label from "../label/Label";

const AddUser = () => {
  const [labels, setLabels] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [displayFilterList, setDisplayFilterList] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [highlightedSearchItem, setHighlightedSearchItem] = useState(0);

  const searchList = useRef(data);
  const input = useRef(null);

  const handleInput = (e) => {
    setFilterText(e.target.value);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    addLabel(filteredList[highlightedSearchItem]);
  };

  const onInputClick = () => {
    if (filterText !== "") return;
    setFilteredList(
      searchList.current.filter((userData) => !labels.includes(userData))
    );
    setDisplayFilterList(true);
  };

  const onInputKeyDown = (e) => {
    if (e.key === "Backspace" && filterText === "") {
      setBackspaceCount((count) => count + 1);
    } else if (e.key === "ArrowDown") {
      setHighlightedSearchItem(
        (previous) => (previous + 1) % filteredList.length
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedSearchItem(
        (previous) => (previous - 1 + filteredList.length) % filteredList.length
      );
    }
  };

  useEffect(() => {
    setFilteredList(searchList.current);
  }, []);

  useEffect(() => {
    if (filterText === "") {
      setFilteredList([...searchList.current]);
      return;
    }

    const res = searchList.current.filter((d) =>
      d.title.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredList(res);
  }, [filterText]);

  useEffect(() => {
    if (backspaceCount === 2) {
      labels.length > 0 && removeLabel(labels[labels.length - 1]);
      setBackspaceCount(0);
    }
  }, [backspaceCount]);

  const removeLabel = (labelData) => {
    const index = labels.indexOf(labelData);

    if (index === -1) return;

    searchList.current.push(labelData);
    setFilteredList([
      ...searchList.current.filter((d) => d.title.includes(filterText)),
    ]);
    labels.splice(index, 1);
    setLabels([...labels]);

    input?.current?.focus();
  };

  const addLabel = (labelData) => {
    const index = searchList.current.indexOf(labelData);

    if (index === -1) return;

    setFilterText("");

    setLabels((previous) => [...previous, labelData]);
    searchList.current.splice(index, 1);
    setFilteredList([...searchList.current]);

    input?.current?.focus();
    setHighlightedSearchItem(0);
  };
  return (
    <form
      onSubmit={formSubmit}
      style={{
        display: "flex",
        flexDirection: "row",
        maxHeight: "min-content",
        minHeight: "50px",
      }}
    >
      {labels.map((d, i) => (
        <Label
          imgURL={d.imgURL}
          title={d.title}
          lastLabel={i === labels.length - 1 && backspaceCount === 1}
          key={d.title + d.imgURL}
          onClick={() => removeLabel(d)}
        />
      ))}

      {searchList.current.length > 0 && (
        <div className="filterList">
          <input
            placeholder="Add new user..."
            ref={input}
            type="text"
            onChange={(e) => handleInput(e)}
            value={filterText}
            onClick={() => onInputClick()}
            onKeyDown={onInputKeyDown}
          />
          <div
            style={{
              boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
            }}
          >
            {displayFilterList &&
              filteredList.map((userData, i) => (
                <div
                  className={`filterListItem ${
                    highlightedSearchItem === i ? "highlight" : ""
                  }`}
                  key={userData.title + userData.imgURL}
                  onClick={() => addLabel(userData)}
                >
                  <div className="left">
                    <div className="imageContainer">
                      <img src={userData.imgURL} alt={userData.title} />
                    </div>
                  </div>
                  <span className="titleSpan">{userData.title}</span>
                  <span className="emailSpan">{userData.email}</span>
                </div>
              ))}
          </div>
        </div>
      )}
      <button type="submit" hidden>
        Hello
      </button>
    </form>
  );
};

export default AddUser;
