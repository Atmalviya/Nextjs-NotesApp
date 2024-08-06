import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import axios from 'axios';

export default function NoteDetail() {
  const [note, setNote] = useState({ title: '', description: '' });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`/api/notes/${id}`)
        .then(response => {
          setNote(response.data.data);
        })
        .catch(error => console.error(error));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/notes/${id}`, note);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/notes/${id}`);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">Edit Note</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={note.description}
            onChange={(e) => setNote({ ...note, description: e.target.value })}
            required
          />
        </div>
        <div className="flex space-x-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
          <button type="button" className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>Delete</button>
        </div>
      </form>
    </Layout>
  );
}
