import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { makeRequest } from "../../axios";
import Hotel from "../../components/hotel/Hotel";
import Loading from "../../components/loading/Loading";
import "./hotels.scss";

export default function Hotels() {
  const [destination, setDestination] = useState("");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const hotel = await makeRequest.get("/hotels?destination=" + destination);
    setHotels(hotel.data);
    console.log(hotels);
    setLoading(false);
    setDestination("");
  };
  return (
    <div className="hotels">
      <div className="hotels-container">
        <h2>Hotels</h2>
        <div className="search">
          <SearchOutlinedIcon />
          <input
            type="text"
            placeholder="Search Hotels"
            onChange={(e) => setDestination(e.target.value)}
            value={destination}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="items">
          {loading ? (
            <Loading />
          ) : hotels?.length !== 0 ? (
            hotels?.map((hotel, index) => {
              return (
                <div className="item" key={index}>
                  <Hotel hotel={hotel} />
                </div>
              );
            })
          ) : (
            <></>
          )}
          <Hotel />
        </div>
      </div>
    </div>
  );
}
