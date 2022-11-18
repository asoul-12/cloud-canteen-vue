export interface Order {}

export interface DishInfo {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  sort: number;
  image: string;
  price: number;
  description: string;
  stock: number;
  status: boolean;
  createTime: string;
  canteenId: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  sort: number;
  canteenId: string;
  updateTime: string;
}
