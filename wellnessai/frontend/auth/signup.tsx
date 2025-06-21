export default function SignupPage() {
  return (
    <main className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Create Account</button>
      </form>
    </main>
  );
}