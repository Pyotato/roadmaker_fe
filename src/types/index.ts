export interface PageParams {
  params?: { id?: string };
  searchParams?: { [key: string]: string | undefined };
}

export interface DataWithPages {
  totalPage: number;
  next: string;
  previous: null;
}
