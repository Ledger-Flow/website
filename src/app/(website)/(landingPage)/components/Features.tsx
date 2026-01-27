import { FileText, Box, Calculator, Zap } from "lucide-react";

export default function Features() {
  return (
    <section className="wrapper py-20">
      {/* Section Header */}
      <header className="mb-16 text-center text-balance">
        <h2 className="mb-4 text-4xl font-bold md:text-5xl">Core Features</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
          Everything you need to manage your business operations efficiently
        </p>
      </header>

      {/* Features Grid */}
      <main className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-card border-border hover:border-primary/20 group transition-300 rounded-lg border px-4 py-6 md:p-6"
          >
            <span className="bg-primary/5 group-hover:bg-primary/10 transition-300 mb-3 inline-flex rounded-lg p-3">
              <feature.icon className="text-primary size-6.5" />
            </span>

            <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </main>
    </section>
  );
}

const features = [
  {
    icon: FileText,
    title: "Invoice Management",
    description:
      "Create, send, and track invoices with ease. Automate payment reminders and manage all your transactions in one place.",
  },
  {
    icon: Box,
    title: "Inventory Tracking",
    description:
      "Monitor stock levels in real-time. Get alerts when inventory runs low and optimize your supply chain.",
  },
  {
    icon: Calculator,
    title: "Tax Calculation",
    description:
      "Automatically calculate taxes based on Nigerian regulations. Stay compliant and reduce manual errors.",
  },
  {
    icon: Zap,
    title: "AI-Powered Insights",
    description:
      "Get actionable insights from your business data. Understand trends and make informed decisions faster.",
  },
];
