// src/types/lp.ts
export interface Lp {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    tags: Tag[];
    likes: {
      id: number;
      userId: number;
      lpId: number;
    }[];
  }

export interface Tag {
    id: number;
    name: string;
  }