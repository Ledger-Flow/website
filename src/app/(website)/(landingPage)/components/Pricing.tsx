export default function Pricing() {
  return (
    <section className="wrapper py-20">
      {/* Section Header */}
      <header className="mb-16 text-center text-balance">
        <h2 className="mb-4 text-4xl font-bold md:text-5xl">
          Flexible Pricing
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
          Pay only for what you use with our credit-based pricing model
        </p>
      </header>

      {/* Pricing Card */}
      <main className="bg-card border-border mx-auto max-w-2xl rounded-lg border p-12">
        <h3 className="mb-2 text-2xl font-bold">Credit-Based Pricing</h3>
        <p className="text-muted-foreground mb-8">
          Simple, transparent, and scalable for businesses of all sizes
        </p>

        <div className="bg-primary/10 border-primary/20 mb-8 rounded-lg border p-8">
          <div className="mb-4 flex items-baseline gap-2">
            <span className="text-primary text-5xl font-bold">5</span>
            <span className="text-muted-foreground">free credits/month</span>
          </div>

          <p className="text-muted-foreground mb-4">
            Perfect for getting started. Upgrade anytime to get more.
          </p>
          <p className="font-medium">
            Additional credits available for purchase as needed
          </p>
        </div>

        <ul className="mb-8 space-y-4">
          {[
            "Invoice generation: 1 credit per invoice",
            "Inventory tracking: Unlimited updates",
            "Tax reports: 1 credit per report",
            "AI insights: 2 credits per insight",
          ].map((item, index) => (
            <li key={index} className="flex items-center gap-3">
              <span className="bg-accent size-2.5 rounded-full" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <button className="bg-primary transition-300 w-full rounded-full px-8 py-3 font-medium text-white hover:opacity-90">
          See Pricing Plans
        </button>
      </main>
    </section>
  );
}
