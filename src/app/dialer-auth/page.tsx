import { Suspense } from "react";

import DialerAuthLoginView from "@/features/dialer-auth/views/DialerAuthLoginView";

const page = () => {
  return (
    <Suspense>
      <DialerAuthLoginView />
    </Suspense>
  );
};

export default page;
