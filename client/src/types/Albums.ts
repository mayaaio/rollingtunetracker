export interface Album {
  _id?: string;
  listened?: boolean;
  title?: string;
  notes?: string;
  rating?: number;
  img?: string;
  artists?: string[];
}
