interface ICategory {
  id: number;
  name: string;
}
interface IBranch {
  id: number;
  name: string;
}
export interface IService {
  id: number;
  name: string;
  description: string;
  price: number;
  status: number;
  branchId: number;
  totalSessions: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  category: ICategory;
  categoryId: number;
  branch: IBranch;
}
