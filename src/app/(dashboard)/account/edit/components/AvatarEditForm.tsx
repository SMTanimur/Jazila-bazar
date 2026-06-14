
"use client";

import { useMe } from "@/hooks/api/user/useMe";
import { useUser } from "@/hooks/api/user/useUser";
import { useFileHandler } from "@/hooks/useFileHandler";
import { uploadImage } from "@/services/upload.service";
import { IImage } from "@/types";
import { TProfile } from "@/validations/auth";
import { CameraIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Icons } from "@/components/ui/icons";

const initImageState = { id: "", file: null, url: "" };

const AvatarEditForm = () => {
  const { me } = useMe();
  const { attemptEditProfile, editProfileLoading } = useUser();
  const profilePicture = useFileHandler<IImage>("single", initImageState);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    profilePicture.onFileChange(e, async (fileData) => {
      const file = e.target.files?.[0];
      if (file) {
        // Validate file size (2MB)
        if (file.size > 2 * 1024 * 1024) {
          toast.error("File is too large. Max size is 2MB.");
          return;
        }

        const formData = new FormData();
        formData.append("files", file);
        try {
          toast("Uploading profile picture...", { id: "avatar-upload", icon: "📤" });
          const { image } = await uploadImage(formData);
          const userData = {
            avatar: image.img_url,
            firstName: me?.firstName,
            lastName: me?.lastName,
            email: me?.email,
            contact: me?.contact,
          };

          await attemptEditProfile(userData as TProfile);
          toast.success("Profile picture updated!", { id: "avatar-upload", icon: "✅" });
        } catch (error) {
          toast.error("Failed to update profile picture.", { id: "avatar-upload" });
        }
      }
    });
  };

  const avatarUrl = profilePicture.imageFile.url || (me?.avatar as string) || "/placeholder.png";

  return (
    <div className="w-full flex flex-col items-center justify-center py-4">
      <div className="relative group w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-slate-100 hover:border-primary/50 dark:border-slate-800 dark:hover:border-primary/30 shadow-md bg-slate-50 dark:bg-slate-900 transition-all duration-300">
        <Image
          src={avatarUrl}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          height={176}
          width={176}
          alt={me?.lastName || "User avatar"}
          data-testid="profile-avatar"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.png";
          }}
        />

        {/* Change Photo Overlay */}
        <label 
          htmlFor="avatar-input"
          className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer text-white text-xs font-bold gap-1.5"
        >
          <CameraIcon className="w-5 h-5 stroke-[2.5px] animate-pulse" />
          <span>Change Photo</span>
        </label>

        {/* Upload Spinner overlay */}
        {editProfileLoading && (
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px] flex items-center justify-center text-white">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}
      </div>

      <input
        type="file"
        hidden
        accept="image/*"
        onChange={handleFileChange}
        disabled={editProfileLoading}
        id="avatar-input"
      />

      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-4 text-center max-w-[200px] font-semibold leading-relaxed">
        JPG, PNG or GIF. Max size of 2MB.
      </p>
    </div>
  );
};

export default AvatarEditForm;
