"use client";

import {GoogleOAuthProvider} from "@react-oauth/google";

const GoogleProvider = ({children}: React.PropsWithChildren) => {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_OAUTH_GOOGLE_ID as string}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleProvider;