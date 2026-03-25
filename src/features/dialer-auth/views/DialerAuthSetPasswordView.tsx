import DialerAuthResetPasswordForm from "@/features/dialer-auth/components/DialerAuthResetPasswordForm";
import { dialerAuthStyles } from "@/features/dialer-auth/styles/dialerAuthStyles";

const DialerAuthSetPasswordView = () => {
  return (
    <div className={dialerAuthStyles.pageRoot}>
      <div className={dialerAuthStyles.pageContentNoTopBar}>
        <DialerAuthResetPasswordForm
          title="Set Your Password"
          subtitle=""
          passwordLabel="New Password"
          confirmPasswordLabel="Confirm New Password"
        />
      </div>
    </div>
  );
};

export default DialerAuthSetPasswordView;
