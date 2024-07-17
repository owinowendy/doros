import {useEffect, useState} from "react";
import axios from "axios";

export default function Drinks(){
    const [drinks, setDrinks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Get drinks
    useEffect(() => {
        axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
            .then((response) => {
                console.log(response.data);
                setDrinks(response.data.drinks.slice(0, 20));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Search drinks
    const searchDrinks = (e) => {
        e.preventDefault();
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
            .then((response) => {
                setDrinks(response.data.drinks);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold underline">Drinks</h1>
            <form onSubmit={searchDrinks} className="mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded w-full"
                    placeholder="Search for a drink..."
                />
                <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">Search</button>
            </form>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {drinks && drinks.map(drink => (
                    <div key={drink.idDrink} className="border p-4 rounded">
                        <img src={drink.strDrinkThumb} alt={drink.strDrink}
                             className="w-full h-32 object-cover rounded mb-2"/>
                        <h2 className="text-xl font-bold">{drink.strDrink}</h2>
                        <p>{drink.strCategory}</p>
                    </div>
                ))}
            </div>
        </div>
        
    )
}