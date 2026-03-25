import DialerAuthLoginForm from "@/features/dialer-auth/components/DialerAuthLoginForm";
import { dialerAuthStyles } from "@/features/dialer-auth/styles/dialerAuthStyles";

const DialerAuthLoginView = () => {
  return (
    <div className={dialerAuthStyles.pageRoot}>
      <div className={dialerAuthStyles.pageContentNoTopBar}>
        <DialerAuthLoginForm />
      </div>
    </div>
  );
};

export default DialerAuthLoginView;
