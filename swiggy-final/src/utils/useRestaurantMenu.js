import {useState,useEffect} from "react";
import {RESTAURANT_API} from '../utils/constants';


const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);
    
    useEffect(() => {
        fetchMenu();
    }, []);
    
    const fetchMenu = async () => {
        const data = await fetch(RESTAURANT_API + resId);
        const json = await data.json();
        setResInfo(json.data);
    };
    return resInfo;
}

export default useRestaurantMenu;