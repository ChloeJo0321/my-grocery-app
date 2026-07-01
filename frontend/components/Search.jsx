import { useState } from "react";
import { useNavigate } from "react-router";

function Search() {
  const [searchWord, setSearchWord] = useState("");
  let navigate = useNavigate();

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
      <button
        className='search-btn'
        onClick={() => {
          console.log(searchWord);
          navigate(`/search?searchWord=${searchWord}`);
        }}
      >
        🔍
      </button>
    </>
  );
}

export default Search;
