"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMe } from "@/hooks/api/user/useMe";
import { IAddress } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Edit2, Plus, ShieldCheck, User, Globe, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  const avatarUrl = me?.avatar || "/placeholder.png";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-6">
      {/* Profile summary card */}
      <Card className="w-full border-slate-100 dark:border-slate-800/80 shadow-sm overflow-hidden flex flex-col justify-between min-h-[360px]">
        {/* Banner decorative header */}
        <div className="h-24 bg-gradient-to-r from-primary/80 via-primary to-primary/90 relative flex items-end justify-center">
          <div className="absolute -bottom-12">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-md bg-white dark:bg-slate-950">
              <Image 
                src={avatarUrl} 
                alt={`${me?.firstName || ""} ${me?.lastName || ""}`} 
                fill
                sizes="96px"
                className="object-cover"
                priority
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.png";
                }}
              />
            </div>
          </div>
        </div>

        <CardContent className="pt-16 pb-6 px-6 flex flex-col flex-1 items-center justify-between gap-6">
          <div className="text-center w-full flex flex-col items-center gap-2">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 leading-none">
              {me?.firstName} {me?.lastName}
              {me?.role === "seller" && (
                <span title="Verified Seller">
                  <ShieldCheck className="w-4 h-4 text-primary fill-primary/10" />
                </span>
              )}
            </h3>
            
            <div className="flex flex-wrap gap-1.5 justify-center mt-1">
              <Badge variant="secondary" className="capitalize px-2 py-0.5 text-[10px] font-semibold tracking-wider">
                {me?.role || "Customer"}
              </Badge>
              {me?.email_verified && (
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 px-2 py-0.5 text-[10px] font-semibold">
                  Verified
                </Badge>
              )}
            </div>

            <div className="w-full max-w-[280px] mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex flex-col gap-2.5 text-left text-sm text-slate-500 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-2.5 overflow-hidden text-ellipsis whitespace-nowrap">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{me?.email}</span>
              </div>
              {me?.contact && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{me?.contact}</span>
                </div>
              )}
            </div>
          </div>

          <Button variant="outline" size="sm" asChild className="w-full max-w-[200px] border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 font-bold gap-2">
            <Link href="/account/edit">
              <Edit2 className="w-3.5 h-3.5" />
              Edit Profile
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Default Address card */}
      <Card className="w-full border-slate-100 dark:border-slate-800/80 shadow-sm overflow-hidden flex flex-col justify-between min-h-[360px]">
        <CardContent className="p-6 flex flex-col h-full justify-between flex-1">
          {!address ? (
            <div className="flex-1 flex flex-col items-center justify-center py-6">
              <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">No Default Address</h4>
              <p className="text-xs text-slate-400 dark:text-slate-500 text-center max-w-[240px] mb-5 leading-normal">
                Please add a billing or shipping address to make checkout faster.
              </p>
              <Button size="sm" asChild className="font-bold gap-2 shadow-sm">
                <Link href="/account/addresses/new">
                  <Plus className="w-4 h-4" />
                  Add Address
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col h-full justify-between gap-5">
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800/60 pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Default Address</span>
                </div>
                <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                  Default
                </Badge>
              </div>

              <div className="flex-1 flex flex-col gap-4 text-sm">
                <div>
                  <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <Home className="w-4 h-4 text-slate-400" />
                    {address.name}
                  </h4>
                  <div className="mt-2 text-slate-500 dark:text-slate-400 font-medium pl-6 leading-relaxed">
                    {address.street}
                    <br />
                    {address.city}, {address.state} - {address.postcode}
                    <br />
                    <span className="flex items-center gap-1.5 mt-0.5">
                      <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {address.country}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-6 pt-2 border-t border-slate-50 dark:border-slate-800/40 text-xs font-semibold">
                  {address.phone && (
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">Phone Number</span>
                      <p className="text-slate-700 dark:text-slate-350 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {address.phone}
                      </p>
                    </div>
                  )}
                  {address.email && (
                    <div className="flex flex-col gap-1 overflow-hidden">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">Email Address</span>
                      <p className="text-slate-700 dark:text-slate-350 flex items-center gap-1.5 truncate" title={address.email}>
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {address.email}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-50 dark:border-slate-800/60 pt-4 flex justify-end">
                <Button variant="secondary" size="sm" asChild className="font-bold gap-2">
                  <Link href={`/account/addresses/${address._id}`}>
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit Address
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
