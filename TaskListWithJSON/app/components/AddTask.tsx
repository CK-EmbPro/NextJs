"use client"

import { addTodo } from '@/api'
import { FormEvent, FormEventHandler, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import Modal from './Modal'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

const AddTask = () => {

  const router = useRouter();
  const [modalOpen, setmodalOpen] = useState<boolean>(false)
  const [newTaskValue, setNewTaskValue] = useState<string>("")

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async(e) =>{
    e.preventDefault()
    await addTodo({
      id: uuidv4(),
      text: newTaskValue
    })

    setNewTaskValue("")
    setmodalOpen(false)
    router.refresh()
  }

  return (
    <>
    <button onClick={()=> setmodalOpen(true)} className="btn btn-primary w-full">Add new task <AiOutlinePlus size={18} className="ml-2"/></button>

    <Modal modalOpen={modalOpen} setmodalOpen={setmodalOpen}>
      <form onSubmit={handleSubmitNewTodo}>
        <h3 className='font-bold text-lg'>Add new Task</h3>
        <div className='modal-action'>
          <input
           type="text" 
           placeholder='Type here'
           className='input input-bordered w-full'
           value={newTaskValue}
           onChange ={(e)=> setNewTaskValue(e.target.value) }
           />
           <button type='submit' className='btn'>Submit</button>
        </div>
      </form>
    </Modal>
    </>
  )
}

export default AddTask