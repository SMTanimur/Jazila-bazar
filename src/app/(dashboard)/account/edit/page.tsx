import ClientOnly from "@/components/common/shared/ClientOnly";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/common/shared/page-header";
import { Shell } from "@/components/shells/shell";
import { Metadata } from "next";
import ProfileEditComponent from "./components/ProfileEditComponent";

export const metadata: Metadata = {
  title: "Profile Edit",
  description: "Manage your account Information",
};

const ProfileEdit = async () => {
  return (
    <Shell variant={"sidebar"}>
      <PageHeader
        id="profileEdit-header"
        aria-labelledby="profileEdit-header-heading"
      >
        <PageHeaderHeading size="sm">Profile Edit</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your profile Edit settings
        </PageHeaderDescription>
      </PageHeader>
      <section>
          <ProfileEditComponent />
      </section>
    </Shell>
  );
};

export default ProfileEdit;
