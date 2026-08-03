export default function TermsPage() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

      <p className="text-gray-600 mb-4">
        By using WanderLast, you agree to comply with the following terms and
        conditions.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Bookings</h2>
      <p className="text-gray-600">
        All bookings are subject to availability and confirmation by the travel
        provider.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Payments</h2>
      <p className="text-gray-600">
        Payments must be completed before your booking is confirmed.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Cancellation</h2>
      <p className="text-gray-600">
        Cancellation and refund policies may vary depending on the selected
        destination and travel provider.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Changes</h2>
      <p className="text-gray-600">
        We reserve the right to modify these terms at any time without prior
        notice.
      </p>
    </main>
  );
}