// GPT가 짜준 모달 코드
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const TodoModal = ({ isOpen, onClose, onAdd }) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('TODO');

  const handleAdd = () => {
    onAdd({ id: Date.now(), title, summary, category });
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-xl max-w-md w-full">
        <h2 className="text-xl mb-4">Add Todo</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            className="w-full px-2 py-1 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Summary</label>
          <textarea
            className="w-full px-2 py-1 border rounded"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            className="w-full px-2 py-1 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="TODO">TODO</option>
            <option value="PROGRESS">PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default TodoModal;
