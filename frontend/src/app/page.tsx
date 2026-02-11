import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full bg-gray-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
            Your Multi-Vendor <br /> Marketplace Solution
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Buy, sell, and manage products from multiple vendors in one secure
            platform with escrow-style payments and transparent commissions.
          </p>

          <div className="flex gap-4">
            <Link
              href="/shop"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-600 transition"
            >
              Get Started
            </Link>
            <Link
              href="/register"
              className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition"
            >
              Become a Seller
            </Link>
          </div>
        </div>

        {/* Right Illustration Box */}
        <div className="bg-indigo-100 rounded-2xl p-12 text-center shadow-inner">
          <p className="text-xl font-semibold text-indigo-700">
            Secure • Transparent • Scalable
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-14">
            Why Choose VibeMart?
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4">
                Shop from Multiple Sellers
              </h3>
              <p className="text-gray-600">
                Discover a wide range of products from verified vendors in one
                unified marketplace.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4">
                Earn as a Vendor
              </h3>
              <p className="text-gray-600">
                List your products, manage inventory, track orders, and grow
                your business with powerful analytics.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4">
                Secure & Reliable
              </h3>
              <p className="text-gray-600">
                Escrow-style payment simulation and structured workflows ensure
                safe and transparent transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-bold">500+</h3>
            <p className="mt-2 text-indigo-100">Active Vendors</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">10K+</h3>
            <p className="mt-2 text-indigo-100">Products Listed</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">25K+</h3>
            <p className="mt-2 text-indigo-100">Orders Completed</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6">
        © {new Date().getFullYear()} VibeMart. All rights reserved.
      </footer>
    </main>
  );
}