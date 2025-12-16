import { useState } from "react";
import axios from "axios";
import type { UserType } from "../../types/user";

interface Props {
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function UserForm({ setUsers, setShowForm }: Props) {
  const [formData, setFormData] = useState<UserType>({
    name: "",
    phone: undefined,
    age: 0,
    status: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "status"
          ? value === "true"
          : name === "age" || name === "phone"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/create",
        formData
      );

      
      setUsers((prev) => [...prev, res.data.data]);
      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded mb-6 space-y-3">
      <h3 className="text-xl font-semibold text-center">Add User</h3>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        name="phone"
        type="number"
        placeholder="Phone"
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        name="age"
        type="number"
        placeholder="Age"
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <select
        name="status"
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      >
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}

export default UserForm;
