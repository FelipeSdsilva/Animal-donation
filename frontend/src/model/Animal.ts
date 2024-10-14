export interface Animal {
    id: number;
    name: string;
    description: string;
    category: string;
    imageUrl: string;
    birthDate: Date;
    age?: number,
    status: 'ADOPTED' | 'AVAILABLE'; 
  }
  