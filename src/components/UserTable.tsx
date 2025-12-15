import { useEffect, useState } from "react";
import axios from "axios";

interface UserType {
  _id: string;
  name: string;
  phone?: number;
  age: number;
  status: boolean;
}

export default function UserTable() {
  const [users, setUsers] = useState<UserType[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user/get");
      setUsers(res.data.data || []);
    } catch (err) {
      // silently ignore errors
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">User List</h2>

      <div >
        <table className="min-w-full border border-gray-300 table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 border text-left font-semibold">Name</th>
              <th className="px-4 py-3 border text-left font-semibold">
                Phone
              </th>
              <th className="px-4 py-3 border text-left font-semibold">Age</th>
              <th className="px-4 py-3 border text-left font-semibold">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="even:bg-gray-50">
                <td className="px-4 py-3 border whitespace-nowrap">
                  {user.name}
                </td>
                <td className="px-4 py-3 border whitespace-nowrap">
                  {user.phone ?? "-"}
                </td>
                <td className="px-4 py-3 border whitespace-nowrap">
                  {user.age}
                </td>
                <td className="px-4 py-3 border whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      user.status ? "bg-green-600" : "bg-red-500"
                    }`}
                  >
                    {user.status ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
