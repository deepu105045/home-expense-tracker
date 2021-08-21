
export interface User{
  name: string;
  email: string;
  password?: string;
}

export interface Family{
  name: string;
  members: string[];
  familyid?: string;
}

export interface Transaction{
  date: Date;
  category: string;
  amount: number;
  note?: string;
  userId: string;
  familyId: string;
  type?: string;

}

