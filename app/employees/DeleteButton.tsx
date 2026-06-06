"use client";

export default function DeleteButton({
  employeeName,
}: {
  employeeName: string;
}) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(`Hapus karyawan "${employeeName}"?`)) {
          e.preventDefault();
        }
      }}
      className="text-red-500 hover:text-red-700 text-sm font-medium"
    >
      Hapus
    </button>
  );
}
