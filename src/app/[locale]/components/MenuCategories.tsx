"use client";
;
import { categoriesList } from "@/utils/actions/categories/actions";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";

const MenuCategories = () => {
  const currentLocale = useLocale();

  const [categories, setCategories] = useState<
    Array<{ id: number; name: string;}>
  >([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await categoriesList({
        paginate: 5,
        is_menu: 1,
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div >
        {categories.map((category) => (
            <Link 
                key={category.id} 
                href={`/${currentLocale}/shop?category_id=${category.id}`}
                className="hover:text-blue-400 transition-colors"
            >
                {category.name}
            </Link>
        ))}
    

    </div>
  );
};

export default MenuCategories;
