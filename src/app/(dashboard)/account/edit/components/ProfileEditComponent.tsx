"use client";
import ProfileForm from "@/components/forms/ProfileForm";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import AvatarEditForm from "./AvatarEditForm";
import ClientOnly from "@/components/common/shared/ClientOnly";

const ProfileEditComponent = () => {
  return (
    <React.Fragment>
      <Card>
        <CardContent className="flex flex-col md:flex-row items-center gap-4  w-full">
        <ClientOnly>
          <ProfileForm />
          <AvatarEditForm />
          </ClientOnly>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default ProfileEditComponent;
