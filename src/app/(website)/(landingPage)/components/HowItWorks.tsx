export default function HowItWorks() {
  return (
    <section className="bg-muted/20 py-20">
      <section className="wrapper">
        {/* Section Header */}
        <header className="mb-16 text-center text-balance">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">How It Works</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Get started with LedgerFlow in four simple steps
          </p>
        </header>

        {/* Steps */}
        <main className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-card border-border relative h-full rounded-lg border px-4 py-6 md:p-6"
            >
              <h1 className="mb-2 text-7xl font-black text-transparent [-webkit-text-stroke:2px_rgb(40,78,167,0.25)]">
                {step.number}
              </h1>

              <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </main>
      </section>
    </section>
  );
}

const steps = [
  {
    number: "01",
    title: "Sign Up",
    description:
      "Create your LedgerFlow account in minutes. No credit card required.",
  },
  {
    number: "02",
    title: "Add Products & Inventory",
    description: "Upload your product catalog and set inventory levels easily.",
  },
  {
    number: "03",
    title: "Generate Invoices",
    description:
      "Create professional invoices with automatic tax calculations.",
  },
  {
    number: "04",
    title: "Get Insights",
    description: "Access AI-powered analytics to grow your business smarter.",
  },
];
