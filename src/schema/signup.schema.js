import {z} from "zod";

const passwordValidation =new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/);

export const SignupSchema = z.object({
    firstName:z.string().min(3,{message:"The firstName should at leasts 3 characters"}).max(100,{message:"The firstname should not cross 100 characters"}),
    lastName:z.string().max(100,{message:"The firstname should not cross 100 characters"}).optional(),
    email:z.string().email(),
    password:z.string().regex(passwordValidation,{message:"Password must include at least one number,one uppercase letter,one lowercase letter,and one Special Character."}),
});
