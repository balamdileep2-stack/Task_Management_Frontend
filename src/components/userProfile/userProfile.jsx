import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function UserProfile({firstName="John"}=props){
    return (
    <div class="flex flex-col w-full pt-8 items-center">
        <Avatar className="mb-4">
            <AvatarImage src="https://github.com/evilrg" alt="@evilrabbit"/>
            <AvatarFallback className="text-2xl font-semibold">{firstName.slice(0,1)}</AvatarFallback>
        </Avatar>
        <h4>Hello, {firstName}</h4>
    </div>
    )
}