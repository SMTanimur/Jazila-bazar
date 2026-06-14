
import { useUser } from "@/hooks/api/user/useUser";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";
import { User, Mail, Phone } from "lucide-react";

const ProfileForm = () => {
  const { attemptEditProfile, editProfileLoading, profileEditForm } = useUser();
  return (
    <Form {...profileEditForm}>
      <form
        className="space-y-5 w-full"
        onSubmit={(...args) =>
          void profileEditForm.handleSubmit(attemptEditProfile)(...args)
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={profileEditForm.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">First Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input placeholder="John" className="pl-9 bg-slate-50/50 dark:bg-slate-900/40 border-slate-100 hover:border-slate-200 dark:border-slate-800 dark:hover:border-slate-700/80 transition-colors" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={profileEditForm.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Last Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input placeholder="Doe" className="pl-9 bg-slate-50/50 dark:bg-slate-900/40 border-slate-100 hover:border-slate-200 dark:border-slate-800 dark:hover:border-slate-700/80 transition-colors" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={profileEditForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Email Address</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input placeholder="example@gmail.com" className="pl-9 bg-slate-50/50 dark:bg-slate-900/40 border-slate-100 hover:border-slate-200 dark:border-slate-800 dark:hover:border-slate-700/80 transition-colors" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={profileEditForm.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Phone Number</FormLabel>
              <FormControl>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input placeholder="+8801XXXXXXXXX" className="pl-9 bg-slate-50/50 dark:bg-slate-900/40 border-slate-100 hover:border-slate-200 dark:border-slate-800 dark:hover:border-slate-700/80 transition-colors" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={editProfileLoading} className="w-full bg-primary hover:bg-primary/95 text-white font-bold h-11 shadow-sm mt-2">
          {editProfileLoading && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Update Profile
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
