import { ITask } from "@/types/tasks"
import Task from "./Task"

interface TodoListProps {
  tasks: ITask[]
}

const TodoList: React.FC<TodoListProps> = ({tasks}) => {
  return (
    <div className="overflow-x-auto">
  <table className="table table-xs table-pin-rows table-pin-cols">
    <thead>
      <tr>
        <td>Task</td>
        <td>Actions</td>
      </tr>
    </thead> 
    <tbody>
      {tasks.map((task) => (
      <Task key={task.id} task={task} />
      ) )
        
      }
      
      
    </tbody> 
    
  </table>
</div>
  )
}

export default TodoList