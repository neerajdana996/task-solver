import TaskCard from "./TaskCard"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function TaskList({ tasks }: {
    tasks: any[]
}) {
    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 w-full">
            {tasks?.map(task => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    )
}


