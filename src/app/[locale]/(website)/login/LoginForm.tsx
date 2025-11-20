
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/utils/validationSchema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLocale } from "next-intl";

export default function LoginForm() {
    const t = useTranslations('LoginPage');
    const t_validation = useTranslations('Validation');
    const router = useRouter();
    const currentLocale = useLocale();

    const loginAction = async (formData: FormData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const Schema = loginSchema(t_validation);

        const validation = Schema.safeParse({ email, password });
    
        if (!validation.success) {
            toast.error(validation.error.errors[0].message);
            return;
        }
    
        try {
            
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
        <h4>{t('login')}</h4>
        <hr />
        <form action={loginAction}>
        <div className="form-group mt-3">
            <label>{t('email')}:</label>
            <Input type="email" name="email" className="form-control" />
        </div>
        <div className="form-group mt-3">
            <label>{t('password')}:</label>
            <Input type="password" name="password" className="form-control" />
        </div>
            <Button type="submit" className="btn btn-primary mt-4">{t('login')}</Button>
        </form>
    </div>;
}