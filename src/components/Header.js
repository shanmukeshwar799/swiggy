import React, { use } from 'react';
import { useState,useContext } from "react";
import {LOGO_URL} from "../utils/constants";
import { Link } from "react-router";
import UserContext from "../utils/UserContext";
import useOnlineStatus from "../utils/useOnllineStatus";
import {useSelector} from "react-redux";

const Header = () => {
    const [btnName,setbtnName] = useState("login");
    
    const onlineStatus = useOnlineStatus();
    
    const data = useContext(UserContext);
    console.log(data);

    // selector 
    const cartItems = useSelector((store) => store.cart.items);
    
    return (
        <div className="flex justify-between items-center bg-white rounded-lg shadow-md py-2 px-6 mx-4 my-4">
            <div className="w-40 flex items-center">
                <img 
                    className="logo h-16 w-16 rounded-full border-2 border-green-200 shadow-sm" 
                    src={LOGO_URL}
                    alt="Logo"
                />
                <span className="ml-3 text-2xl font-extrabold text-green-700 tracking-wide select-none">
                    Just Eat
                </span>
            </div>
            <div className="flex items-center">
                <ul className="flex gap-6 items-center">
                    <li className="text-gray-600 text-sm">
                        Online Status: <span className={onlineStatus ? "text-green-600" : "text-red-500"}>{onlineStatus ? "✅" : "🔴"}</span>
                    </li>
                    <li>
                        <Link to="/" className="hover:text-green-600 transition-colors font-medium">Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-green-600 transition-colors font-medium">About</Link>
                    </li>
                    <li>
                        <Link to="/liked" className="hover:text-green-600 transition-colors font-medium">liked</Link>
                    </li>
                    <li>
                        <Link to="/cart" className="font-bold text-lg hover:text-green-600 transition-colors">
                            Cart ({cartItems.length} items)
                        </Link>
                    </li>
                    <li className="font-semibold text-gray-700">{data.loggedInUser}</li>
                    <li>
                        <button
                            className="ml-2 px-4 py-1 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-colors"
                            onClick={() => {
                                btnName === "login" ? setbtnName("logout") : setbtnName("login");
                            }}
                        >
                            {btnName}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default Header;