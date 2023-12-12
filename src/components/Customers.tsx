"use client";

import { api } from "@/service/api";
import axios from "axios";
import Image from "next/image";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import {
  ArrowDownIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import TestButton from "./TestButton";

interface Customer {
  firstName: string;
  lastName: string;
  age: number;
  id: number;
}

export default function Customers() {
  const [isLoadingGetCustomers, setIsLoadingGetCustomers] = useState(false);
  const [isLoadingPostCustomers, setIsLoadingPostCustomers] = useState(false);
  const [isLoadingRegenerateCustomers, setIsLoadingRegenerateCustomers] =
    useState(false);
  const [toggle, setToggle] = useState(true);

  const [newCustomerList, setNewCustomerList] = useState<Customer[]>([]);
  const [customersList, setCustomerList] = useState<Customer[]>([]);

  useEffect(() => {
    createNewCustomerList();
  }, []);

  const firstNames = [
    "Leia",
    "Sadie",
    "Jose",
    "Sara",
    "Frank",
    "Dewey",
    "Tomas",
    "Joel",
    "Lukas",
    "Carlos",
  ];

  const lastNames = [
    "Liberty",
    "Ray",
    "Harrison",
    "Ronan",
    "Drew",
    "Powell",
    "Larsen",
    "Chan",
    "Anderson",
    "Lane",
  ];

  const getCustomers = () => {
    setIsLoadingGetCustomers(true);
    api
      .get(`customers`)
      .then((res) => {
        setCustomerList(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingGetCustomers(false);
      });
  };

  const postCustomers = () => {
    setIsLoadingPostCustomers(true);
    api
      .post(`customers`, newCustomerList)
      .then((res) => {
        window.alert(res.data);
        console.log(res.data);
        getCustomers();
      })
      .catch((err) => {
        window.alert(
          `${err.response.data.status} \n ${JSON.stringify(
            err.response.data.errors,
            null,
            2
          )}`
        );
        console.log(err.response.data.status, err.response.data.errors);
      })
      .finally(() => {
        setIsLoadingPostCustomers(false);
      });
  };

  const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const randomNumberBetween10And90 = () => {
    return randomNumber(10, 90);
  };

  const createNewCustomer = (id: number) => {
    const newCustomer: Customer = {
      firstName: firstNames[randomNumber(0, firstNames.length - 1)],
      lastName: lastNames[randomNumber(0, lastNames.length - 1)],
      age: randomNumberBetween10And90(),
      id: id,
    };

    return newCustomer;
  };

  const createNewCustomerList = () => {
    setIsLoadingRegenerateCustomers(true);
    api
      .get(`customers`)
      .then((res) => {
        setCustomerList(res.data);

        let lastId =
          res.data.map((_: Customer) => _.id).sort()[res.data.length - 1] ?? 0;

        const _newCustomersList: Customer[] = [];

        for (let i = 0; i < randomNumber(2, 15); i++) {
          lastId++;
          _newCustomersList.push(createNewCustomer(lastId));
        }

        setNewCustomerList(_newCustomersList);
      })
      .catch((err) => {
        console.log(err.response.data.status, err.response.data.errors);
      })
      .finally(() => {
        setIsLoadingRegenerateCustomers(false);
      });
  };

  return (
    <div className="">
      <h1
        className="text-2xl flex p-1 px-2 justify-between cursor-pointer hover:bg-gray-300 rounded-md mb-2"
        onClick={() => setToggle(!toggle)}
      >
        Customers
        {toggle ? (
          <ChevronUpIcon className="w-6"></ChevronUpIcon>
        ) : (
          <ChevronDownIcon className="w-6"></ChevronDownIcon>
        )}
      </h1>
      {toggle && (
        <>
          <div className="w-full gap-4 flex flex-col mb-8">
            <div className="flex place-items-center gap-4">
              <div className="rounded-md w-full p-2 text-green-600 bg-white px-4 cursor-default">
                [GET] api/customers
              </div>
              <TestButton
                isLoading={isLoadingGetCustomers}
                onClick={getCustomers}
              ></TestButton>
            </div>
            <div className="flex place-items-center w-full">
              <textarea
                className="resize-none focus:resize-y w-full p-2 text-xs bg-white"
                style={{ minHeight: "200px" }}
                value={`${JSON.stringify(customersList, null, 2)}`}
                disabled
              ></textarea>
            </div>
          </div>

          <div className="w-full gap-4 flex flex-col">
            <div className="flex place-items-center gap-4">
              <div className="rounded-md w-full p-2 text-blue-600 bg-white px-4 cursor-default">
                [POST] api/customers
              </div>
              <TestButton
                isLoading={isLoadingPostCustomers}
                onClick={postCustomers}
              ></TestButton>
            </div>
            <div className="flex flex-col w-full bg-white rounded-md items-end">
              <button
                className="text-xs rounded-y-md bg-slate-200 p-1 flex gap-1 place-items-center"
                onClick={createNewCustomerList}
              >
                Regenerate params ({newCustomerList.length})
                <ArrowPathIcon
                  className={`${
                    isLoadingRegenerateCustomers && "animate-spin"
                  } w-4`}
                ></ArrowPathIcon>
              </button>
              <textarea
                className="resize-none focus:resize-y w-full p-2 text-xs bg-white"
                style={{ minHeight: "200px" }}
                value={`${JSON.stringify(newCustomerList, null, 2)}`}
                disabled
              ></textarea>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
