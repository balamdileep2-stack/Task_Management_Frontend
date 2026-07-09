import {z} from "zod"

export const CreateTaskSchema = z.object({
    title:z.string().max(100,{message:"Title should not cross over 100 characters"}),
    description:z.string().max(500,{message:"Description should not more then 500 characters"}),
    dueDate:z.date({
        required_error:"Task due date is required.",
    }),
    status:z.enum(["todo","inProgress","completed"]),
    priority:z.enum(["low","normal","high"]),
})
