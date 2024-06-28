import { useNavigate } from "react-router-dom";
import ConnectWallet from "../../components/ConnectWallet";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-full bg-gray-200">
      <h1 className="text-3xl text-blue-900 font-bold">
        WELCOME TO LOTTERY DAPP
      </h1>
      <ConnectWallet
        afterConnect={() => {
          navigate("/choose-role");
        }}
      />
    </div>
  );
};

export default Home;
