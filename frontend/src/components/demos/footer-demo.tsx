import { Zap, Github, Twitter } from "lucide-react"
import { Footer } from "@/components/ui/footer"

export function FooterDemo() {
  return (
    <Footer
      logo={<Zap className="h-10 w-10" />}
      brandName="Butaq"
      socialLinks={[
        {
          icon: <Twitter className="h-5 w-5" />,
          href: "https://twitter.com",
          label: "Twitter",
        },
        {
          icon: <Github className="h-5 w-5" />,
          href: "https://github.com",
          label: "GitHub",
        },
      ]}
      mainLinks={[
        { href: "/", label: "Studio" },
        { href: "/about", label: "Team" },
        { href: "/gallery", label: "Gallery" },
      ]}
      legalLinks={[
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
      ]}
      copyright={{
        text: "© 2025 Butaq Team",
        license: "All rights reserved",
      }}
    />
  )
}
