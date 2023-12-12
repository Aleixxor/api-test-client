"use client";

import { api } from "@/service/api";
import { useState } from "react";
import {
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { sleep } from "@/service/sleep";
import TestButton from "./TestButton";

export default function ATMWithdraw() {
  const [params, setParams] = useState<number[]>([
    30, 50, 60, 80, 140, 230, 370, 610, 980,
  ]);
  const [withdrawOptions, setWithdrawOptions] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getATMWithdrawOptions = (index: number) => {
    setCurrentIndex(index);
    if (index < params.length) {
      setIsLoading(true);
      api
        .get(`atm-withdraw`, { params: { amount: params[index] } })
        .then((res) => {
          setWithdrawOptions(JSON.stringify(res.data, null, 2));
          sleep(5000).then(() => {
            index++;
            getATMWithdrawOptions(index);
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          if (index == params.length - 1) setIsLoading(false);
        });
    }
  };

  const onChangeInput = (newValue: string, index: number) => {
    let newParams = [...params];
    newParams[index] = newValue ? parseInt(newValue, 10) : 0;
    setParams(newParams);
  };

  return (
    <div className="">
      <h1
        className="text-2xl flex p-1 px-2 justify-between cursor-pointer hover:bg-gray-300 rounded-md mb-2"
        onClick={() => setToggle(!toggle)}
      >
        ATM Withdraw
        {toggle ? (
          <ChevronUpIcon className="w-6"></ChevronUpIcon>
        ) : (
          <ChevronDownIcon className="w-6"></ChevronDownIcon>
        )}
      </h1>
      {toggle && (
        <div className="w-full gap-4 flex flex-col">
          <div className="flex place-items-center gap-4">
            <div className="rounded-md w-full p-2 text-green-600 bg-white px-4 cursor-default">
              [GET] api/atm-withdraw
            </div>
            <TestButton
              isLoading={isLoading}
              onClick={() => getATMWithdrawOptions(0)}
            ></TestButton>
          </div>
          <div className="flex place-items-center gap-4">
            {params.map((value, i) => {
              return (
                <>
                  <input
                    disabled={isLoading}
                    key={i}
                    name={`input-${i}`}
                    className={`rounded-md w-full p-2 text-green-600 bg-white px-4 cursor-default ${
                      currentIndex == i && "border-2 border-green-500"
                    } disabled:bg-gray-100`}
                    type="number"
                    onChange={(e) => onChangeInput(e.target.value, i)}
                    value={value}
                  />
                </>
              );
            })}
          </div>
          <div className="flex place-items-center w-full">
            <textarea
              className="resize-none focus:resize-y rounded-md w-full p-2 text-xs bg-white"
              style={{ minHeight: "200px" }}
              disabled
              value={withdrawOptions}
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
}
