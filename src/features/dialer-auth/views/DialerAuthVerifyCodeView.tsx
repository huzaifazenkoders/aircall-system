import DialerAuthBackLink from "@/features/dialer-auth/components/DialerAuthBackLink";
import DialerAuthVerifyCodeForm from "@/features/dialer-auth/components/DialerAuthVerifyCodeForm";
import { dialerAuthStyles } from "@/features/dialer-auth/styles/dialerAuthStyles";

const DialerAuthVerifyCodeView = () => {
  return (
    <div className={dialerAuthStyles.pageRoot}>
      <div className={dialerAuthStyles.pageTopBar}>
        <DialerAuthBackLink href="/dialer-auth/forgot-password" />
      </div>

      <div className={dialerAuthStyles.pageContent}>
        <DialerAuthVerifyCodeForm />
      </div>
    </div>
  );
};

export default DialerAuthVerifyCodeView;
