import { useRecoilValue } from "recoil";
import useContract from "../../hooks/useContract";
import { FormEvent, useState } from "react";
import { AccountAtom } from "../../atoms";
import Button from "../../components/Button";

const CreateLottery = () => {
  const [loading, setLoading] = useState(false);
  const [lotteryAmmount, setLotteryAmmount] = useState("");
  const [participantsAllowed, setParticipantsAllowed] = useState("");

  const account = useRecoilValue(AccountAtom);
  const contract = useContract();
  /**
   * Create-Lottery
   * @param event
   */
  const createLottery = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await contract?.methods
        .createLottery(participantsAllowed, lotteryAmmount)
        .send({ from: account });

      // await getAdminLotteries(account);
    } catch (error) {
      console.log("🚀 ~ file: App.tsx ~ createLottery ~ error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <form
        className="flex flex-col items-center justify-center gap-5 w-full"
        onSubmit={createLottery}
      >
        <input
          className="border-2 border-gray-300 p-2"
          type="number"
          name="ammount"
          placeholder="lottery ammount"
          onChange={(e) => setLotteryAmmount(e.target.value)}
          value={lotteryAmmount}
        />
        <input
          className="border-2 border-gray-300 p-2"
          type="number"
          name="participantsAllowed"
          placeholder="participants allowed"
          onChange={(e) => setParticipantsAllowed(e.target.value)}
          value={participantsAllowed}
        />
        <Button loading={loading} onClick={createLottery}>
          Create Lottery
        </Button>
      </form>
    </div>
  );
};

export default CreateLottery;
