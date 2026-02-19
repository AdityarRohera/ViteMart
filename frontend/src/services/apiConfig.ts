
export const USER_API_ENDPOINT = {
    REGISTER : '/auth/register',
    LOGIN : '/auth/login',
    ME : '/me',
    LOGOUT : '/logout'
};



export const CATEGORY_API_ENDPOINT = {
    CATEGORIES : '/categories',
    // CATEGORY_COURSES : '/category-courses',
}

export const COMMON = {
    UPLOADIMAGE : '/uploadImage'
}

export const VENDORS_PRODUCT_ENDPOINT = {
    NEWPRODUCT : '/newproduct',
    GETpRODUCT : '/product',
    GETALLPRODUCTS : '/allProducts'
}

export const VENDORS_Manage_Inventory_ENDPOINT = {
    NEWINVENTORY : '/newInventory',
    GETINVENTORY : '/inventory'
}

// export const PAYMENT_API_ENDPOINT = {
//     CREATE_ORDER : '/payment/create-order',
//     VERIFY_PAYMENT : '/payment/verify-payment'
// }

// export const UPLOAD_API_ENDPOINT = {
//     IMAGE_UPLOAD : '/upload/image-upload',
//     VIDEO_UPLOAD : '/upload/video-upload',
//     DELETE_IMAGE : '/upload/delete-image',
//     DELETE_VIDEO : '/upload/delete-video'
// }

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;