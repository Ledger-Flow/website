import { Star } from "lucide-react";
import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="bg-muted/20 py-20">
      <section className="wrapper">
        {/* Section Header */}
        <header className="mb-16 text-center text-balance">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Join thousands of Nigerian business owners who trust LedgerFlow
          </p>
        </header>

        {/* Testimonials Grid */}
        <main className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border-border rounded-lg border p-8"
            >
              {/* Stars */}
              <span className="mb-4 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-accent text-accent" />
                ))}
              </span>

              {/* Quote */}
              <p className="mb-6 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex gap-2.5">
                <div className="border-border relative size-11 overflow-clip rounded-full border">
                  <Image
                    alt={testimonial.name}
                    src={testimonial.img}
                    fill
                    sizes="100%"
                  />
                </div>

                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </main>
      </section>
    </section>
  );
}

const testimonials = [
  {
    name: "Chioma Okonkwo",
    role: "Owner, Fashion Studio Lagos",
    content:
      "LedgerFlow has transformed how I manage my inventory and invoices. What used to take hours now takes minutes. Highly recommended!",
    rating: 5,
    img: "https://randomuser.me/api/portraits/women/75.jpg",
  },
  {
    name: "Tunde Adeyemi",
    role: "CEO, Tech Solutions Nigeria",
    content:
      "The AI-powered insights have been game-changing for our business decisions. The tax calculation accuracy is impressive and saves us so much time.",
    rating: 5,
    img: "https://randomuser.me/api/portraits/men/73.jpg",
  },
  {
    name: "Zainab Hassan",
    role: "Founder, Zainab Ventures",
    content:
      "Finally, a solution built specifically for Nigerian SMEs. The interface is intuitive and the support team is always helpful. Best investment for my business.",
    rating: 5,
    img: "https://randomuser.me/api/portraits/women/67.jpg",
  },
];
