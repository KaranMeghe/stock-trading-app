import { BrowserRouter, Routes, Route } from "react-router-dom";

import StockDetailsPage from "./Pages/StockDetailsPage";
import StockOverViewPage from "./Pages/StockOverViewPage";

const App = () => {
  return (
    <main className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StockOverViewPage />} />
          <Route path="/detail/:symbol" element={<StockDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};
export default App;
