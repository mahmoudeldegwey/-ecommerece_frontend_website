import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCartStore } from "@/stores/useCartStore";
export default function CartItem({ item, index }: { item: any, index: number }) {
      const { items, removeFromCart, updateQuantity, clearCart } = useCartStore();
      const t = useTranslations("Cart");
    
      const handleQuantityChange = (item: any, newQty: number | string) => {
        const quantity = parseInt(newQty as string);
        if (quantity >= 1) {
          updateQuantity(item.id, quantity, item.color?.id, item.size?.id);
        }
      };
    

    return (
        <div>
            <div key={index} className="flex gap-4 border-b pb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>

                  <span className="text-sm text-gray-600 block">
                    {t("quantity")}: {item.quantity}
                  </span>

                  {/* Render Size */}
                  {item.size && (
                    <span className="text-sm text-gray-600 block">
                      {t("size")}: <span className="font-medium">{item.size.name}</span>
                    </span>
                  )}

                  {/* Render Color */}
                  {item.color && (
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-600">{t("color")}:</span>
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: item.color.name }}
                        title={item.color.name}
                      />
                    </div>
                  )}

                  {/* Price & Sale */}
                  <div className="flex items-center space-x-2 mt-1">

                    {
                    item.sale_price != null ? (
                    <div className='d-flex items-center text-center justify-center gap-2'>
                        <p className="text-sm text-green-700 font-bold mt-1">{t("price")}:</p>
                        <p className="text-1xl font-bold text-red-400 ">{item.sale_price}</p>
                        <p className="text-1xl  text-gray-400 line-through">{item.price}</p>
                    </div>
                    ) : (
                    <div className='d-flex items-center text-center justify-center gap-2'>
                        <p className="text-1xl font-bold text-red-400">{item.price}</p>
                    </div>
                    )
                    
                    }


                  </div>

                  {/* Quantity Control */}
                  <div className="flex items-center space-x-2 mt-2">
                    <Input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item, e.target.value)}
                      className="w-20"
                    />
                    <button
                      className="text-red-500"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </div>
                </div>
            </div>
        </div>
    );
}