import { useEffect, useState } from "react";

function Search() {
  const [searchWord, setSearchWord] = useState("");

  function search() {
    fetch("http://localhost:3000/api/search", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ searchWord: searchWord }),
    });
  }

  return (
    <>
      <input
        type='text'
        placeholder='Search fresh produce, dairy...'
        className='search-bar'
        value={searchWord}
        onChange={(e) => {
          setSearchWord(e.target.value);
        }}
      />
      <button onClick={search} className='search-btn'>
        🔍
      </button>
    </>
  );
}

export default Search;
