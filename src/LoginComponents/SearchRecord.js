import React from "react";
import { useState } from "react";
import { Search } from "react-bootstrap-icons";

export const SearchRecord = (props) => {
  const { records } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(true);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);

    const filtered = records.filter((record) =>
      record.recordName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    props.getFilteredData(filtered);
  };

  return (
    <>
      <div className="form-outline">
        <input
          type="search"
          id="form1"
          className="form-control"
          placeholder=" Search..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />

        {/* <Search
          size={20}
          title="Search records"
          onClick={() => setShowSearchBar(true)}
          style={{ margin: "5px" }}
        /> */}
      </div>
    </>
  );
};
