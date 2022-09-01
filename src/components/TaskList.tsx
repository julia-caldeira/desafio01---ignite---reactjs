import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(!newTaskTitle) return; //impeço criação de vazio

    //crio novo objeto e atribuo o que me vem do input html, que é o newTaskTitle
    const novaTarefa = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }
    //incluo na lista de tasks junto com as outras
    setTasks(oldState => [...oldState, novaTarefa]);
    setNewTaskTitle(''); //pra esvaziar a caixinha de texto
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    const ticarTask = tasks.map(task => task.id === id ? {
      ...tasks, //pego estado antigo e mudo uma caracateristica
      id: task.id,
      title: task.title,
      isComplete: !task.isComplete} : //else
      task); //as q nao tem a id do parametro, retorno sem mudar nada
      setTasks(ticarTask)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    const taksFiltradas = tasks.filter(task => task.id !== id) //fico só com as que nao quero apagar

    setTasks(taksFiltradas); //atribuo as que sobraram no setTasks
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}