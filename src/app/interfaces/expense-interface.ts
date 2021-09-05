
export interface User{
  name: string;
  email: string;
  password?: string;
  uid?: string;
  displayName?: string;
}

export interface Family{
  name: string;
  members: string[];
  familyid?: string;
}

export interface Transaction{
  date: any;
  category: string;
  amount: number;
  notes?: string;
  userId: string;
  familyId: string;
  type?: string;

}

export interface CashflowGroup{
  category: string;
  amount: number;
}

export interface Category{
  name: string;
}
