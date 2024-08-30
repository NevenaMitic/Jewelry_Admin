// Definiše tip za kolekciju
type CollectionType = {
    _id: string;
    title: string;
    description: string;
    image: string;
    products: ProductType[];
  }

  // Definiše tip za proizvod
  type ProductType = {
    _id: string;
    title: string;
    description: string;
    media: [string];
    category: string;
    collections: [CollectionType];
    tags: [string];
    sizes: [string];
    price: number;
    gemstone: string;
    diamondWeight: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Definiše tip za kolonu narudžbine
  type OrderColumnType = {
    _id: string;
    customer: string;
    products: number;
    totalAmount: number;
    createdAt: string;
  }

  // Definiše tip za stavku narudžbine
  type OrderItemType = {
    product: ProductType
    size: string;
    quantity: number;
  }

  // Definiše tip za kupca
  type CustomerType = {
    clerkId: string;
    name: string;
    email: string;
  }