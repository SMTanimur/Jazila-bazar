"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { useAddress } from "@/hooks/api/addresses/useAddress";
import { useGetAddresses } from "@/hooks/api/addresses/useGetAddresses";
import Link from "next/link";
import React from "react";
import AddressCard from "./AddressCard";
import AddressCardSkeleton from "./AddressCardSkeleton";

const AddressesInformation = () => {
  const { data, isLoading, error } = useGetAddresses();
  const { addressDeleteLoading, attemptToDeleteAddress } = useAddress();
  
  // Handle different response formats - API returns PaginatorInfo with docs array
  const addresses = data?.docs || (Array.isArray(data) ? data : []);
  
  // Debug: Log to see what we're getting
  if (process.env.NODE_ENV === 'development') {
    console.log('Addresses data:', { data, addresses, isLoading, error });
  }
  
  if (isLoading) {
    return (
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card className="min-h-[350px]">
          <CardContent>
            <div className="flex flex-col">
              <Link href={"/account/addresses/new"}>
                <div className="flex flex-col h-[330px] justify-center items-center gap-3">
                  <Icons.plus className="w-12 h-12 text-primary" />
                  <Button variant={"secondary"}>Add Address</Button>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
        {[1, 2, 3].map((i) => (
          <AddressCardSkeleton key={i} />
        ))}
      </section>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <p className="text-red-600 dark:text-red-400">
              Failed to load addresses. Please try again later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="grid  md:grid-cols-2 lg:grid-cols-3  gap-3">
      <Card className=" min-h-[350px]">
        <CardContent>
          <div className=" flex flex-col   ">
            <Link href={"/account/addresses/new"}>
              <div className="flex flex-col h-[330px] justify-center items-center gap-3">
                <Icons.plus className="w-12 h-12 text-primary" />
                <Button variant={"secondary"}>Add Address</Button>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
      {Array.isArray(addresses) && addresses.length > 0 ? (
        addresses.map((address, index) => (
        <React.Fragment key={index}>
          <AddressCard
            className="addresses-list__item"
            address={address}
            label={address.default ? <span>Default</span> : <span></span>}
            loading={isLoading}
            footer={
              <React.Fragment>
                <Button variant={"link"} className="p-0">
                  <Link href={`/dashboard/addresses/${address._id}`}>
                    Edit Address
                  </Link>
                </Button>
                &nbsp;&nbsp;
                {/* eslint-disable-next-line */}
                <Button
                  variant={"link"}
                  className="p-0"
                  disabled={addressDeleteLoading}
                  onClick={(event) => {
                    event.preventDefault();
                    attemptToDeleteAddress(address._id);
                  }}
                >
                  Remove
                </Button>
              </React.Fragment>
            }
          />
        </React.Fragment>
      ))
      ) : (
        !isLoading && (
          <Card className="col-span-full">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center gap-3 text-center min-h-[200px]">
                <p className="text-gray-600 dark:text-gray-400">
                  No addresses found. Add your first address to get started.
                </p>
              </div>
            </CardContent>
          </Card>
        )
      )}
    </section>
  );
};

export default AddressesInformation;
