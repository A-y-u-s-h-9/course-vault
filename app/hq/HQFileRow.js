"use client";
import { useState } from 'react';

export default function HQFileRow({ file, serverAction }) {
  const [isEditing, setIsEditing] = useState(false);

  // Wrapper function to close the edit form automatically after saving
  const onSubmit = async (formData) => {
    await serverAction(formData);
    setIsEditing(false);
  };

  // ==========================================
  // EDIT MODE UI
  // ==========================================
  if (isEditing) {
    return (
      <div className="p-5 bg-white dark:bg-stone-900 border-2 border-blue-200 dark:border-blue-900/50 rounded-xl shadow-md mb-3 transition-all">
        <form action={onSubmit} className="flex flex-col gap-4">
          <input type="hidden" name="id" value={file.id} />
          <input type="hidden" name="actionType" value="edit" />

          <div>
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wide">Edit Title</label>
            <input 
              type="text" 
              name="title" 
              defaultValue={file.title} 
              required 
              className="w-full mt-1 p-2 border border-stone-200 dark:border-stone-800 rounded-lg text-sm bg-[#F9F9F8] dark:bg-stone-950 focus:outline-none focus:border-blue-500" 
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wide">Change Subject</label>
            <select 
              name="subject" 
              defaultValue={file.subject} 
              className="w-full mt-1 p-2 border border-stone-200 dark:border-stone-800 rounded-lg text-sm bg-[#F9F9F8] dark:bg-stone-950 focus:outline-none focus:border-blue-500"
            >
              <option value="analog-and-digital-communication">Analog & Digital Communication</option>
              <option value="digital-signal-processing">Digital Signal Processing</option>
              <option value="em-theory-and-transmission-lines">EM Theory & Transmission Lines</option>
              <option value="control-systems">Control Systems</option>
              <option value="advanced-numerical-methods">Advanced Numerical Methods</option>
              <option value="electronic-devices">Electronic Devices</option>
              <option value="environmental-sciences">Environmental Sciences</option>
              <option value="all-subjects">All Subjects / General</option> {/* NEW */}
            </select>
          </div>

          <div className="flex items-center gap-2 mt-2 pt-4 border-t border-stone-100 dark:border-stone-800">
            <input 
              type="password" 
              name="secretKey" 
              placeholder="Master Key..." 
              required 
              className="flex-1 px-3 py-2 text-sm border border-stone-300 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-950 focus:outline-none" 
            />
            <button 
              type="button" 
              onClick={() => setIsEditing(false)} 
              className="px-4 py-2 text-sm font-bold text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-900 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ==========================================
  // STANDARD ROW UI
  // ==========================================
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg shadow-sm mb-3 gap-4">
      <div>
        <h3 className="font-bold text-sm">{file.title}</h3>
        <p className="text-xs text-stone-500 capitalize">{file.subject.replaceAll('-', ' ')} • {file.file_type}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <form action={serverAction} className="flex items-center gap-2">
          <input type="hidden" name="id" value={file.id} />
          <input type="hidden" name="filePath" value={file.file_path} />
          
          <input 
            type="password" 
            name="secretKey" 
            placeholder="Key..." 
            required 
            className="w-20 px-2 py-1.5 text-xs border border-stone-300 dark:border-stone-700 rounded bg-transparent focus:outline-none"
          />
          
          {file.status === 'pending' ? (
            <>
              <button type="submit" name="actionType" value="approve" className="px-3 py-1.5 text-xs font-bold text-green-700 bg-green-100 rounded hover:bg-green-200">Approve</button>
              <button type="submit" name="actionType" value="reject" className="px-3 py-1.5 text-xs font-bold text-red-700 bg-red-100 rounded hover:bg-red-200">Reject</button>
            </>
          ) : (
            <button type="submit" name="actionType" value="delete" className="px-3 py-1.5 text-xs font-bold text-red-700 bg-red-100 rounded hover:bg-red-200">Incinerate</button>
          )}
        </form>

        <button 
          onClick={() => setIsEditing(true)} 
          className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-100 rounded hover:bg-blue-200 transition-colors"
        >
          Edit
        </button>
      </div>
    </div>
  );
}