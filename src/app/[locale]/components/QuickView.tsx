
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { Link } from 'lucide-react';
import ProductInfo from '@/app/[locale]/components/ProductInfo';
import ProductImages from '@/app/[locale]/components/ProductImages';
import { singleProduct } from "@/utils/actions/products/actions";

interface QuickViewProps {
    isOpen: boolean;
    onClose: () => void;
    id:  number;
}


const  QuickView =  ({ isOpen, onClose, id }: QuickViewProps) => {
    const [product, setProduct] = useState<any>(null);
    useEffect(() => {
        if (isOpen) {
            const fetchProduct = async () => {
                try {
                    const productData = await singleProduct(id);
                    //console.log(productData, 'product data in quick view')
                    setProduct(productData);
                } catch (error) {
                    console.error("Error fetching product:", error);
                }
            }
            fetchProduct();
        }
    }, [isOpen, id]);
   
    console.log(product, 'product in quick view')

    return (
        <Modal show={isOpen} onClose={onClose}  size="7xl" >
            <Modal.Header>
                {/* <feColorMatrix className="w-5" /> */}
            </Modal.Header>
            <Modal.Body className='w-full mx-auto' >

                {product ? (
                <div className="w-full">
                    <div className="detail-block">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Product Images */}
                        <div className="w-full md:w-1/3 lg:w-1/4">
                        <ProductImages product={product} />
                        </div>

                        {/* Product Info */}
                        <div className="w-full md:w-2/3 lg:w-3/4">
                        <ProductInfo id={id} />
                        </div>
                    </div>
                    </div>
                </div>
                ) : (
                <p className="text-center text-gray-500 py-6">Loading...</p>
                )}


            </Modal.Body>
        </Modal>
    );
}

export default QuickView