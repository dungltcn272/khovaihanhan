import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  orderBy 
} from 'firebase/firestore';
import { db } from './firebase';

// ============================================
// TYPES
// ============================================

export interface Fabric {
  id: string;
  name: string;
  slug: string;
  pricePerMeterMin: number;
  pricePerMeterMax: number;
  material: string;
  description: string;
  uses: string;
  image: string;
  isActive: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export interface Product {
  id: string;
  fabricId?: string;
  name: string;
  slug: string;
  description: string;
  size: string;
  origin: string;
  pricePerMeter: number;
  discountPercent: number;
  category: 'featured' | 'new' | 'bestseller';
  imageUrls: string[];
  isActive: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export interface ContactMessage {
  id: string;
  productId: string;
  selectedImageUrl: string;
  quantity: number;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  customerCity?: string;
  message?: string;
  contactMethod: 'zalo' | 'facebook';
  status: 'new' | 'contacted' | 'completed';
  createdAt?: any;
}

export interface Banner {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export interface ContactInfo {
  id: string;
  avatarUrl: string;
  storeName: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zaloLink: string;
  facebookLink: string;
  description: string;
  updatedAt?: any;
}

// ============================================
// PRODUCTS - PUBLIC
// ============================================

export async function getProducts(category?: string): Promise<Product[]> {
  try {
    const productsRef = collection(db, 'products');
    let q;
    
    if (category) {
      q = query(
        productsRef,
        where('category', '==', category),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(
        productsRef, 
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('slug', '==', slug));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return null;
    
    const docData = snapshot.docs[0];
    return {
      id: docData.id,
      ...docData.data()
    } as Product;
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return null;
    
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as Product;
  } catch (error) {
    console.error('Error fetching product by id:', error);
    return null;
  }
}

// ============================================
// FABRICS - PUBLIC
// ============================================

export async function getFabrics(): Promise<Fabric[]> {
  try {
    const fabricsRef = collection(db, 'fabrics');
    const q = query(
      fabricsRef, 
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Fabric));
  } catch (error) {
    console.error('Error fetching fabrics:', error);
    return [];
  }
}

export async function getFabricById(id: string): Promise<Fabric | null> {
  try {
    const docRef = doc(db, 'fabrics', id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return null;
    
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as Fabric;
  } catch (error) {
    console.error('Error fetching fabric:', error);
    return null;
  }
}

// ============================================
// CONTACT MESSAGES - PUBLIC
// ============================================

export async function saveContactMessage(data: {
  productId: string;
  selectedImageUrl: string;
  quantity: number;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  customerCity?: string;
  message?: string;
  contactMethod: 'zalo' | 'facebook';
}): Promise<string> {
  try {
    const messagesRef = collection(db, 'contactMessages');
    const docRef = await addDoc(messagesRef, {
      ...data,
      status: 'new',
      createdAt: Timestamp.now()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error saving contact message:', error);
    throw error;
  }
}

// ============================================
// ADMIN: PRODUCTS
// ============================================

export async function createProduct(data: Omit<Product, 'id'>): Promise<string> {
  try {
    const productsRef = collection(db, 'products');
    const docRef = await addDoc(productsRef, {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  try {
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'products', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

// ============================================
// ADMIN: FABRICS
// ============================================

export async function createFabric(data: Omit<Fabric, 'id'>): Promise<string> {
  try {
    const fabricsRef = collection(db, 'fabrics');
    const docRef = await addDoc(fabricsRef, {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating fabric:', error);
    throw error;
  }
}

export async function updateFabric(id: string, data: Partial<Fabric>): Promise<void> {
  try {
    const docRef = doc(db, 'fabrics', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating fabric:', error);
    throw error;
  }
}

export async function deleteFabric(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'fabrics', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting fabric:', error);
    throw error;
  }
}

// ============================================
// ADMIN: CONTACT MESSAGES
// ============================================

export async function getContactMessages(status?: string): Promise<ContactMessage[]> {
  try {
    const messagesRef = collection(db, 'contactMessages');
    let q;
    
    if (status) {
      q = query(
        messagesRef,
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(messagesRef, orderBy('createdAt', 'desc'));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ContactMessage));
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return [];
  }
}

export async function updateContactMessageStatus(
  id: string, 
  status: 'new' | 'contacted' | 'completed'
): Promise<void> {
  try {
    const docRef = doc(db, 'contactMessages', id);
    await updateDoc(docRef, { status });
  } catch (error) {
    console.error('Error updating contact message status:', error);
    throw error;
  }
}

export async function deleteContactMessage(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'contactMessages', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting contact message:', error);
    throw error;
  }
}

// ============================================
// BANNERS - PUBLIC
// ============================================

export async function getBanners(): Promise<Banner[]> {
  try {
    const bannersRef = collection(db, 'banners');
    const q = query(
      bannersRef, 
      where('isActive', '==', true),
      orderBy('order', 'asc')
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Banner));
  } catch (error) {
    console.error('Error fetching banners:', error);
    return [];
  }
}

// ============================================
// ADMIN: BANNERS
// ============================================

export async function getAllBanners(): Promise<Banner[]> {
  try {
    const bannersRef = collection(db, 'banners');
    const q = query(bannersRef, orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Banner));
  } catch (error) {
    console.error('Error fetching all banners:', error);
    return [];
  }
}

export async function createBanner(data: Omit<Banner, 'id'>): Promise<string> {
  try {
    const bannersRef = collection(db, 'banners');
    const docRef = await addDoc(bannersRef, {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating banner:', error);
    throw error;
  }
}

export async function updateBanner(id: string, data: Partial<Banner>): Promise<void> {
  try {
    const docRef = doc(db, 'banners', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating banner:', error);
    throw error;
  }
}

export async function deleteBanner(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'banners', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting banner:', error);
    throw error;
  }
}

// ============================================
// CONTACT INFO - PUBLIC
// ============================================

export async function getContactInfo(): Promise<ContactInfo | null> {
  try {
    const contactRef = collection(db, 'contactInfo');
    const snapshot = await getDocs(contactRef);
    
    if (snapshot.empty) return null;
    
    const docData = snapshot.docs[0];
    return {
      id: docData.id,
      ...docData.data()
    } as ContactInfo;
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return null;
  }
}

// ============================================
// ADMIN: CONTACT INFO
// ============================================

export async function updateContactInfo(id: string, data: Partial<ContactInfo>): Promise<void> {
  try {
    const docRef = doc(db, 'contactInfo', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating contact info:', error);
    throw error;
  }
}

export async function createContactInfo(data: Omit<ContactInfo, 'id'>): Promise<string> {
  try {
    const contactRef = collection(db, 'contactInfo');
    const docRef = await addDoc(contactRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating contact info:', error);
    throw error;
  }
}

// ============================================
// IMAGE UPLOAD - Using Cloudinary (no Firebase Storage)
// ============================================
// Images are uploaded via Cloudinary Upload Widget in admin panel
// Only URLs are stored in Firestore
