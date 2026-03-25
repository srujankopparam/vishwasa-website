export default function AdminDashboard() {
  return (
    <div className="py-16 bg-cream/30 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-brown/10">
          <h1 className="font-serif text-3xl font-bold text-brown mb-6">Admin Dashboard</h1>
          <div className="bg-orange/10 border-l-4 border-orange p-4 mb-8">
            <p className="text-orange-900 font-medium">
              Backend Integration Pending: This secure dashboard will be linked to Vercel Postgres after deployment.
              Only users with the secure password will be able to access this page.
            </p>
          </div>
          <div className="text-center py-12 bg-cream/20 rounded-xl border border-dashed border-brown/30">
            <p className="text-brown/70 font-medium mb-4">You will manage your products here:</p>
            <ul className="text-left max-w-sm mx-auto space-y-2 text-brown/80 mb-6">
              <li>✅ Add New Products</li>
              <li>✅ Edit Prices</li>
              <li>✅ Change Descriptions</li>
              <li>✅ Upload Images</li>
            </ul>
            <button disabled className="bg-brown/50 text-white font-bold py-2 px-6 rounded-lg cursor-not-allowed">
              + Add Product (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
