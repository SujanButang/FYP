import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import Datatable from "../../components/dataTable/Datatable";
import Loading from "../../components/loading/Loading";
import "./hotels.scss";

export default function Hotels() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const { isLoading, error, data } = useQuery(["hotels"], async () => {
    const res = await makeRequest.get("/hotels");
    return res.data;
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await makeRequest.get("/hotels/search?destination=" + input);
    setSearchResult(res.data);
    setLoading(false);
  };

  return (
    <div className="hotels">
      <div className="hotels-container">
        <div className="hotels-list">
          {isLoading ? <Loading /> : <Datatable hotels={data} />}
        </div>
        <div className="search">
          <span>or Search from Booking.com</span>
        </div>
        <form>
          <label htmlFor="destination">Destination</label>
          <input
            type="text"
            placeholder="Enter Destination"
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </form>
        {loading ? (
          <Loading />
        ) : (
          <div className="search-result">
            {searchResult !== null && (
              <div className="search-result">
                {searchResult.length === 0 ? (
                  <span>No results found.</span>
                ) : (
                  <Datatable hotels={searchResult} />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
