import DialerAuthBackLink from "@/features/dialer-auth/components/DialerAuthBackLink";
import DialerAuthForgotPasswordForm from "@/features/dialer-auth/components/DialerAuthForgotPasswordForm";
import { dialerAuthStyles } from "@/features/dialer-auth/styles/dialerAuthStyles";

const DialerAuthForgotPasswordView = () => {
  return (
    <div className={dialerAuthStyles.pageRoot}>
      <div className={dialerAuthStyles.pageTopBar}>
        <DialerAuthBackLink href="/dialer-auth/sign-in" />
      </div>

      <div className={dialerAuthStyles.pageContent}>
        <DialerAuthForgotPasswordForm />
      </div>
    </div>
  );
};

export default DialerAuthForgotPasswordView;
