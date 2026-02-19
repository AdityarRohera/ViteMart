'use client'
import React from 'react'
import { Input } from '@/components/ui/input'
import { useState , useEffect } from 'react';
import { fetchCategories } from '@/services/operations/common';
import { FileUploader } from "react-drag-drop-files";
import DragDrop from '@/components/Common/DragDrop';
import { uploadProduct } from '@/services/operations/common';
import { fetchProduct, newProduct, updateProduct } from '@/services/operations/vendor/productAndInventory';
import toast , {Toaster} from 'react-hot-toast'
import { useRouter } from 'next/navigation';


function NewProductForm({draft , productId} : any) {

    const [productForm, setProductForm] = useState({
        label: "",
        description: "",
        category_id: "",
        buying_price: "",
        selling_price: "",
        quantity: "",
        product_url: "",
     });

     const [categories , setCategories] = useState<any>(null);
     const [selectedFile, setSelectedFile] = useState<any>(null);
     const [product , setProduct] = useState(null);
     const [loading , setLoading] = useState(false);
     const [pageLoading, setPageLoading] = useState(false);
     const router = useRouter();

    //  console.log("Product form data -> " , productForm);
    //  console.log("Selected File -> " , selectedFile);

   const handleFileChange = (file: any) => setSelectedFile(file);

   const changeHandler = (e : any) => {
            const {name , value} = e.target;
            setProductForm((prev : any) => {
                return {
                    ...prev , [name] : value
                }
            })
        }

    const clearImageHandler = () => {
        setProductForm(prev => {
            return {... prev , product_url : ""}
        })
    }
    
    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();

      setLoading(true);

      let imageUrl = productForm.product_url;
        if (selectedFile) {
               imageUrl = await uploadProduct(selectedFile);
               if (!imageUrl) {
                 setLoading(false);
                 return alert("Image upload failed");
               }

               setProductForm((prev : any) => {
                return {...prev , product_url : imageUrl}
               })
        }   

    const payload = {
        ...productForm,
        product_url: imageUrl,
    };

    let savedProduct;

     if (draft) {
        console.log("Inside draft update")
        savedProduct = await updateProduct(payload , productId);
     } else {
      savedProduct = await newProduct(payload);
     }

     console.log("Saved Product ->" , savedProduct);

     setLoading(false);

     if (!savedProduct) return alert("Product save failed");
     router.push(`/dashboard/product/inventory/${savedProduct.id}`)

    };

    useEffect(() => {
        fetchCategories().then((data : any) => setCategories(data))
    } , [])


    useEffect(() => {

        if (!draft) return;

        const loadProduct = async () => {
          setPageLoading(true);
        
          const data = await fetchProduct(productId);
          console.log(data);
        
          if (!data) {
            setPageLoading(false);
            return;
          }

          setProduct(data)
      
          setProductForm({
            label: data.label || "",
            description: data.description || "",
            category_id: data.category_id || "",
            buying_price: data.buying_price || "",
            selling_price: data.selling_price || "",
            quantity: data.quantity || "",
            product_url: data.product_url || "",
          });

            setPageLoading(false);
  };

  loadProduct();
}, [draft, productId]);


    if(pageLoading) return "Loading..."

    if(loading) return "Loading..."

    if((draft && !productId) || (draft && !product)){
        return <div>Invalid Product Id</div>
    }


  return (
     <div className="bg-white rounded-2xl shadow p-8 w-[55%]">

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col gap-6">

            {/* Product Name */}
            <div>
              <h2 className="text-lg font-medium mb-2 opacity-80">
                Product Name
              </h2>
              <Input className="h-12 shadow" placeholder="Product Name" name="label" value={productForm.label} onChange={changeHandler} />
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-medium mb-2 opacity-80">
                Description
              </h2>
              <textarea
                placeholder="Product description..."
                className="w-full border rounded-lg p-3 shadow text-xl
                focus:outline-none focus:ring-2 focus:ring-blue-500"
                name='description'
                rows={4}
                value={productForm.description}
                onChange={changeHandler}
              />
            </div>

            {/* Category */}
            <div>
              <h2 className="text-lg font-medium mb-2 opacity-80">
                Category
              </h2>
              <select
                className="w-full border rounded-lg p-3
                focus:outline-none focus:ring-2 focus:ring-blue-500 shadow h-12  placeholder-opacity-50"
                name='category_id'
                id='category_id'
                value={productForm.category_id}
                onChange={changeHandler}
              >

                 <option>Select category...</option>

                {
                    categories && categories.map((c : any) => {
                        return <option key={c.id} value={c.id}>{c.name}</option>
                    })
                }
              </select>
            </div>

            {/* Selling Price */}
            <div>
              <h2 className="text-lg font-medium mb-2 opacity-80">
                Price
              </h2>
              <Input type="number" className="h-12 shadow" placeholder="$ Selling Price" name="selling_price" value={productForm.selling_price} onChange={changeHandler} />
            </div>

            {/* Buying + Quantity */}
            <div className="flex gap-6">

              <div className="w-full">
                <h2 className="text-lg font-medium mb-2 opacity-80">
                  Buying Price
                </h2>
                <Input type="number" className="h-12 shadow" placeholder="$ Buying Price" name="buying_price" value={productForm.buying_price} onChange={changeHandler} />
              </div>

              <div className="w-full">
                <h2 className="text-lg font-medium mb-2 opacity-80">
                  Stock Quantity
                </h2>
                <Input type="number" className="h-12 shadow" placeholder="0" name="quantity" value={productForm.quantity} onChange={changeHandler} />
              </div>

            </div>

            {/* Image Upload */}
            <div className=''>
                <h2 className="text-lg font-medium mb-2 opacity-80">
                  Product Image
                </h2>
                {
                    productForm.product_url ? <img src={productForm.product_url}  className="border-2 border-gray-50 shadow rounded-xl text-center cursor-pointer h-100 w-full flex justify-center items-center"/> :
                    <DragDrop handleFileChange={handleFileChange} setSelectedFile={setSelectedFile} selectedFile={selectedFile}/>
                }

                {
                    productForm.product_url && 
                    <button
                        onClick={clearImageHandler}
                        className="mt-4 rounded-2xl bg-gray-200 text-black p-3 hover:bg-gray-100 transition shadow cursor-pointer"
                        type='submit'
                    >
                        Clear Image
                    </button>
                }
            </div>

            {/* Submit */}
            <button
              className="mt-4 bg-blue-600 text-white py-3 
              rounded-lg hover:bg-blue-700 transition shadow"
              type='submit'
            >
              Create Product
            </button>

          </form>
        </div>
  )
}

export default NewProductForm
