{/* <ul>
                {(itemCards ?? []).map(item =>
                     <li key={item.card.info.id}>
                        {item.card.info.name} - {" Rs."} 
                        {
                            item.card.info.defaultPrice
                                ? Math.round(item.card.info.defaultPrice / 100)
                                : item.card.info.price
                                    ? Math.round(item.card.info.price / 100)
                                    : "N/A"
                        }
                     </li>
                )}
            </ul> */}




            {/* categories accordions */}
            {categories.map((category) => (
                <RestaurantCategory />
            ))}

# redux toolkit
- install @reduxjs/toolkit and redux-react library 
- build our store
- connect our store to our app
- create a cart slice
- dispatch an action
- read the data using selector