import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Building2, LayoutGrid } from 'lucide-react';
import { toast } from 'sonner';

const AdminDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newDept, setNewDept] = useState({ name: '', description: '' });

  const fetchDepts = async () => {
    try {
      const res = await fetch('/api/departments');
      if (res.ok) setDepartments(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/departments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDept),
      });
      if (res.ok) {
        toast.success('Department created');
        setNewDept({ name: '', description: '' });
        setIsAdding(false);
        fetchDepts();
      }
    } catch (e) {
      toast.error('Failed to create department');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure? This may affect doctors in this department.')) return;
    try {
      const res = await fetch(`/api/admin/departments/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Department removed');
        fetchDepts();
      }
    } catch (e) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hospital Departments</h1>
          <p className="text-sm text-gray-500">Categorize medical services and doctors.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center space-x-2 hover:bg-blue-600 transition-all shadow-lg"
        >
          <Plus className="h-4 w-4" />
          <span>{isAdding ? 'Cancel' : 'New Department'}</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl max-w-xl animate-in fade-in slide-in-from-top-4 duration-300">
           <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Department Name</label>
                <input 
                  required 
                  value={newDept.name} 
                  onChange={e => setNewDept({...newDept, name: e.target.value})}
                  className="w-full px-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:bg-white focus:border-blue-500 transition-all text-sm"
                  placeholder="e.g. Cardiology"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Description</label>
                <textarea 
                  value={newDept.description} 
                  onChange={e => setNewDept({...newDept, description: e.target.value})}
                  className="w-full px-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:bg-white focus:border-blue-500 transition-all text-sm resize-none"
                  placeholder="Describe the medical services provided..."
                  rows={3}
                ></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
                Create Department
              </button>
           </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          [1,2,3,4].map(n => <div key={n} className="h-40 bg-white rounded-3xl animate-pulse"></div>)
        ) : departments.length === 0 ? (
          <div className="col-span-full py-20 text-center text-gray-400">No departments configured yet.</div>
        ) : departments.map(dept => (
           <div key={dept._id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm relative group overflow-hidden hover:border-blue-200 transition-all">
              <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                 <Building2 className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight text-sm">{dept.name}</h3>
              <p className="text-[10px] text-gray-500 mt-2 line-clamp-2">{dept.description || 'No description provided.'}</p>
              
              <button 
                onClick={() => handleDelete(dept._id)}
                className="absolute top-6 right-6 p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="h-4 w-4" />
              </button>
           </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDepartments;
