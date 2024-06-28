import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AccountAtom, currentUser } from "../../atoms";
import useContract from "../../hooks/useContract";
import { useNavigate } from "react-router-dom";

const ChooseRole = () => {
  const [loading, setLoading] = useState(false);

  const contract = useContract();
  const account = useRecoilValue(AccountAtom);
  const setUser = useSetRecoilState(currentUser);

  const navigate = useNavigate();

  /**
   * Get Users
   */
  const getUsers = async () => {
    if (!contract && !account) return;

    try {
      const user = (await contract?.methods
        .getuserData(account)
        .call({ from: account })) as any;
      if (!user || user?.user === "0x0000000000000000000000000000000000000000")
        return;
      console.log("🚀 ~ file: App.tsx ~ getUsers ~ user", user);
      if (Number(user.role) === 0) {
        navigate(`/lotteries/${account}`);
      } else if (Number(user.role) === 1) {
        navigate("/admins");
      }
      setUser({
        id: user?.user ?? "",
        role: (Number(user?.role) === 0 ? 0 : 1) || null,
      });
    } catch (error) {
      console.log("🚀 ~ file: App.tsx ~ getUsers ~ error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [contract, account]);

  return (
    <div className="flex items-center gap-x-3 h-[80vh] justify-center w-full">
      <Button
        loading={loading}
        onClick={async () => {
          if (!contract && !account) return;
          setLoading(true);
          await contract?.methods
            .createUser(0)
            .send({ from: account })
            .then(() => {
              navigate(`/lotteries/${account}`);
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      >
        ADMIN
      </Button>
      <Button
        loading={loading}
        onClick={async () => {
          if (!contract && !account) return;
          setLoading(true);
          await contract?.methods
            .createUser(1)
            .send({ from: account, gasPrice: "1000000" })
            .then(() => {
              navigate("/admins");
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      >
        PARTICIPANT
      </Button>
    </div>
  );
};

export default ChooseRole;
