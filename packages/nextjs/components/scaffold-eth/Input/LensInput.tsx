import { useCallback, useEffect, useState } from "react";
import { isAddress } from "ethers/lib/utils";
import Blockies from "react-blockies";
import { useEnsAddress, useEnsAvatar, useEnsName } from "wagmi";
import { CommonInputProps, InputBase } from "~~/components/scaffold-eth";

// ToDo:  move this function to an utility file
const isENS = (address = "") => address.endsWith(".eth") || address.endsWith(".xyz");

/**
 * Address input with ENS name resolution
 */
export const LensInput = ({ value, name, placeholder, onChange }: CommonInputProps) => {



  return (
    <InputBase
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
