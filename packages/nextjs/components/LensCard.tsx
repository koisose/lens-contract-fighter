import { useState } from "react";
import { Address, AddressInput } from "../scaffold-eth";
import { Collectible } from "./MyHoldings";
import { BigNumber } from "ethers";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const LensCard = ({use}) => {


  return (
    <div className="card card-compact bg-base-100 shadow-lg sm:min-w-[300px] shadow-secondary">
      <figure className="relative">
        {/* eslint-disable-next-line  */}
        <img src={`https://austingriffith.com/images/paintings/zebra.jpg`} alt="NFT Image" className="h-60 min-w-full" />
        
      </figure>
      <div className="card-body space-y-3">
        <div className="flex items-center justify-center">
          <p className="text-xl p-0 m-0 font-semibold">dada</p>
      
        </div>
       
        <div className="flex space-x-3 mt-1 items-center">
          <span className="text-lg font-semibold">Followers : 7123321</span>
        
        </div>
        {use?<button
          className={`h-10 btn btn-primary btn-sm px-2 rounded-full space-x-3 `}

          >
          <span>Use this as my fighter</span>
      </button>:""}
      </div>
    </div>
  );
};
