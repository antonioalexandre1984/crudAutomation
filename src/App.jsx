/* eslint-disable no-undef */
import {useState} from 'react'

function App() {
  const [automations, setAutomations] = useState([]);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('active');
  const [editingIndex, setEditingIndex] = useState(-1);

function createAutomation() {
  if (name.trim() !== '') {
    if (editingIndex === -1) {
      // Create a new Automation
      const newAutomation = { name, status };
      setAutomations([...automations, newAutomation])
      console.log('New automation created: ', newAutomation)
      setName('');
      setStatus('active');
      console.log("Automation created successfully.");  
    } 
    resetForm();
  }
}

  function resetForm() {
    setName('');
    setStatus('active');
  }
  
  function editAutomation(index) {
    const automation = automations[index];
    const editedName = prompt('Edited name of automation: ', automation.name);
    if (editedName != null) {
      const editedStatus = prompt('Editar Status (active/disabled):', automation.status)
      if (editedStatus != null && (editedStatus === 'active' || editedStatus === 'disabled')) {
         const updatedAutomation = { name: editedName, status: editedStatus };
         const updatedAutomations = [...automations];
        updatedAutomations[index] = updatedAutomation;
         console.log("Automation updated with successfully."); 
         setAutomations(updatedAutomations);
      }
     
    }
  }

  function deleteAutomation (index){
    const confirmDelete = window.confirm('Are you sure you want to delete this automation?')
    if (confirmDelete) {
      const updatedAutomations = automations.filter((_, i) => i != index);
      setAutomations(updatedAutomations);
      resetForm();
      setEditingIndex(-1);
        console.log("Automation deleted successfully."); 
    }
  }
  
  return (
    <div className='App'>
      <div className="bg-gray-200 min-h-screen h-screen w-screen p-0 m-0 flex flex-col items-center justify-center">
      <div className="container mx-auto">
        <section className="bg-gray-500 text-center mb-4 p-4 flex justify-center items-center">  
          <h1 className=" p-2 text-4xl font-bold">CRUD for Automation</h1>
        </section>
          <div className="my-4">
            <div className="flex mb-4 gap-2 ">
              <input
                className='border border-black text-center p-2'
                type="text"
                placeholder="Name of Automation"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <select
                className='p-2 border border-black'
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="active">Active</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>
        
          <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className='bg-gray-400'>
                    <th className='border border-black p-2'>Name</th>
                    <th className='border border-black p-2'>Status</th>
                    <th className='border border-black p-2'>Actions</th>
                  </tr>
                </thead>
              <tbody>
              {automations.map((automation,index) => (
                <tr key={index} className='bg-gray-200'>
                  <td className='border border-black text-center w-2 p-2'>{automation.name}</td>
                  <td className='border border-black text-center w-2 p-2'>{automation.status}</td>
                  <td className='border border-black text-center w-2 p-2'>
                    <div className="flex justify-center items-center p-2 gap-2">
                      <button
                        onClick={()=> editAutomation(index)}
                        className="bg-green-500 text-white p-2 ml-6 mt-2 rounded-md hover:bg-green-700 text-center">
                          Edit
                      </button> 
                         <button
                        onClick={()=> deleteAutomation(index)}
                        className="bg-red-500 text-white p-2 ml-6 mt-2 rounded-md hover:bg-red-700 text-center">
                          Delete
                      </button>
                    </div>          
                  </td>
                </tr>
                ))}
              </tbody>
          </table>
           <button
                      onClick={createAutomation}
                      className="bg-blue-500 text-white p-2 ml-2 mt-4 rounded-md hover:bg-blue-700 text-center">
                        {editingIndex === -1 ? 'Create Automation' : 'Update Automation'}
                      </button>
        </div>
        </div>
        </div>
    </div>
  )
}

export default App
