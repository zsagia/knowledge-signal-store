export type Book = {
  author: string;
  name: string;
  uid: string;
};

export const books: Book[] = [
  { uid: '1a', name: 'Old Shatterhand', author: 'Karl May' },
  { uid: '1b', name: 'Old Death', author: 'Karl May' },
  { uid: '1c', name: 'Old Firehand', author: 'Karl May' },
  { uid: '1d', name: 'Winnetou', author: 'Karl May' },
  { uid: '1e', name: 'The Last of the Mohicans', author: 'James Fenimore Cooper' },
];
