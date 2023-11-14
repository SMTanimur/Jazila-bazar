"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { useMe } from "@/hooks/api/user/useMe";
import { IAddress } from "@/types";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { useEffect, useState } from "react";

const AccountInformation = () => {
  const [address, setAddress] = useState<IAddress | null | undefined>(null);
  const { me } = useMe();

  useEffect(() => {
    if (me) {
      if (me?.addresses) {
        setAddress(me?.addresses?.find((x) => x.default));
      }
    } else {
      setAddress(null);
    }
  }, [me]);

  return (
    <div className="flex md:flex-row flex-col items-center gap-6 ">
      <Card className=" w-full min-h-[360px]">
        <CardContent className="flex flex-col gap-2">
          <div className="flex flex-col justify-center items-center gap-3">
            <Avatar className="w-[100px] h-[100px]">
              <AvatarImage src={me?.avatar} alt={me?.lastName} />
              <AvatarFallback>{me?.lastName}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center gap-1">
              <p className="text-2xl font-semibold leading-none tracking-tight">
                {me?.firstName} {me?.lastName}
              </p>
              <h6 className="text-sm text-muted-foreground">{me?.email}</h6>
            </div>

            <Button variant={"secondary"}>
              <Link href={"/dashboard/account/edit"}>Edit Profile</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className=" min-h-[355px] w-full ">
        <CardContent className="flex flex-col gap-2 h-full">
          {!address && (
            <div className=" flex flex-col   ">
              <Link href={"/dashboard/addresses/new"}>
                <div className="flex flex-col h-[330px] justify-center items-center gap-3">
                  <Icons.plus className="w-12 h-12 text-primary" />
                  <Button variant={"secondary"}>
                    <Link href={"/dashboard/addresses/new"}>Add Address</Link>
                  </Button>
                </div>
              </Link>
            </div>
          )}

          {address && (
            <div className="flex flex-col">
              <span className="text-foreground text-md text-right mt-3 uppercase  ">
                Default
              </span>

              <div className="flex flex-col gap-4 ">
                <h2 className="text-gray-800 dark:text-white font-bold">
                  {address.name}
                </h2>
                <div>
                  {address.country}
                  <br />
                  {`${address.postcode}, ${address.city}, ${address.state}`}
                  <br />
                  {address.street}
                </div>

                <div>
                  <span>Phone Number</span>
                  <p className="text-gray-800 dark:text-gray-200 font-bold">
                    {address.phone}
                  </p>
                </div>
                <div>
                  <span>Email Address</span>
                  <p className="text-gray-800 dark:text-gray-300 font-bold">
                    {address.email}
                  </p>
                </div>
                <Button variant={"link"} className="self-start p-0 text-xl">
                  <Link href={`/dashboard/addresses/${address._id}`}>
                    <span>Edit Address</span>
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountInformation;
