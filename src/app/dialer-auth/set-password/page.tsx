import { Suspense } from "react";

import DialerAuthSetPasswordView from "@/features/dialer-auth/views/DialerAuthSetPasswordView";

const page = () => {
  return (
    <Suspense>
      <DialerAuthSetPasswordView />
    </Suspense>
  );
};

export default page;
