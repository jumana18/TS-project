import { useState } from "react";
import axios from "axios";
import type { StudentType } from "../../types/student";

interface Props {
  setStudents: React.Dispatch<React.SetStateAction<StudentType[]>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function StudentForm({ setStudents, setShowForm }: Props) {
  const [formData, setFormData] = useState<StudentType>({
    name: "",
    roll: 0,
    age: 0,
    class: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rollNo" || name === "age" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({formData});
    
    try {
      const res = await axios.post(
        "http://localhost:3000/api/student/create",
        formData
      );
      setStudents((prev) => [...prev, res.data]);
      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded mb-6 space-y-3">
      <h3 className="text-xl font-semibold text-center">Add Student</h3>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        name="roll"
        type="number"
        placeholder="Roll Number"
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        name="age"
        type="number"
        placeholder="Age"
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        name="class"
        placeholder="Class"
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}

export default StudentForm;
