export interface Animal {
    id: number;
    name: string;
    description: string;
    birthDate: Date;
    category: string;
    imageUrl: string;
    status: 'ADOPTED' | 'AVAILABLE'; 
  }
  