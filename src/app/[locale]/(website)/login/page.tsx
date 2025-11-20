import type { Metadata } from "next";
import { getTranslations,getLocale } from "next-intl/server";
import LoginPage from "./LoginPage";
import {authOptions} from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('LoginPage');
    const session = await getServerSession(authOptions);
    const locale =  await getLocale();
    
    if (session) {
      redirect('/' + locale + '/');
    }

    return {
      title: t('login'),
      description: t('description'),
    }
  }

export default function Login() {

  return (
    <div>
        <LoginPage />
    </div>
  );
}