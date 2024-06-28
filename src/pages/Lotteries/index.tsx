import React, { useEffect } from "react";
import useContract from "../../hooks/useContract";
import { useRecoilValue } from "recoil";
import { AccountAtom } from "../../atoms";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";

const Lotteries = () => {
  const [lotteries, setLotteries] = React.useState<any[]>([]);

  const adminAddress = useParams().adminId;
  const navigate = useNavigate();
  const contract = useContract();
  const account = useRecoilValue(AccountAtom);

  /**
   *
   * @param adminAddress
   */
  const getAdminLotteries = async (adminAddress: string) => {
    try {
      const lot = await contract?.methods.getAdminLotteries(adminAddress).call({
        from: adminAddress,
      });
      setLotteries(lot as any[]);
    } catch (error) {
      console.log("🚀 ~ file: App.tsx ~ getAdminLotteries ~ error", error);
    }
  };

  useEffect(() => {
    getAdminLotteries(adminAddress ? adminAddress : account);
  }, [account, adminAddress, contract]);
  return (
    <div className="h-[70vh] w-full flex flex-col items-center justify-center">
      <div
        className="
        flex items-center justify-between gap-20
      "
      >
        <h1>Lotteries</h1>
        <Button
          onClick={() => {
            navigate("/createLottery");
          }}
        >
          Create Lottery
        </Button>
      </div>
      <table className="border">
        <tr>
          <th>Id</th>
          <th>Admin address</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>

        {lotteries?.map((lottery, i) => {
          console.log("🚀 ~ file: App.tsx ~ lottery", { lottery });
          return (
            <tr key={Number(lottery?.id) + i}>
              <td>{Number(lottery?.id)}</td>
              <td>{lottery?.admin}</td>
              <td>{Number(lottery?.amount)}</td>
              <td>
                <Button
                  onClick={() => {
                    navigate(
                      `/lotteries/${adminAddress}/${Number(lottery?.id)}`
                    );
                  }}
                >
                  View
                </Button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Lotteries;
