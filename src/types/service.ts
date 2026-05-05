interface OilService {
  id: number;
  src: string;
  big_src: string;
  title: string;
  text: string;
}

interface ServiceData {
  src: string;
  big_src: string;
  title: string;
  text: string;
}

export type { OilService, ServiceData };
