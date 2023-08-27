import Image from "next/image";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Choose } from "~~/components/Choose";
import { CommonInputProps, InputBase } from "~~/components/scaffold-eth";
import { LensCard } from "~~/components/LensCard";
import {
  Address
} from "~~/components/scaffold-eth";
import { useScaffoldContractWrite,useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
const Home: NextPage = () => {
  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "Fighter",
    functionName: "request",
    args: ["0x01"],

    // The number of block confirmations to wait for before considering transaction to be confirmed (default : 1).
    blockConfirmations: 1,
    // The callback function to execute when the transaction is confirmed.
    onBlockConfirmation: (txnReceipt) => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
      },
  });
  useScaffoldEventSubscriber({
    contractName: "Fighter",
    eventName: "ResponseReceived",
    // The listener function is called whenever a GreetingChange event is emitted by the contract.
    // It receives the parameters emitted by the event, for this example: GreetingChange(address greetingSetter, string newGreeting, bool premium, uint256 value);
    listener: ( reqId, pair, value) => {
      console.log("success", reqId, pair, value);
      },
  });
  useScaffoldEventSubscriber({
    contractName: "Fighter",
    eventName: "ErrorReceived",
    // The listener function is called whenever a GreetingChange event is emitted by the contract.
    // It receives the parameters emitted by the event, for this example: GreetingChange(address greetingSetter, string newGreeting, bool premium, uint256 value);
    listener: ( reqId, pair, value) => {
      console.log("error", reqId, pair, value);
      },
  });
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5 w-[90%] md:w-[75%]">
          <h1 className="text-center mb-6">
            <span className="block text-4xl font-bold">Lens Profile Fighter</span>
          </h1>
          <div className="flex flex-col items-center justify-center">
            <Image src="/copin.svg" width="300" height="100" alt="challenge banner" />
            <div className="max-w-3xl">
              <p className="text-center text-lg mt-8">
                🌟 Choose your lens profile and fight against each other using that lens profile 🌟
              </p>
            </div>
            <button onClick={() => writeAsync()}>panda</button>
<Choose/>
            <div className="flex flex-wrap gap-4 my-8 px-5 justify-center">

              <div className="bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 lg:px-8 mb-6 space-y-1 py-4">
                <div className="flex">
                  <div className="flex flex-col gap-1">

                    <Address  address={`0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266`} />
                    <LensCard/>
                    <button
                      className={`h-10 btn btn-primary btn-sm px-2 rounded-full space-x-3 `}

                      >
                      <span>Fight</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
