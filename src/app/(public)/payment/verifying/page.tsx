import PaymentVerification from "@/components/Payment/PaymentVerification";
import { Suspense } from "react";

function PaymentVerifyingContent() {
  return <PaymentVerification />;
}

export default function PaymentVerifyingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentVerifyingContent />
    </Suspense>
  );
}
