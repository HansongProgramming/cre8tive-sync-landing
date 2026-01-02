import React from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header / Navigation */}
      <header className="w-full border-b">
        <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <div className="font-bold text-lg">Creative Sync</div>

          {/* Navigation Links */}
          <ul className="flex gap-6">
            <li><a href="#projects">Projects</a></li>
            <li><a href="#values">Values</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          {/* Primary CTA */}
          <button className="px-4 py-2 border rounded">
            Start Project
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="max-w-5xl mx-auto text-center py-24 px-4">
          <h1 className="text-4xl font-semibold mb-6">
            Be Creative. Start the Sync.
          </h1>

          <p className="max-w-3xl mx-auto mb-10">
            We engineer custom software, autonomous AI, immersive AR, and advanced digital platforms with precision, intent, and long-term performance in mind.
          </p>

          {/* Hero CTAs */}
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 border rounded">
              Explore Projects
            </button>
            <button className="px-6 py-3 border rounded">
              Our Vision
            </button>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="max-w-7xl mx-auto py-20 px-4">
          <h2 className="text-2xl font-semibold mb-6">Projects</h2>
          <p className="max-w-2xl mb-10">
            A curated selection of software, AI, and immersive technology projects designed to solve real-world problems.
          </p>

          {/* Placeholder project grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border p-6 rounded">Project One</div>
            <div className="border p-6 rounded">Project Two</div>
            <div className="border p-6 rounded">Project Three</div>
          </div>
        </section>

        {/* Values / Vision Section */}
        <section id="values" className="max-w-7xl mx-auto py-20 px-4">
          <h2 className="text-2xl font-semibold mb-6">Our Values</h2>
          <p className="max-w-3xl mb-10">
            We believe in thoughtful engineering, creative clarity, and building systems that scale with integrity over time.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <li className="border p-6 rounded">Precision & Quality</li>
            <li className="border p-6 rounded">Long-Term Thinking</li>
            <li className="border p-6 rounded">Human-Centered Design</li>
          </ul>
        </section>

        {/* Awards / Recognition Section */}
        <section className="max-w-7xl mx-auto py-20 px-4">
          <h2 className="text-2xl font-semibold mb-6">Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border p-6 rounded">Community Impact Award – 2025</div>
            <div className="border p-6 rounded">Innovation Award – 2025</div>
            <div className="border p-6 rounded">Champion Award – 2025</div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="max-w-5xl mx-auto py-20 px-4">
          <h2 className="text-2xl font-semibold mb-6">Start a Project</h2>
          <p className="mb-10">
            Have an idea or challenge? Let’s explore how we can build it together.
          </p>

          <form className="grid grid-cols-1 gap-6 max-w-xl">
            <input type="text" placeholder="Name" className="border p-3 rounded" />
            <input type="email" placeholder="Email" className="border p-3 rounded" />
            <textarea placeholder="Project details" className="border p-3 rounded" rows={4} />
            <button type="submit" className="px-6 py-3 border rounded">
              Submit
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row justify-between gap-4">
          <div>© {new Date().getFullYear()} Creative Sync</div>
          <div className="flex gap-4">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
