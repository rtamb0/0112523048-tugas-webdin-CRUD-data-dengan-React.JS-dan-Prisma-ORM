import { prisma } from "@/lib/prisma";
import EditForm from "./EditForm";

export default async function EditEmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  // Ambil semua data master untuk form
  const departments = await prisma.department.findMany();
  const positions = await prisma.position.findMany();
  const skills = await prisma.skill.findMany();

  // Ambil semua karyawan + relasi bertingkat
  const employee = await prisma.employee.findUnique({
    where: {
      id: Number(resolvedParams.id),
    },
    include: {
      skills: true, // Many-to-Many: skill-skill karyawan
      position: {
        // One-to-Many: jabatan karyawan
        include: {
          department: true, // One-to-Many: departemen dari jabatan
        },
      },
    },
  });

  if (!employee) {
    return (
      <main className="max-w-6xl mx-auto p-6 space-y-8">
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition">
          <a href="/employees">Back to Manajemen Karyawan</a>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          Karyawan Tidak Ditemukan
        </h1>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-8">
      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition">
        <a href="/employees">Back to Manajemen Karyawan</a>
      </button>
      {/* ── FORM ── */}
      <EditForm
        departments={departments}
        positions={positions}
        skills={skills}
        employee={employee}
      />
    </main>
  );
}
