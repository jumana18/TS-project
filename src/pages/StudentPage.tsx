import React, { useState } from "react";
import StudentTable from "../components/StudentTable";
import StudentForm from "../components/StudentForm";
import { StudentType } from "../types/student";

const StudentPage: React.FC = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddClick = () => setShowForm(true);

  return (
    <div className="p-6">
      <button
        onClick={handleAddClick}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Student
      </button>

      {showForm && (
        <StudentForm setStudents={setStudents} setShowForm={setShowForm} />
      )}

      <StudentTable students={students} setStudents={setStudents} />
    </div>
  );
};

export default StudentPage;
