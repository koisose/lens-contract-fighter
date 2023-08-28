import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNetwork } from "wagmi";
import { hardhat, localhost } from "wagmi/chains";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { Address, AddressInput, Balance, EtherInput, getParsedEthersError } from "~~/components/scaffold-eth";
import { useTransactor } from "~~/hooks/scaffold-eth";
import { getLocalProvider, notification } from "~~/utils/scaffold-eth";
import { LensInput } from "~~/components/scaffold-eth";
import { LensCard } from "~~/components/LensCard";
// Account index to use from generated hardhat accounts.
const FAUCET_ACCOUNT_INDEX = 0;

const provider = getLocalProvider(localhost);

/**
 * Faucet modal which lets you send ETH to any address.
 */
export const Choose = () => {
  const [loading, setLoading] = useState(false);
  const [inputAddress, setInputAddress] = useState("");
  const [faucetAddress, setFaucetAddress] = useState("");
  const [sendValue, setSendValue] = useState("");

  const { chain: ConnectedChain } = useNetwork();
  const signer = provider?.getSigner(FAUCET_ACCOUNT_INDEX);
  const faucetTxn = useTransactor(signer);



  return (
    <div>
     
      <label
        htmlFor="faucet-modal"
        className="btn"
      >

        <span>Choose Your Lens Profile Fighter</span>
      </label>
      <input type="checkbox" id="faucet-modal" className="modal-toggle" />
      <label htmlFor="faucet-modal" className="modal cursor-pointer">
        <label className="modal-box relative">
          {/* dummy input to capture event onclick on modal box */}
          <input className="h-0 w-0 absolute top-0 left-0" />
          <h3 className="text-xl font-bold mb-3">Choose Your Lens Profile Fighter</h3>
          <label htmlFor="faucet-modal" className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3">
            ✕
          </label>
          <div className="space-y-3">
           
            <div className="flex flex-col space-y-3">
              
              <LensInput
                placeholder="Lens Username"
                value={inputAddress}
                onChange={value => setInputAddress(value)}
              />
             
              <button
                className={`h-10 btn btn-primary btn-sm px-2 rounded-full space-x-3 `}
               
              >
                <span>Search</span>
              </button>
              <LensCard use={true}/>
            </div>
          </div>
        </label>
      </label>
    </div>
  );
};
