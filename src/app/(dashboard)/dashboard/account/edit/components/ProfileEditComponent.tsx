"use client";
import ProfileForm from "@/components/forms/ProfileForm";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import AvatarEditForm from "./AvatarEditForm";

const ProfileEditComponent = () => {
  return (
    <React.Fragment>
      <Card>
        <CardContent className="flex flex-col md:flex-row items-center gap-4  w-full">
          <ProfileForm />
          <AvatarEditForm />
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default ProfileEditComponent;
