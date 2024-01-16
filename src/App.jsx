import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Label from "./components/Label";
import data from "./mock_data/mock_data";

function App() {
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

  const onInputClick = () => {
    if (filterText !== "") return;
    setFilteredList(searchList.current.filter((d) => !labels.includes(d)));
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
      labels.length > 0 && removeChip(labels[labels.length - 1]);
      setBackspaceCount(0);
    }
  }, [backspaceCount]);

  const removeChip = (chipData) => {
    const index = labels.indexOf(chipData);

    if (index === -1) return;

    searchList.current.push(chipData);
    setFilteredList([
      ...searchList.current.filter((d) => d.title.includes(filterText)),
    ]);
    labels.splice(index, 1);
    setLabels([...labels]);

    input?.current?.focus();
  };

  const addChip = (chipData) => {
    const index = searchList.current.indexOf(chipData);

    if (index === -1) return;

    setFilterText("");

    setLabels((previous) => [...previous, chipData]);
    searchList.current.splice(index, 1);
    setFilteredList([...searchList.current]);

    input?.current?.focus();
    setHighlightedSearchItem(0);
  };

  return (
    <div className="parent">
      <h1>Pick users</h1>
      <div
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
            lastChip={i === labels.length - 1 && backspaceCount === 1}
            key={d.title + d.imgURL}
            onClick={() => removeChip(d)}
          />
        ))}

        {searchList.current.length > 0 && (
          <div className="filterList">
            <input
              placeholder="Add new user..."
              ref={input}
              autoFocus
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
                filteredList.map((d, i) => (
                  <div
                    className={`filterListItem ${
                      highlightedSearchItem === i ? "highlight" : ""
                    }`}
                    key={d.title + d.imgURL}
                    onClick={() => addChip(d)}
                  >
                    <div className="left">
                      <div className="imageContainer">
                        <img src={d.imgURL} alt={d.title} />
                      </div>
                    </div>
                    <span className="titleSpan">{d.title}</span>
                    <span className="emailSpan">{d.email}</span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
