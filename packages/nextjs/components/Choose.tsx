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

  useEffect(() => {
    const getFaucetAddress = async () => {
      try {
        if (provider) {
          const accounts = await provider.listAccounts();
          setFaucetAddress(accounts[FAUCET_ACCOUNT_INDEX]);
        }
      } catch (error) {
        notification.error(
          <>
            <p className="font-bold mt-0 mb-1">Cannot connect to local provider</p>
            <p className="m-0">
              - Did you forget to run <code className="italic bg-base-300 text-base font-bold">yarn chain</code> ?
            </p>
            <p className="mt-1 break-normal">
              - Or you can change <code className="italic bg-base-300 text-base font-bold">targetNetwork</code> in{" "}
              <code className="italic bg-base-300 text-base font-bold">scaffold.config.ts</code>
            </p>
          </>,
        );
        console.error("⚡️ ~ file: Faucet.tsx:getFaucetAddress ~ error", error);
      }
    };
    getFaucetAddress();
  }, []);

  const sendETH = async () => {
    try {
      setLoading(true);
      await faucetTxn({ to: inputAddress, value: ethers.utils.parseEther(sendValue) });
      setLoading(false);
      setInputAddress("");
      setSendValue("");
    } catch (error) {
      const parsedError = getParsedEthersError(error);
      console.error("⚡️ ~ file: Faucet.tsx:sendETH ~ error", error);
      notification.error(parsedError);
      setLoading(false);
    }
  };

  // Render only on local chain
  if (!ConnectedChain || ConnectedChain.id !== hardhat.id) {
    return null;
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
