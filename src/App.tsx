import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home/index.tsx";
import ChooseRole from "./pages/ChooseRole/index.tsx";
import Admins from "./pages/Admins/index.tsx";
import Lotteries from "./pages/Lotteries/index.tsx";
import CreateLottery from "./pages/CreateLottery/index.tsx";
import LotteryDetails from "./pages/LotteryDetails/index.tsx";

function App() {
  return (
    <main className="h-screen w-full">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choose-role" element={<ChooseRole />} />
        <Route path="/admins" element={<Admins />} />
        <Route path="/lotteries/:adminId" element={<Lotteries />} />
        <Route
          path="/lotteries/:adminId/:lotteryId"
          element={<LotteryDetails />}
        />
        <Route path="/createLottery" element={<CreateLottery />} />
      </Routes>
    </main>
  );
}

export default App;
