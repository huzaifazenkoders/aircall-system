import DialerAuthBackLink from "@/features/dialer-auth/components/DialerAuthBackLink";
import DialerAuthResetPasswordForm from "@/features/dialer-auth/components/DialerAuthResetPasswordForm";
import { dialerAuthStyles } from "@/features/dialer-auth/styles/dialerAuthStyles";

const DialerAuthResetPasswordView = () => {
  return (
    <div className={dialerAuthStyles.pageRoot}>
      <div className={dialerAuthStyles.pageTopBar}>
        <DialerAuthBackLink href="/dialer-auth/verify-code" />
      </div>

      <div className={dialerAuthStyles.pageContent}>
        <DialerAuthResetPasswordForm />
      </div>
    </div>
  );
};

export default DialerAuthResetPasswordView;
