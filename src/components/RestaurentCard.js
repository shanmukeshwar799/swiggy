import React from "react";
import { CDN_URL } from "../utils/constants";

const RestaurentCard = (props) => {
  const { resData } = props;

  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    costForTwo,
    sla,
  } = resData;

  return (
    <div className="relative m-4 w-[260px] rounded-2xl bg-gradient-to-br from-green-200 via-green-50 to-blue-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-green-300 group overflow-hidden">
      <div className="overflow-hidden rounded-t-2xl">
        <img
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
          alt="res-logo"
          src={CDN_URL + cloudinaryImageId}
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-green-900 truncate">{name}</h3>
        <h4 className="text-green-700 text-xs mt-1 truncate">{cuisines.join(", ")}</h4>
        <div className="flex items-center justify-between mt-3">
          <span className={`px-2 py-1 rounded text-xs font-semibold ${avgRating >= 4 ? "bg-green-500 text-white" : "bg-yellow-400 text-white"}`}>
            ★ {avgRating}
          </span>
          <span className="text-blue-700 text-xs font-semibold">{costForTwo}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-gray-600 text-xs">{sla?.slaString || (sla?.deliveryTime + " min")}</span>
        </div>
      </div>
    </div>
  );
};

//is open or not 
export const withPromotedLabel = (RestaurentCard) => {
  return (props) => {
    return (
      <div className="relative">
        <label className="absolute top-2 left-2 bg-black bg-opacity-80 text-white text-xs px-3 py-1 rounded-full z-10 shadow">
          isOpen
        </label>
        <RestaurentCard {...props}/>
      </div>
    );
  };
}

export default RestaurentCard;
