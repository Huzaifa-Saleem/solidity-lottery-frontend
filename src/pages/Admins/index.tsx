import { useEffect, useState } from "react";
import useContract from "../../hooks/useContract";
import Button from "../../components/Button";
import { useRecoilValue } from "recoil";
import { AccountAtom } from "../../atoms";
import { useNavigate } from "react-router-dom";

const Admins = () => {
  const [admins, setAdmins] = useState<any[]>([]);

  const account = useRecoilValue(AccountAtom);
  const contract = useContract();
  const navigate = useNavigate();

  const getAdmins = async () => {
    try {
      const admins = await contract?.methods.getAllAdmins().call({
        from: account,
      });
      setAdmins(admins as any[]);
      console.log("🚀 ~ file: App.tsx ~ getAdmins ~ admins", admins);
    } catch (error) {
      console.log("🚀 ~ file: App.tsx ~ getAdmins ~ error", error);
    } finally {
    }
  };

  useEffect(() => {
    getAdmins();
  }, [account]);

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <table className="gap-10">
        <tr>
          <th>id</th>
          <th>address</th>
          <th>actions</th>
        </tr>
        {admins?.map((admin, _i) => (
          <tr>
            <td>{_i}</td>
            <td>{admin?.user}</td>
            <td>
              <Button
                onClick={() => {
                  navigate(`/lotteries/${admin?.user}`);
                }}
              >
                Show Lotteries
              </Button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Admins;
