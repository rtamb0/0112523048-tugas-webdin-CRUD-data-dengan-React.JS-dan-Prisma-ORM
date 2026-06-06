"use client";

import { useState } from "react";
import { editEmployee } from "../../actions";
import Image from "next/image";

// Tipe data dari props (dikirim dari Server Component)
type Department = { id: number; name: string };
type Position = { id: number; name: string; departmentId: number };
type Skill = { id: number; name: string };

type Props = {
  departments: Department[];
  positions: Position[];
  skills: Skill[];
  employee: {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;
    departmentId: number;
    positionId: number;
    skills: Skill[];
    photoPath: string | null;
  };
};

export default function EditEmployeeForm({
  departments,
  positions,
  skills,
  employee,
}: Props) {
  // State untuk cascading dropdown
  const [selectedDeptId, setSelectedDeptId] = useState<string>(
    employee.position?.departmentId.toString() || "",
  );

  // Filter position berdasarkan department yang dipilih
  const filteredPositions = positions.filter(
    (p) => p.departmentId === parseInt(selectedDeptId),
  );

  return (
    <form
      action={editEmployee}
      className="bg-white p-6 rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">Edit Karyawan</h2>

      <input type="hidden" name="id" value={employee.id} />

      {/* ── TEXT INPUT: Nama ── */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nama Lengkap
        </label>
        <input
          type="text"
          name="name"
          defaultValue={employee.name}
          required
          placeholder="Contoh: Budi Santoso"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ── EMAIL INPUT ── */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          defaultValue={employee.email}
          required
          placeholder="budi@email.com"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ── RADIO BUTTON: Jenis Kelamin ── */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Jenis Kelamin
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="male"
              defaultChecked={employee.gender === "male"}
              required
            />
            <span className="text-sm">Laki-laki</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="female"
              defaultChecked={employee.gender === "female"}
            />
            <span className="text-sm">Perempuan</span>
          </label>
        </div>
      </div>

      {/* ── DROPDOWN BIASA: Status ── */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status Karyawan
        </label>
        <select
          name="status"
          defaultValue={employee.status}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Pilih Status --</option>
          <option value="active">Aktif</option>
          <option value="probation">Masa Percobaan</option>
          <option value="inactive">Tidak Aktif</option>
        </select>
      </div>

      {/* ── CASCADING DROPDOWN: Department → Position ── */}
      <div className="grid grid-cols-2 gap-4">
        {/* Dropdown 1: Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Departemen
          </label>
          <select
            name="departmentId"
            defaultValue={employee.position?.departmentId}
            onChange={(e) => setSelectedDeptId(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Pilih Departemen --</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown 2: Position (isi berubah otomatis) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Jabatan
          </label>
          <select
            name="positionId"
            required
            disabled={!selectedDeptId}
            defaultValue={employee.position?.id}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">
              {selectedDeptId
                ? "-- Pilih Jabatan --"
                : "(Pilih departemen dulu)"}
            </option>
            {filteredPositions.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── CHECKBOX: Skill (Many-to-Many) ── */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Skill (boleh pilih lebih dari satu)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {skills.map((skill) => (
            <label
              key={skill.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                name="skills"
                value={skill.id}
                defaultChecked={employee.skills.some((s) => s.id === skill.id)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">{skill.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ── FILE INPUT: Upload Foto ── */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Foto Profil
        </label>
        <div className="mb-2">
          {employee.photoPath ? (
            <Image
              src={employee.photoPath}
              alt="Foto Profil"
              className="w-16 h-16 rounded-full object-cover"
              width={64}
              height={64}
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
              N/A
            </div>
          )}
        </div>
        <input
          type="file"
          name="photo"
          accept="image/*"
          className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <p className="text-xs text-gray-400 mt-1">
          Format: JPG, PNG, WEBP. Maks 2MB.
        </p>
      </div>

      {/* ── TOMBOL SUBMIT ── */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        Simpan Karyawan
      </button>
    </form>
  );
}
