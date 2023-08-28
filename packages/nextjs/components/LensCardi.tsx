import { useState,useEffect } from "react";
import { Address, AddressInput } from "../scaffold-eth";
import { Collectible } from "./MyHoldings";
import { BigNumber } from "ethers";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
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
export const LensCardi = ({id}) => {
  const { address } = useAccount()
  const [profile, setProfile] = useState(null);
  async function fetchProfile() {
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
      setProfile(null)
    } else {

      setProfile(response.data);
    }
  }
  
  useEffect(()=>{
    fetchProfile()
    },[])
 

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
      
      </div>
    </div>
  );
};
