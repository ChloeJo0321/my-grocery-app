import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function SearchResults() {
  // Get the user's input to make a HTTP request
  const [params] = useSearchParams();
  const searchWord = params.get("searchWord");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/search?searchWord=${searchWord}`,
        );

        const data = await res.json();
        // console.log(data); // This code won't be executed until backend send a response.
        setSearchResults(data);
      } catch (err) {
        console.log(err);
      }
    }

    if (searchWord) {
      console.log("fetch data executed");
      fetchData();
    }
  }, [searchWord]);

  console.log(searchResults);
  return (
    <>
      <p>Items found: </p>
      <div>
        {searchResults.map((item) => (
          <p key={item.product_id}>{item.product_name}</p>
        ))}
      </div>
    </>
  );
}
export default SearchResults;
