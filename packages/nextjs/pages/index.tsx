import Image from "next/image";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Choose } from "~~/components/Choose";
import { CommonInputProps, InputBase } from "~~/components/scaffold-eth";
import { LensCardi } from "~~/components/LensCardi";
import {
  Address

} from "~~/components/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { useScaffoldContractWrite,useScaffoldEventSubscriber,useScaffoldContract } from "~~/hooks/scaffold-eth";
import {useEffect,useState} from 'react';
import { useAccount } from 'wagmi'
async function fetchGraphQL(query, variables = {}) {
  const response = await fetch('https://api-mumbai.lens.dev/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  // Parse the response as JSON
  return await response.json();
}
async function fetchProfile(id) {
  const query = `
 query Profile{
  profile(request:{profileId:"${id}"}){
    stats{totalFollowers}
    id
    handle
 picture{  ... on MediaSet {
      original{url}
    }}
  }

}
  `;

  const response = await fetchGraphQL(query);

  // Check if request was successful
  if (!response.data) {
    return {}
  } else {
    return {
      handle:response?.data?.profile?.handle,
      followers:response?.data?.profile?.stats?.totalFollowers
    }

    setProfile(response.data);
  }
}
const Home: NextPage = () => {
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(0);
  const [enemy, setEnemy] = useState("");
const [whoFight,setWhoFight]=useState({})
  const { address } = useAccount()
  const { data: fighter } = useScaffoldContract({
  contractName: "Fighter",
});
  // Returns the greeting and can be called in any function, unlike useScaffoldContractRead

  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "Fighter",
    functionName: "request",
    args: ["0x01"],

    // The number of block confirmations to wait for before considering transaction to be confirmed (default : 1).
    blockConfirmations: 1,
    // The callback function to execute when the transaction is confirmed.
    onBlockConfirmation: async(txnReceipt) => {
      console.log("Transaction blockHash", txnReceipt.blockHash);

      notification.info(`Fight between ${address} vs ${enemy} started!!!`,{duration:Infinity})
      const loadingId=notification.loading("please dont close this window until the winner is choosen")
      setLoading(loadingId)
      },
  });
  const fightWith = async (id) => {
    // Call the method in any function
    setEnemy(id)
    await writeAsync({
      args: [id],
      from: address

    })

  };
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
  useScaffoldEventSubscriber({
    contractName: "Fighter",
    eventName: "Attack",
    // The listener function is called whenever a GreetingChange event is emitted by the contract.
    // It receives the parameters emitted by the event, for this example: GreetingChange(address greetingSetter, string newGreeting, bool premium, uint256 value);
    listener: ( reqId, pair) => {
      notification.info(`${reqId.toString()===address?"You":reqId.toString()} draw random number ${pair.toString()}`,{duration:Infinity})
      console.log("attack", reqId.toString(), pair.toString());
      },
  });
  useScaffoldEventSubscriber({
    contractName: "Fighter",
    eventName: "Winner",
    // The listener function is called whenever a GreetingChange event is emitted by the contract.
    // It receives the parameters emitted by the event, for this example: GreetingChange(address greetingSetter, string newGreeting, bool premium, uint256 value);
    listener: ( reqId) => {
      notification.remove(loading);
      notification.success(`congrats ${reqId.toString()} for the win!!`, {
          icon: "🎉",
        duration:Infinity
      })
      console.log("winner", reqId.toString());
      },
  });
  useScaffoldEventSubscriber({
    contractName: "Fighter",
    eventName: "Draws",
    // The listener function is called whenever a GreetingChange event is emitted by the contract.
    // It receives the parameters emitted by the event, for this example: GreetingChange(address greetingSetter, string newGreeting, bool premium, uint256 value);
    listener: ( reqId) => {
      notification.remove(loading);
      notification.success(`congrats both of the fighter,after hard fought battle it ends in a draw!!`,{duration:Infinity})
      console.log("draw", reqId.toString());
      },
  });
  useEffect(()=>{


    // Making the GET request
    fetch(`/api/get`)
  .then(response => response.json())
  .then(data => setAll(data.items))
  .catch((error) => {
    console.error('Error:', error);
  });
    },[address])
  async function pocin(){
   const a= await fighter?.read?.getFighter(address);
   console.log(a)
  }
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

<Choose/>
            <div className="flex flex-wrap gap-4 my-8 px-5 justify-center">
              {all.map(({key,value})=> key != address &&
              <div key={key} className="bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 lg:px-8 mb-6 space-y-1 py-4">
                <div className="flex">
                         <div className="flex flex-col gap-1">

                    <Address  address={key} />
                    <LensCardi id={value}/>
                    <button
                      className={`h-10 btn btn-primary btn-sm px-2 rounded-full space-x-3 `}
                      onClick={()=>fightWith(key)}
                      >
                      <span>Fight</span>
                    </button>
                  </div>

                </div>

              </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
