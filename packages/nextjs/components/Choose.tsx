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
async function fetchGraphQL(query, variables = {}) {
  const response = await fetch('https://api-mumbai.lens.dev/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  // Parse the response as JSON
  return await response.json();
}


export const Choose = () => {

  const [inputAddress, setInputAddress] = useState("");
  const [profile, setProfile] = useState(null);
  async function fetchProfile() {
    const query = `
 query Profile{
  profile(request:{handle:"${inputAddress}.test"}){
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
    setProfile(null)
  } else {

    setProfile(response.data);
  }
  }



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
                onClick={fetchProfile}
                className={`h-10 btn btn-primary btn-sm px-2 rounded-full space-x-3 `}
               
              >
                <span>Search</span>
              </button>
            
              {inputAddress && profile && <LensCard profile={profile} use={true}/>}

            </div>
          </div>
        </label>
      </label>
    </div>
  );
};
