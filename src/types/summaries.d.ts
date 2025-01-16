export interface Summary {
  id: string;
  title: string;
  subject: 'math' | 'physics' | 'info';
  level: 'seconde' | 'premiere' | 'terminale';
  file_url: string;
  created_at?: string;
}