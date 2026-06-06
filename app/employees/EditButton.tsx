"use client";

export default function EditButton({ employeeId }: { employeeId: number }) {
  return (
    <a
      href={`/employees/${employeeId}/edit`}
      className="text-blue-500 hover:text-blue-700 text-sm font-medium"
    >
      Edit
    </a>
  );
}
