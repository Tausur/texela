export default function Features() {
  const features = [
    {
      title: "Instant Image to PDF",
      desc: "Convert JPG, PNG, and WEBP images into high-quality PDFs in seconds.",
      icon: "⚡",
    },
    {
      title: "Batch Upload",
      desc: "Upload multiple images at once and merge them into a single PDF.",
      icon: "📂",
    },
    {
      title: "Secure & Private",
      desc: "Your files are encrypted and automatically deleted after processing.",
      icon: "🔒",
    },
    {
      title: "Works Everywhere",
      desc: "Use Texela seamlessly on desktop, tablet, or mobile devices.",
      icon: "🌍",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-black mb-4">
          Why choose <span className="text-purple-600">Texela</span>?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A fast, secure, and modern way to convert your images into PDFs —
          without complexity.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-2xl p-6 shadow-md
              transition-all duration-300
              hover:-translate-y-2 hover:shadow-xl"
          >
            <div
              className="text-3xl mb-4 w-12 h-12 flex items-center justify-center
              rounded-full bg-linear-to-br from-purple-500 to-cyan-400 text-white
              group-hover:scale-110 transition-transform"
            >
              {feature.icon}
            </div>

            <h3 className="text-lg font-semibold text-black mb-2">
              {feature.title}
            </h3>

            <p className="text-gray-600 text-sm">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
