import { footerLinks, socialLinks } from "@/data/links";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background pt-16 pb-5">
      <section className="wrapper">
        {/* Footer Content */}
        <main className="mb-12 flex flex-wrap justify-between gap-8">
          {/* Brand */}
          <div className="w-full max-w-70 text-balance">
            <h3 className="mb-4 text-2xl font-bold text-white">LedgerFlow</h3>
            <p className="text-background/80 text-sm">
              Intelligent business operations platform for Nigerian SMEs.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links], index) => (
            <div key={index}>
              <h4 className="mb-4 font-bold">{title}</h4>

              <ul className="text-background/90 space-y-2 text-sm">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="hover:text-background transition-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}
          <div>
            <h4 className="mb-4 font-bold">Connect</h4>
            <ul className="flex gap-4">
              {socialLinks.map((social, index) => (
                <li key={index}>
                  <Link
                    href={social.href}
                    title={social.name}
                    aria-label={social.name}
                    className="text-background/85 hover:text-background transition-300"
                  >
                    <social.icon className="size-5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </main>

        {/* Copyright */}
        <main className="text-background/75 border-border/20 border-t pt-5 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} LedgerFlow. All rights reserved.
            Built for Nigerian businesses.
          </p>
        </main>
      </section>
    </footer>
  );
}
