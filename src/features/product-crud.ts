import { doc, addDoc, deleteDoc, updateDoc, serverTimestamp, collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import { PRODUCT_COLLECTION_NAME } from "@/constants";

export const fireBaseObject = {
    getProducts: async (): Promise<any[]> => {
        const listOfProduct: any[] = [];
        try {
            const querySnapshot = await getDocs(collection(db, PRODUCT_COLLECTION_NAME));
            querySnapshot.forEach((doc) => {
                const { id } = doc;
                const product = doc.data();
                listOfProduct.push({ id, ...product })
            });
            console.info(`listOfProduct: ${JSON.stringify(listOfProduct)}`)
        } catch (error) {
            console.error("Error while fetching list of product " + (error as Error).message);
            return [];
        }
        return listOfProduct;
    },
    getSingleProduct: async (documentId: string) => {
        const docRef = doc(db, PRODUCT_COLLECTION_NAME, documentId);
        const docSnap = await getDoc(docRef);
        const id = docSnap.id;
        // docSnap.data() will be undefined if there is no such document!
        return { ...docSnap.data(), id }
    },
    insertProduct: async (insertData: Record<string, any>) => {
        const data = {
            ...insertData,
            name: insertData.name.toLowerCase(),
            product_type: insertData.product_type.toLowerCase(),
            brand: insertData.brand.toLowerCase(),
            price: Number(insertData.price)
        }

        console.log('inserting data: ', data)

        await addDoc(collection(db, PRODUCT_COLLECTION_NAME), {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        })
    },
    updateProduct: async (documentId: string, updateData: Record<string, any>) => await updateDoc(doc(db, PRODUCT_COLLECTION_NAME, documentId), { ...updateData, updatedAt: serverTimestamp() }),
    deleteProduct: async (documentId: string) => await deleteDoc(doc(db, PRODUCT_COLLECTION_NAME, documentId))
}