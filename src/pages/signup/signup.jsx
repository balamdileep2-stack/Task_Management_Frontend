import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Link } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import { SignupSchema } from "@/schema/signup.schema.js";

import { useSignup } from "@/hooks/useSingup.hook";
import {useEffect} from "react";
import { Toaster } from "@/components/ui/toaster";

import { useToast } from "@/hooks/use-toast";


function LoginRedirect(){
    return (
        <Button variant="secondary" asChild>
            <Link to="/">Login Here</Link>
        </Button>
    );
}


export default function Signup(){
    const {mutate,isPending,isError,isSuccess} = useSignup();
    const {toast} =  useToast();


    const form = useForm({
        resolver: zodResolver(SignupSchema),

    })

    function onSubmit(values){
        mutate(values);
        form.reset();
    }
    
    useEffect(()=>{
        if(isSuccess){
            toast({
                title:"User Created Successfully!",
                description:"You can login and start creating tasks",
                action:<LoginRedirect/>,
            })
        }
    },[isSuccess]);

    useEffect(()=>{
        if(isError){
            toast({
                title:"OOPs! Your Request is Failed",
                description:"User already exists",
                variant:"destructive",
            })
        }
    },[isError]);
    
    return (
    <section className="flex flex-row w-full max-w-screen-xl min-h-screen justify-center items-center">
        <div className="w-4/12">
            <Card>
            <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>Create a new account to start creating tasks</CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({field})=>(
                                <FormItem className="mb-4">
                                    <FormControl>
                                        <Input placeholder="FirstName" {...field} value={field.value ?? ""}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({field})=>(
                                <FormItem className="mb-4">
                                    <FormControl>
                                        <Input placeholder="LastName" {...field} value={field.value ?? ""}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({field})=>(
                                <FormItem className="mb-4">
                                    <FormControl>
                                        <Input placeholder="Email" {...field} value={field.value ?? ""}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({field})=>(
                                <FormItem className="mb-4">
                                    <FormControl>
                                        <Input type="password" placeholder="Password" {...field} value={field.value ?? ""}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="flex flex-row justify-between">
                        <p className="basis-1/2">already have an account? <Link to="/" className="hover:text-blue-500">Login Here</Link></p>
                        <Button type="submit">Signup</Button>
                    </CardFooter>
                </form>
            </Form>
            </Card>
        </div>
        <Toaster/>
    </section>
    )
}