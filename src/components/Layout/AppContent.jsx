import useTasks from '../../useTasks'

export default function AppContent(){
    const {tasks} = useTasks()
    return (<div><ul>{tasks.map((task) => {return <li key={task.name}>{task.name}</li>} )}</ul></div>)
}