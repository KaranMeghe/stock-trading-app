import { useState, useEffect } from "react";
import FinHub from "../apis/FinHub";
const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [watchList, setWatchList] = useState(["AMZN", "GOOGL", "MSFT"]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const response = await Promise.all(
        watchList.map((stock) => {
          return FinHub.get("/quote", {
            params: {
              symbol: stock,
            },
          });
        })
      );

      const data = response.map((response) => {
        return { data: response.data, symbol: response.config.params.symbol };
      });

      console.log(data);

      if (isMounted) {
        setStocks(data);
      }
    };

    fetchData();
    return () => isMounted === false;
  }, []);

  return (
    <div>
      <table className="table hover mt-5">
        <thead style={{ color: "rgb(79,89,102" }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">Chg%</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => {
            return (
              <tr className="table-row" key={stock.symbol}>
                <th scope="row">{stock.symbol}</th>
                <td>{stock.data.c}</td>
                <td>{stock.data.d}</td>
                <td>{stock.data.dp}</td>
                <td>{stock.data.h}</td>
                <td>{stock.data.l}</td>
                <td>{stock.data.o}</td>
                <td>{stock.data.pc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default StockList;
