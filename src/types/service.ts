interface OilService {
  id: number;
  src: string;
  title: string;
  text: string;
}

interface ServiceData {
  src: string;
  title: string;
  text: string;
}

export type { OilService, ServiceData };
