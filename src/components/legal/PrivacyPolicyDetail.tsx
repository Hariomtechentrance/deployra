import { CONTACT_INFO } from "@/lib/constants/contact";

const LAST_UPDATED = "28 October 2026";

const SECTIONS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "1. Who We Are",
    body: (
      <p>
        This website is operated by Deployra Private Limited
        (&quot;Deployra&quot;, &quot;we&quot;, &quot;us&quot;, or
        &quot;our&quot;). This Privacy Policy explains what personal
        information we collect through this website, how we use it, and the
        choices you have.
      </p>
    ),
  },
  {
    heading: "2. Information We Collect",
    body: (
      <>
        <p>We collect information you voluntarily provide to us through:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <span className="text-white/80">Contact form</span> — your name,
            email address, company, and message.
          </li>
          <li>
            <span className="text-white/80">Appointment booking</span> —
            your name, email, phone number, company name, preferred service,
            date/time, and any notes you add.
          </li>
          <li>
            <span className="text-white/80">Career applications</span> —
            your name, email, phone number, current role, experience level,
            position applied for, location, portfolio link, cover letter,
            availability, expected salary, and your resume file.
          </li>
          <li>
            <span className="text-white/80">Newsletter signup</span> — your
            email address and, optionally, your name.
          </li>
        </ul>
        <p className="mt-3">
          We do not knowingly collect sensitive personal data (such as
          financial, health, or government ID information) through this
          website.
        </p>
      </>
    ),
  },
  {
    heading: "3. How We Use Your Information",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>To respond to your enquiries and messages.</li>
        <li>To schedule and manage consultation appointments.</li>
        <li>To review career applications and contact candidates.</li>
        <li>To send newsletter updates you&apos;ve opted into.</li>
        <li>
          To protect this website from spam and abuse (e.g. basic bot and
          rate-limit checks on form submissions).
        </li>
      </ul>
    ),
  },
  {
    heading: "4. Cookies",
    body: (
      <p>
        We use a single session cookie for our admin dashboard login, used
        only by our internal team to authenticate access. We do not use
        advertising or third-party tracking cookies on this website.
      </p>
    ),
  },
  {
    heading: "5. Data Sharing",
    body: (
      <p>
        We do not sell your personal information. We may share it with
        service providers who help us run this website (for example, hosting
        and database infrastructure), and only to the extent necessary for
        them to provide that service to us. We may also disclose information
        if required by law.
      </p>
    ),
  },
  {
    heading: "6. Data Retention",
    body: (
      <p>
        We retain form submissions, appointment requests, and career
        applications for as long as reasonably necessary to respond to you,
        maintain business records, or comply with legal obligations. You can
        request deletion at any time using the contact details below.
      </p>
    ),
  },
  {
    heading: "7. Your Rights",
    body: (
      <p>
        You may ask us to access, correct, or delete the personal information
        we hold about you, or to unsubscribe from newsletter emails at any
        time. To exercise any of these rights, contact us using the details
        below.
      </p>
    ),
  },
  {
    heading: "8. Contact Us",
    body: (
      <p>
        If you have questions about this Privacy Policy or how we handle
        your data, reach out at{" "}
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="text-accent hover:text-white"
        >
          {CONTACT_INFO.email}
        </a>
        .
      </p>
    ),
  },
  {
    heading: "9. Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. Any changes will
        be posted on this page with a revised &quot;last updated&quot; date.
      </p>
    ),
  },
];

export function PrivacyPolicyDetail() {
  return (
    <main className="bg-bg min-h-svh px-6 pt-36 pb-24 sm:px-12">
      <div className="mx-auto max-w-3xl">
        <p className="text-eyebrow text-primary font-mono font-medium tracking-[0.3em] uppercase">
          Legal
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-white/60">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="mt-12 flex flex-col gap-10">
          {SECTIONS.map((section) => (
            <div key={section.heading}>
              <h2 className="text-lg font-semibold text-white">
                {section.heading}
              </h2>
              <div className="mt-3 text-sm leading-relaxed text-white/60">
                {section.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
