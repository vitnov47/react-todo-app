import {useState, useEffect} from 'react'
import {TaskContext} from './TaskContext'

export default function TaskListProvider({children}){
const [tasks, setTasks] = useState([])
useEffect(() => {
setTasks([
    {
        name: "Помочь маме",
        priority: 'middle',
        startDate: '21-10-2025',
        endDate: '04-11-2025',
        note: 'Семья'
    },
    {
        name: "Изучение React",
        priority: 'high',
        startDate: '23-10-2025',
        endDate: '25-12-2025',
        note: 'Учеба'
    },
    {
        name: "Жестко накачаться айяйяй",
        priority: 'low',
        startDate: '01-07-2025',
        endDate: '01-01-2026',
        note: 'Спорт'
    },
])


},[])

return (<TaskContext.Provider value={{tasks, setTasks}}>
    {children}
</TaskContext.Provider>)
}