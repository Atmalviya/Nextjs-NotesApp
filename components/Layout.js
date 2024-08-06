export default function Layout({ children }) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <header className="bg-blue-500 w-full p-4 text-white text-center">
          <h1 className="text-2xl">Notes App</h1>
        </header>
        <main className="flex-1 w-full max-w-3xl p-4">{children}</main>

      </div>
    );
  }
  