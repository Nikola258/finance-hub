import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { CRYPTOCOMPARE_API_KEY } from "../config/crypto";

const CryptoContext = createContext();

export const useCryptoContext = () => useContext(CryptoContext);

export const CryptoProvider = ({ children }) => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);

    const toggleFav = (id) =>
        setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await axios.get(
                    "/api/data/top/mktcapfull",
                    {
                        params: { tsym: "USD", limit: 100 },
                        headers: { Authorization: `Apikey ${CRYPTOCOMPARE_API_KEY}` },
                    }
                );

                const data = response.data.Data.map((item, index) => ({ // data is api data
                    id: item.CoinInfo.Name,
                    name: item.CoinInfo.FullName,
                    symbol: item.CoinInfo.Name,
                    price: item.RAW?.USD?.PRICE || 0,
                    market_cap: item.RAW?.USD?.MKTCAP || 0,
                    market_cap_rank: index + 1,
                    price_change_percentage_24h: item.RAW?.USD?.CHANGEPCT24HOUR || 0,
                    image: `https://www.cryptocompare.com${item.CoinInfo.ImageUrl}`,
                }));

                setCoins(data);//hier vul ik coins met data
                setLoading(false);
            } catch (error) {
                console.error("Error fetching coins:", error);
                console.error("Error details:", error.response?.data || error.message);
                setLoading(false);
            }
        };

        fetchCoins();
    }, []);//bracket hoeveel keer je het laad, daar in kun je usestate, elke keer als die usestate/functie input veranderd dan laad het de pagina

    return (
        <CryptoContext.Provider value={{ coins, loading, favorites, toggleFav }}>
            {children}
        </CryptoContext.Provider>
    );
};