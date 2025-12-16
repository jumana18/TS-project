import { useEffect } from "react";
import axios from "axios";
import type { UserType } from "../../types/user";

interface Props {
  users: UserType[];
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
}

export default function UserTable({ users, setUsers }: Props) {
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user/get");
      setUsers(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Age</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="even:bg-gray-50">
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.phone ?? "-"}</td>
              <td className="border px-4 py-2">{user.age}</td>

              <td className="border px-4 py-2">
                <span
                  className={`px-2 py-1 text-white rounded text-sm ${
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
  );
}
