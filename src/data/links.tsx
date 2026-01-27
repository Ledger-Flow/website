import { Linkedin, Mail, Twitter } from "lucide-react";

export type NavLink = {
  name: string;
  dropdown?: {
    name: string;
    href: string;
  }[];
  href?: string;
};

export const navLinks: NavLink[] = [
  {
    name: "Features",
    dropdown: [
      { name: "Invoice Management", href: "#" },
      { name: "Inventory Tracking", href: "#" },
      { name: "Tax Calculation", href: "#" },
      { name: "AI-Powered Insights", href: "#" },
    ],
  },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export type FooterLinks = {
  [key: string]: { name: string; href: string }[];
};

export const footerLinks: FooterLinks = {
  Features: navLinks[0].dropdown || [],
  Product: navLinks
    .slice(1)
    .map(({ name, href }) => ({ name, href: href || "#" })),
  Legal: [
    { name: "Terms", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Contact", href: "#" },
  ],
};

export const socialLinks = [
  { name: "Mail", href: "#", icon: Mail },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "Twitter", href: "#", icon: Twitter },
]