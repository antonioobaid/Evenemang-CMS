import Link from "next/link";

function HomePage() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold mb-4 text-white">Välkommen till vår evenemangsplattform!</h1>
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-600 mb-2">Evenemang</h2>
            <p className="text-gray-500 mb-4">Utforska våra evenemangssidor för att hitta spännande aktiviteter att delta i .</p>
            <div className="flex justify-center">
              <Link href="/sign-in" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Se evenemang
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
