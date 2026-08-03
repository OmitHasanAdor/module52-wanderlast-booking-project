export default function HelpPage() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">Help Center</h1>

      <p className="text-gray-600 mb-8">
        Need assistance? We&apos;re here to help you with your travel experience.
      </p>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">How do I book a destination?</h2>
          <p className="text-gray-600">
            Browse available destinations, select your preferred package, and
            complete the booking process.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Can I cancel my booking?</h2>
          <p className="text-gray-600">
            Yes. Cancellation policies depend on the destination and booking
            terms.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Need more help?</h2>
          <p className="text-gray-600">
            Email us at <strong>info@wanderlast.com</strong> or call
            <strong> +1 786 901 1622</strong>.
          </p>
        </div>
      </div>
    </main>
  );
}