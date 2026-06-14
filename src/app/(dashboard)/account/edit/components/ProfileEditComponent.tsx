"use client";
import ProfileForm from "@/components/forms/ProfileForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import AvatarEditForm from "./AvatarEditForm";
import ClientOnly from "@/components/common/shared/ClientOnly";
import { User } from "lucide-react";

const ProfileEditComponent = () => {
  return (
    <ClientOnly>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full">
        {/* Left Column - Profile Form */}
        <Card className="lg:col-span-2 border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-slate-50 dark:border-slate-800/60 bg-slate-50/40 dark:bg-slate-900/20 px-6 py-4">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                <User className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">Personal Information</CardTitle>
                <CardDescription className="text-xs">Update your profile details and contact info.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ProfileForm />
          </CardContent>
        </Card>

        {/* Right Column - Avatar Edit */}
        <Card className="lg:col-span-1 border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-slate-50 dark:border-slate-800/60 bg-slate-50/40 dark:bg-slate-900/20 px-6 py-4">
            <CardTitle className="text-base font-semibold">Profile Photo</CardTitle>
            <CardDescription className="text-xs">Change your public avatar.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <AvatarEditForm />
          </CardContent>
        </Card>
      </div>
    </ClientOnly>
  );
};

export default ProfileEditComponent;
