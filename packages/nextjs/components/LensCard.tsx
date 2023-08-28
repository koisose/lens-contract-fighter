import { useState } from "react";
import { Address, AddressInput } from "../scaffold-eth";
import { Collectible } from "./MyHoldings";
import { BigNumber } from "ethers";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { useAccount } from 'wagmi'
export const LensCard = ({use,profile}) => {
  const { address } = useAccount()
  async function popo(){

    const url = '/api/save';
    const data = {
      profileId: profile?.profile?.id,
      address
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
.then(response => response.json())
.then(data => notification.success(`Successfully set ${profile?.profile?.handle} as your fighter`));
  }
  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "Fighter",
    functionName: "setFighter",
    args: [profile?.profile?.id],

    // The number of block confirmations to wait for before considering transaction to be confirmed (default : 1).
    blockConfirmations: 1,
    // The callback function to execute when the transaction is confirmed.
    onBlockConfirmation: async (txnReceipt) => {
      const url = '/api/save';
      const data = {
        profileId: profile?.profile?.id,
  address
      };

      fetch(url, {
        method: 'POST',
  headers: {
          'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => notification.success(`Successfully set ${profile?.profile?.handle} as your fighter`));

      },
  });
  if(use&&!profile){
  return (<center>cant find the lens profile</center>)
}

  return (
    <div className="card card-compact bg-base-100 shadow-lg sm:min-w-[300px] shadow-secondary">
      <figure className="relative">
        {/* eslint-disable-next-line  */}
        <img src={`${profile?.profile?.picture?.original?.url?.startsWith("ipfs://")?`https://nftstorage.link/ipfs/${profile?.profile?.picture?.original?.url?.replace("ipfs://","")}`:profile?.profile?.picture?.original?.url}`} alt="NFT Image" className="h-60 min-w-full" />
        
      </figure>
      <div className="card-body space-y-3">
        <div className="flex items-center justify-center">
          <p className="text-xl p-0 m-0 font-semibold">{profile?.profile?.handle}</p>
      
        </div>
       
        <div className="flex space-x-3 mt-1 items-center">
          <span className="text-lg font-semibold">Followers : {profile?.profile?.stats?.totalFollowers}</span>
        
        </div>
        {use?<button
          className={`h-10 btn btn-primary btn-sm px-2 rounded-full space-x-3 `}
          onClick={writeAsync}
          >
          <span>Use this as my fighter</span>
      </button>:""}
      </div>
    </div>
  );
};
