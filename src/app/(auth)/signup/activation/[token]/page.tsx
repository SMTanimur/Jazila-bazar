import { type Metadata } from "next"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Shell } from "@/components/shells/shell"
import { VerifyEmailForm } from "@/components/forms/verify-email-form"



type Params = {
  params: {
    token: string;
  };
};

export const metadata: Metadata = {

  title: "Account Verification",
  description: "Verify your email address to continue with your sign up",
}

export default function VerifyEmailPage({ params: { token } }: Params) {

 
  
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Verify email</CardTitle>
          <CardDescription>
            Verify your email address to complete your account creation
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <VerifyEmailForm token={token} />
        </CardContent>
      </Card>
    </Shell>
  )
}
