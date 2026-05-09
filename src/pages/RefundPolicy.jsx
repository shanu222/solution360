import LegalDocumentLayout from "../components/LegalDocumentLayout";

function RefundPolicy() {
  return (
    <LegalDocumentLayout
      documentTitle="Return & Refund Policy | SustainableSolution360"
      metaDescription="Return, refund, and cancellation policy for SustainableSolution360 digital services, AI platforms, SaaS subscriptions, and consulting engagements."
      heading="Return &amp; Refund Policy"
      lastUpdated="May 9, 2026"
    >
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">1. Scope</h2>
        <p>
          This Return &amp; Refund Policy applies to digital products, software services, AI-enabled platforms, analytics offerings, subscriptions, and related professional
          services offered by SustainableSolution360 (the “Services”). Physical goods are not presently sold through this website; if that changes, separate return rules
          may apply at checkout.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">2. Digital services and access</h2>
        <p>
          Many of our offerings are delivered electronically (hosted software, dashboards, APIs, downloads, or AI-assisted workflows). By purchasing or subscribing, you
          acknowledge that performance begins when access is granted or when configuration work is initiated, as described at the point of sale or in your order confirmation.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">3. Subscriptions and cancellation</h2>
        <p>
          For subscription-based Services, you may cancel future renewals through your account settings, billing portal, or by contacting support before the next billing
          date, subject to the terms shown in your plan. Cancellation stops future charges; it does not automatically refund fees already paid for the current billing period
          unless required by law or expressly stated in writing for your specific plan.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">4. Refund eligibility</h2>
        <p>We may provide refunds or credits where:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>We fail to deliver contracted Service functionality for a sustained period due to a material fault on our side and we cannot restore service within a reasonable time.</li>
          <li>Your purchase was duplicated in error or charged incorrectly.</li>
          <li>A promotional or plan-specific guarantee explicitly promises a refund window.</li>
          <li>Required by applicable consumer protection law in your jurisdiction.</li>
        </ul>
        <p className="pt-2">
          Refunds, when approved, are typically returned to the original payment method and may take several business days to appear depending on banks and payment partners
          (including gateways such as PayFast where applicable).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">5. Non-refundable and completed services</h2>
        <p>The following are generally non-refundable:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Fees for billing periods already in progress where you had active access to the Service.</li>
          <li>One-time setup fees, onboarding, custom integration, or consulting time already performed and delivered.</li>
          <li>Completed professional services milestones accepted by you or deemed accepted under the applicable statement of work.</li>
          <li>Usage-based or consumption charges for meters already incurred (API calls, compute, or data processing), except where incorrect due to a billing error.</li>
          <li>Third-party pass-through costs that have already been incurred on your behalf.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">6. AI outputs and analytical results</h2>
        <p>
          Outputs produced by machine learning or statistical models are probabilistic and depend on input quality. Refunds are not granted solely because an output did not
          meet subjective expectations, except where a written service-level agreement expressly defines objective deliverables and we materially failed to meet them.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">7. Billing disputes and chargebacks</h2>
        <p>
          If you believe a charge is incorrect, contact us promptly with your invoice or transaction reference. We will investigate and respond in good faith. Initiating a
          chargeback or payment reversal without first attempting resolution may result in suspension of access pending verification.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">8. How to request a refund or adjustment</h2>
        <p>
          Email{" "}
          <a href="mailto:shanu1998end@gmail.com" className="text-cyan-700 underline-offset-2 transition hover:text-cyan-600 hover:underline dark:text-cyan-200">
            shanu1998end@gmail.com
          </a>{" "}
          with your name, organization, product or subscription name, transaction date, and a short description of the issue. We aim to acknowledge requests within a few
          business days and conclude investigations within a reasonable timeframe depending on complexity.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">9. Changes</h2>
        <p>
          We may update this policy to reflect operational or legal requirements. Continued use of the Services after updates constitutes acceptance of the revised policy,
          except where prohibited by law.
        </p>
      </section>
    </LegalDocumentLayout>
  );
}

export default RefundPolicy;
