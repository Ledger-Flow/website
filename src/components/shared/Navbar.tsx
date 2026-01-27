"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import { useScrollY } from "@/hooks/useScrollY";
import { useToggle } from "@/hooks/useToggle";
import Link from "next/link";
import { NavLink, navLinks } from "@/data/links";
import { useClose } from "@/hooks/useClose";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { scrollY } = useScrollY();
  const [mobileMenuOpen, toggleMenuOpen] = useToggle(false);
  const menuRef = useClose(() => toggleMenuOpen(false));

  return (
    <nav
      className={cn(
        `border-border transition-300 fixed top-0 z-50 w-full bg-transparent backdrop-blur-sm`,
        { "border-b bg-white/95 shadow-sm": scrollY > 20 },
      )}
    >
      <section className="wrapper">
        <main className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href={"/"}
            className="from-primary to-accent shrink-0 bg-linear-to-r bg-clip-text text-2xl font-bold text-transparent"
          >
            LedgerFlow
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((navlink, index) => (
              <li key={index}>
                {navlink.dropdown || !navlink.href ? (
                  <NavBarDropDown {...navlink} />
                ) : (
                  <Link
                    href={navlink.href}
                    className="text-foreground hover:text-primary transition-300"
                  >
                    {navlink.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* CTA Button and Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link
              href={"/auth"}
              className="bg-primary transition-300 hidden rounded-full px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 md:inline-block"
            >
              Get Started for Free
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="cursor-pointer md:hidden [&_svg]:size-5.5"
              onClick={() => toggleMenuOpen()}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </main>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <main className="border-border border-t pb-4 md:hidden" ref={menuRef}>
            <ul>
              {navLinks.map((navlink, index) => (
                <li key={index}>
                  {navlink.dropdown || !navlink.href ? (
                    <MobileNavBarDropDown
                      {...{ ...navlink, close: () => toggleMenuOpen(false) }}
                    />
                  ) : (
                    <Link
                      href={navlink.href}
                      className="text-foreground transition-300 hover:text-primary block px-4 py-2"
                      onClick={() => toggleMenuOpen(false)}
                    >
                      {navlink.name}
                    </Link>
                  )}
                </li>
              ))}

              <Link
                href={"/auth"}
                className="bg-primary transition-300 mx-4 mt-4 block w-full rounded-full px-4 py-2 text-center font-medium text-white hover:opacity-90"
              >
                Get Started for Free
              </Link>
            </ul>
          </main>
        )}
      </section>
    </nav>
  );
}

const NavBarDropDown = ({ name, dropdown }: NavLink) => {
  return (
    <div className="group relative">
      <button className="text-foreground hover:text-primary transition-300 flex cursor-pointer items-center gap-1">
        {name}{" "}
        <ChevronDown className="transition-300 size-4 group-hover:rotate-180" />
      </button>

      <div className="bg-card border-border transition-300 invisible absolute left-0 mt-2 w-48 overflow-clip rounded-lg border opacity-0 shadow-lg group-hover:visible group-hover:opacity-100">
        {dropdown!.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-foreground hover:bg-muted hover:text-primary block px-4 py-2.5 text-sm"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

const MobileNavBarDropDown = ({
  name,
  dropdown,
  close,
}: NavLink & { close: () => void }) => {
  const [open, toggleOpen] = useToggle(false);
  return (
    <div>
      <button
        className="text-foreground transition-300 hover:text-primary flex w-full cursor-pointer items-center gap-1 px-4 py-2 text-left"
        onClick={() => toggleOpen()}
      >
        {name}{" "}
        <ChevronDown
          className={cn("transition-300 size-4", { "rotate-180": open })}
        />
      </button>
      {open && (
        <div className="pl-4">
          {dropdown!.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={close}
              className="text-muted-foreground transition-300 hover:text-primary block px-4 py-2 text-sm"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
