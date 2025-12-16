import { useEffect } from "react";
import axios from "axios";
import type { StudentType } from "../../types/student";

interface Props {
  students: StudentType[];
  setStudents: React.Dispatch<React.SetStateAction<StudentType[]>>;
}

function StudentTable({ students, setStudents }: Props) {
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/student/get");
      setStudents(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Roll No</th>
            <th className="border px-4 py-2">Age</th>
            <th className="border px-4 py-2">Class</th>
          </tr>
        </thead>
        <tbody>
          {students.map((st) => (
            <tr key={st._id} className="even:bg-gray-50">
              <td className="border px-4 py-2">{st.name}</td>
              <td className="border px-4 py-2">{st.roll}</td>
              <td className="border px-4 py-2">{st.age}</td>
              <td className="border px-4 py-2">{st.class}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
