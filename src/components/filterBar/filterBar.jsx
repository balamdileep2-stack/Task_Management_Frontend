import { TaskPagination } from "../taskPagination/taskPagination"
import { OrderSelect } from "../orderSelect/orderSelect"

export function FilterBar(){
    return (
        <>
        <nav className="flex flex-row justify-between mb-8">
            <TaskPagination/>
            <OrderSelect/>
        </nav>
        </>
    )
}