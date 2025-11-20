
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerSchema } from "@/utils/validationSchema";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { signIn } from "next-auth/react";
import { register } from "@/utils/auth/action"

export default function RegisterForm() {

    const t = useTranslations('LoginPage');
    const t_validation = useTranslations('Validation');
    const router = useRouter();
    const currentLocale = useLocale();

    const registerAction = async (formData: FormData) => {
        const email = formData.get("email") as string;
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const password_confirmation = formData.get("password_confirmation") as string;

        //console.log('formData', formData)
        
        const Schema = registerSchema(t_validation);

        const validation = Schema.safeParse({ email, username, password, password_confirmation });

        if (!validation.success) {
            toast.error(validation.error.errors[0].message);
            return;
        }

        try {

            const client = await register(username, email, password, password_confirmation).then((result) => {
                return result
            });

            if (client?.errors) {
                const errorKey = Object.keys(client.errors)[0];
                toast.error(client.errors[errorKey][0]);
                return;
            }

            const result =  await signIn("credentials", { email, password, redirect: false });

            if (result?.ok === false) {
                toast.error(t_validation('login_failed'));
                return;
            }

            toast.success(t_validation('login_success'));

            setTimeout(() => {
                router.replace(`/${currentLocale}`);                
            }, 1000);
            
        } catch (error) {
            toast.error(`Something went wrong. Please try again. ${error}`);
        }
    }

    return <div>
        <h4>{t('register')}</h4>
        <hr />
        <form action={registerAction}>
            <div className="form-group mt-3">
                <label>{t('email')}:</label>
                <Input type="email" name="email" className="form-control" />
                </div>
                <div className="form-group mt-3">
                    <label>{t('username')}:</label>
                    <Input type="text" name="username" className="form-control" />
                </div>
                <div className="form-group mt-3">
                    <label>{t('password')}:</label>
                    <Input type="password" name="password" className="form-control" />
                </div>
                <div className="form-group mt-3">
                    <label>{t('password_confirmation')}:</label>
                    <Input type="password" name="password_confirmation" className="form-control" />
                </div>
                    <Button type="submit" className="btn btn-primary mt-4">{t('register')}</Button>
                </form>
    </div>;
}