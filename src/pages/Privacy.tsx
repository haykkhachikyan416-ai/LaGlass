import { Seo } from "@/components/Seo";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { pages } from "@/content";


export default function PrivacyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="How LA Glass handles the information you share."
        path="/privacy"
        noindex
      />
      <PageIntro
        eyebrow={pages.privacyIntroEyebrow}
        title={pages.privacyIntroTitle}
        copy="The full LA Glass privacy policy is being prepared and will be published here after owner review."
      />
      <section className="bg-cream py-16 sm:py-24">
        <Container className="max-w-2xl">
          <p className="leading-relaxed text-muted">
            In short: information you share when contacting LA Glass — such as
            your name, phone number, email, and project details — is used only
            to respond to your request and prepare your estimate. It is not
            sold or published.
          </p>
          <p className="mt-4 text-sm text-muted">
            Questions in the meantime? Reach out through the contact page.
          </p>
        </Container>
      </section>
    </>
  );
}
