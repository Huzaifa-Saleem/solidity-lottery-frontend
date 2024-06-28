import { useRecoilValue } from "recoil";
import useContract from "../../hooks/useContract";
import { currentUser } from "../../atoms";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../components/Button";

type LotteryT = {
  id: number;
  admin: string;
  amount: number;
  participantsAllowed: number;
  participantsId: string;
  winner: string;
};

type ParticipantT = {
  user: string;
  lotteryAdmin: string;
  lotteryId: string;
};

const LotteryDetails = () => {
  const [lotteryDetails, setLotteryDetails] = useState<LotteryT>();
  const [participants, setParticipants] = useState<ParticipantT[]>([]);
  const [loading, setLoading] = useState(false);

  const { adminId, lotteryId } = useParams();
  const contract = useContract();
  const user = useRecoilValue(currentUser);

  const getLotteryDetails = async () => {
    try {
      const lotteryDetails = (await contract?.methods
        .getLotteryDertails(adminId, lotteryId)
        .call({
          from: user?.id,
        })) as LotteryT;

      if (!lotteryDetails) return;

      setLotteryDetails({
        id: Number(lotteryDetails?.id || 0),
        admin: lotteryDetails.admin,
        amount: Number(lotteryDetails.amount),
        participantsAllowed: Number(lotteryDetails.participantsAllowed),
        participantsId: lotteryDetails.participantsId,
        winner: lotteryDetails.winner,
      });

      console.log({ lotteryDetails });
    } catch (error) {
      console.log(error);
    }
  };

  const getLotteryParticipants = async () => {
    try {
      if (!lotteryDetails || !user?.id) return;
      const participants = (await contract?.methods
        .getLotteryParticipants(lotteryDetails?.participantsId)
        .call({
          from: user?.id,
        })) as ParticipantT[];

      setParticipants(participants);
      console.log({ participants });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLotteryDetails();
  }, [adminId, lotteryId, contract]);

  useEffect(() => {
    if (lotteryDetails) {
      getLotteryParticipants();
    }
  }, [lotteryDetails, user?.id]);

  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <div className="text-lg font-bold my-3">
        <h1>Lottery Details</h1>
      </div>

      <div className="text-md font-medium mb-10">
        <h3>TOTAL AMOUNT: {lotteryDetails?.amount}</h3>
        <h3>PARTICIPANTS ALLOWED: {lotteryDetails?.participantsAllowed}</h3>
        <h3>
          Winner:{" "}
          {lotteryDetails?.winner ===
          "0x0000000000000000000000000000000000000000"
            ? "No Winner Yet"
            : lotteryDetails?.winner}
        </h3>
      </div>

      <div>
        <Button
          disabled={
            Number(lotteryDetails?.participantsAllowed) > participants.length
              ? participants.find(
                  (participant) => participant.user === user?.id
                )
                ? true
                : false
              : true
          }
          loading={loading}
          onClick={() => {
            setLoading(true);
            contract?.methods
              .participateInLottery(
                lotteryDetails?.admin,
                lotteryDetails?.id,
                lotteryDetails?.participantsId
              )
              .send({ from: user?.id })
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          {Number(lotteryDetails?.participantsAllowed) > participants.length
            ? participants.find((participant) => participant.user === user?.id)
              ? "Already Participated"
              : "Participate"
            : "Participants Full"}
        </Button>
      </div>

      <h2>Participants List</h2>
      <table>
        <tr>
          <th>id</th>
          <th>address</th>
        </tr>
        {participants.map((participant, _i) => (
          <tr key={_i + participant.user}>
            <td>{_i + 1}</td>
            <td>{participant.user}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default LotteryDetails;
