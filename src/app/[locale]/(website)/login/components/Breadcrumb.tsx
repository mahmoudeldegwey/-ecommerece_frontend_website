import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react"
import { useTranslations } from "next-intl";

const BreadcrumbComponent = () => {
    const t = useTranslations('LoginPage');
    
    return <div>
        <Breadcrumb className=" d-flex text-center mt-3">
            <BreadcrumbList className=" d-flex p-0" style={{listStyleType: 'none'}}>
                <BreadcrumbItem className="">
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="ms-auto">
                    <Slash style={{height: '12px'}} />
                </BreadcrumbSeparator>
                <BreadcrumbItem className="ms-auto">
                <BreadcrumbPage>{t('login_and_register')}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    
    </div>;
}

export default BreadcrumbComponent;