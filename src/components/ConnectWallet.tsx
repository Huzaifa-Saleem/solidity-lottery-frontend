import { useEffect } from "react";
import Button from "./Button";
import { useRecoilState } from "recoil";
import { AccountAtom } from "../atoms";

const ConnectWallet = ({ afterConnect }: { afterConnect?: () => void }) => {
  const [account, setAccount] = useRecoilState(AccountAtom);

  useEffect(() => {
    if (account) {
      afterConnect && afterConnect();
    }
  }, [account]);

  /**
   * Wallet Connection
   */
  const handleConnect = async () => {
    if ((window as any).ethereum) {
      const accounts = await (window as any).ethereum
        .request({ method: "eth_requestAccounts" })
        .catch((err: any) => {
          console.error(err);
        });
      setAccount(accounts[0]);
      afterConnect && afterConnect();
    } else {
      alert("you dont have a wallet!");
    }
  };

  useEffect(() => {
    handleConnect();
  }, []);

  return !account ? (
    <Button onClick={handleConnect}>Connect Wallet</Button>
  ) : (
    <h2>
      Account: <span className="text-gray-700 mx-3">{account}</span>
    </h2>
  );
};

export default ConnectWallet;
