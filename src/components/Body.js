import React from 'react';
import RestaurentCard,{withPromotedLabel} from './RestaurentCard';
import { useState, useEffect , useContext} from "react";
import { Link } from "react-router";
import Shimmer from './Shimmer';
import useOnlineStatus from  '../utils/useOnllineStatus';
import UserContext from '../utils/UserContext';

const Body = () => {
  const [listOfRestaurant, setlistOfRestaurant] = useState([]);
  const [filteredrestaurant,setfilteredrestaurant] = useState([]); 
  const [searchText,setsearchText] = useState("");
  const [sortOption, setSortOption] = useState(""); // new state for sorting

  const RestaurantCardPromoted = withPromotedLabel(RestaurentCard);

  const {loggedInUser,setUserName} = useContext(UserContext);

  useEffect(() => { 
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.3777409&lng=78.56111670000001&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setlistOfRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setfilteredrestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  };

  // Sorting logic
  const sortRestaurants = (restaurants, option) => {
    const sorted = [...restaurants];
    switch(option) {
      case "rating":
        sorted.sort((a, b) => (b.info.avgRating || 0) - (a.info.avgRating || 0));
        break;
      case "deliveryTime":
        sorted.sort((a, b) => (a.info.sla?.deliveryTime || 9999) - (b.info.sla?.deliveryTime || 9999));
        break;
      case "price":
        sorted.sort((a, b) => {
          // Use costForTwo if available, else fallback to costForTwoMessage
          const getPrice = (info) => {
            if (typeof info.costForTwo === "number") return info.costForTwo;
            if (typeof info.costForTwo === "string") {
              const match = info.costForTwo.match(/\d+/);
              return match ? parseInt(match[0]) : 0;
            }
            if (typeof info.costForTwoMessage === "string") {
              const match = info.costForTwoMessage.match(/\d+/);
              return match ? parseInt(match[0]) : 0;
            }
            return 0;
          };
          return getPrice(a.info) - getPrice(b.info);
        });
        break;
      case "distance":
        sorted.sort((a, b) => {
          // Use lastMileTravel if available, else fallback to 9999
          return (a.info.sla?.lastMileTravel || 9999) - (b.info.sla?.lastMileTravel || 9999);
        });
        break;
      default:
        break;
    }
    return sorted;
  };

  // Handle sort option change
  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    if (option) {
      setfilteredrestaurant(sortRestaurants(filteredrestaurant, option));
    }
  };

  const onlineStatus = useOnlineStatus();
  if(onlineStatus==false)
    return <h1>looks like ur offline!! check ur internet connection</h1>

  return (listOfRestaurant.length === 0) ? (<Shimmer />) : (
    <div className="body min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="filter flex flex-wrap justify-between items-center bg-white rounded-xl shadow-lg p-6 m-6">
        <div className="search flex items-center gap-2 bg-gray-100 rounded-lg shadow px-4 py-2 mb-2">
          <input
            type="text"
            className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg px-4 py-2 outline-none transition-all duration-200 w-64 bg-white"
            placeholder="Search restaurants..."
            value={searchText}
            onChange={(e) => { setsearchText(e.target.value) }}
          />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-colors font-semibold"
            onClick={() => {
              const filteredrestaurant = listOfRestaurant.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setfilteredrestaurant(filteredrestaurant);
              // Reset sort option after search
              setSortOption("");
            }}
          >
            Search
          </button>
        </div>
        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 mb-2">
          <label className="p-2 font-medium text-gray-700">Sort by:</label>
          <select
            className="border border-gray-300 rounded-lg p-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="">None</option>
            <option value="rating">Rating</option>
            <option value="deliveryTime">Delivery Time</option>
            <option value="price">Price</option>
            <option value="distance">Distance</option>
          </select>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors font-semibold"
            onClick={() => {
              const filteredrestaurant = listOfRestaurant.filter(
                (res) => res.info.avgRating > 4.3);
              setfilteredrestaurant(filteredrestaurant);
              setSortOption("");
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <label className="p-2 font-medium text-gray-700">User Name:</label>
          <input className="border border-gray-300 rounded-lg p-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-8 px-6 py-4">
        {filteredrestaurant.map((restaurant) => (
          <Link
            to={"/restaurant/" + restaurant.info?.id}
            key={restaurant.info?.id}
            className="block transition-transform hover:scale-105"
          >
            {restaurant?.info?.availability?.opened ?
              (<RestaurantCardPromoted resData={restaurant.info} />) :
              (<RestaurentCard resData={restaurant.info} />)
            }
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;