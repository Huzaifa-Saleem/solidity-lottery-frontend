import { useEffect, useState } from "react";
import Web3, { Contract } from "web3";
import ContractABI from "../ContractABI.json";
// const CONTRACT_ADDRESS = "0x3410e12E9F5C195802bCA28178297c18559a2cfF";
const CONTRACT_ADDRESS = "0x0e1215F76386cbFF2B13D1F18a329257Ed277454";

const useContract = () => {
  const [contract, setContract] = useState<Contract<typeof ContractABI> | null>(
    null
  );
  useEffect(() => {
    const web3 = new Web3((window as any).ethereum);
    const cont = new web3.eth.Contract(ContractABI, CONTRACT_ADDRESS);
    setContract(cont);
  }, []);
  return contract;
};

export default useContract;
