import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import axios from 'axios';


export default function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('/api/notes')
      .then(response => {
        setNotes(response.data.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">Notes</h2>
      <Link href="/create">
        <a className="bg-blue-500 text-white px-4 py-2 rounded">Create Note</a>
      </Link>
      <ul className="mt-4">
        {notes.map(note => (
          <li key={note._id} className="border p-4 mb-2 rounded flex justify-between items-center">
            <div>
              <Link href={`/notes/${note._id}`}>
                <a className="text-lg font-semibold">{note.title}</a>
              </Link>
              <p>{note.description}</p>
            </div>
            <div className="flex space-x-2">
              <Link href={`/notes/${note._id}`}>
                <a className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</a>
              </Link>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(note._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
