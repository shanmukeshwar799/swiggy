import {useState,useEffect} from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
   
    const {resId} = useParams();

    const resInfo = useRestaurantMenu(resId);

    const [showIndex,setShowIndex] = useState(0);
  
   if(resInfo === null)
        return <Shimmer />;

    const {name,cuisines,costForTwoMessage} = 
    resInfo?.cards[2]?.card?.card?.info;
   
    const regularCards = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards ?? [];
    const menuCard = regularCards.find(card => card.card?.card?.itemCards);
    const itemCards = menuCard?.card?.card?.itemCards;
    
    // console.log( resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards );

    const categories = (resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards ?? [])
        .filter(c => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");

    console.log(categories);
    
    
    
    return (
        <div className="text-center">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold text-lg">
                {cuisines.join(", ")} - {costForTwoMessage}
            </p>
            {/* categories accordions */}
          
            {categories.map((category,index) => (
                  // controlled component
                <RestaurantCategory 
                data={category?.card?.card} 
                key={category?.card?.card?.title} 
                showItems={index===showIndex ? true : false}
                setShowIndex={() => setShowIndex(index)} />
            ))}
        </div>
    );
};

export default RestaurantMenu;