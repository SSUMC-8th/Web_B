export interface Author {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
  }
  
  export interface Comment {
    id: number;
    content: string;
    lpId: number;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    author: Author;
  }
  
  export interface CommentPage {
    data: Comment[];
    nextCursor: number;
    hasNext: boolean;
  }