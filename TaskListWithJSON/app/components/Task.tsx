"use client"

import { deleteTodo, editTodo } from "@/api"
import { ITask } from "@/types/tasks"
import { useRouter } from "next/navigation"
import { FormEventHandler, useState } from "react"
import { AiFillEdit } from "react-icons/ai"
import { BsTrashFill } from "react-icons/bs"
import Modal from "./Modal"


interface TaskProps {
  task: ITask
}

const Task = ({task}: TaskProps) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false)
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text)
  const router = useRouter()

  const handleSubmitEditedTodo:FormEventHandler<HTMLFormElement> = async(e) =>{
    e.preventDefault()
    await editTodo({
      id: task.id,
      text: taskToEdit
    })

    
    setOpenModalEdit(false)
    router.refresh()
  }

  const handleDeleteTask = async(id:string)=> {
    await deleteTodo(id)
    setOpenModalDeleted(false)
    router.refresh()
  }


  return (
    <tr key={task.id}>
    <td className="w-full">{task.text}</td>
    <td className="flex gap-5">
      <AiFillEdit onClick={() => setOpenModalEdit(true)} className="text-blue-500 cursor-pointer" size={25}/>
      <Modal modalOpen={openModalEdit} setmodalOpen={setOpenModalEdit}>
      <form onSubmit={handleSubmitEditedTodo}>
        <h3 className='font-bold text-lg'>Edit Task</h3>
        <div className='modal-action'>
          <input
           type="text" 
           placeholder='Type here'
           className='input input-bordered w-full'
           value={taskToEdit}
           onChange ={(e)=> setTaskToEdit(e.target.value) }
           />
           <button type='submit' className='btn'>Submit</button>
        </div>
      </form>
    </Modal>


      <BsTrashFill onClick={() => setOpenModalDeleted(true)} className="text-red-500 cursor-pointer" size= {25}/>
      <Modal modalOpen={openModalDeleted} setmodalOpen={setOpenModalDeleted}>
        <h3>are you sure, you want to delete this task?</h3>
        <div className="modal-action">
          <button 
          onClick={() => handleDeleteTask(task.id)}
          className="btn"
          >
            Yes
          </button>
        </div>
    </Modal>
    </td>
    </tr>
  )
}

export default Task