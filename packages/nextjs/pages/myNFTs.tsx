import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { MyHoldings } from "~~/components/simpleNFT";
import { useScaffoldContractWrite,useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { ipfsClient } from "~~/utils/simpleNFT";
import nftsMetadata from "~~/utils/simpleNFT/nftsMetadata";
import { LensCardi } from "~~/components/LensCardi";
const MyNFTs: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  const [currentTokenMintCount, setCurrentTokenMintCount] = useState(0);
  const { data: fighter } = useScaffoldContractRead({
  contractName: "Fighter",
  functionName: "getFighter",
    args: [connectedAddress],
});
  const { data: win } = useScaffoldContractRead({
    contractName: "Fighter",
    functionName: "getWin",
    args: [connectedAddress],
  });
  const { data: lose } = useScaffoldContractRead({
    contractName: "Fighter",
    functionName: "getLose",
    args: [connectedAddress],
  });
  const { data: draw } = useScaffoldContractRead({
    contractName: "Fighter",
    functionName: "getDraw",
    args: [connectedAddress],
  });



  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">My Fighter</span>
          </h1>
        </div>
      </div>
      

    <div className="flex flex-wrap gap-4 my-8 px-5 justify-center">
      {fighter && <LensCardi id={fighter}/>}

    </div>
    <center>Record</center>
    <div className="flex flex-wrap gap-4 my-8 px-5 justify-center">

      <div className="overflow-x-auto shadow-lg">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th className="bg-primary">Win</th>
              <th className="bg-primary">Lose</th>
              <th className="bg-primary">Draw</th>
            </tr>
          </thead>
          <tbody>

              <tr>
                <td  className="text-center">
                  {win?.toString()}
                </td>
                <td  className="text-center">
                  {lose?.toString()}
                </td>
                <td  className="text-center">
                  {draw?.toString()}
                </td>
              </tr>

          </tbody>
        </table>
      </div>
    </div>

    </>
  );
};

export default MyNFTs;
