import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">
        Selamat Datang di Aplikasi Employee Management
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Kelola data karyawan dengan mudah dan efisien.
      </p>
      <div className="flex space-x-4">
        <a
          href="/employees"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Klik Disini untuk Lihat Data Karyawan
        </a>
      </div>
    </div>
  );
}
