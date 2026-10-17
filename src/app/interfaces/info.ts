export interface IInfo {
  heading: string | null;
  id: string;
  image: {
    src: string;
    alt: string;
  };
  name: string | null;
  position: string | null;
  offers: string | null;
  information: {
    title: string | null;
  }[];
  contacts: {
    title: string | null;
    href: string | null;
    text?: string | null;
  }[];
}
