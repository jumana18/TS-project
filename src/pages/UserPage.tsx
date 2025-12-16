import { useState } from "react";
import UserTable from "../components/user/UserTable";
import UserForm from "../components/user/UserForm";
import type { UserType } from "../types/user";

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6">
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Add User
      </button>

      {showForm && <UserForm setUsers={setUsers} setShowForm={setShowForm} />}

      <UserTable users={users} setUsers={setUsers} />
    </div>
  );
};

export default UserPage;
