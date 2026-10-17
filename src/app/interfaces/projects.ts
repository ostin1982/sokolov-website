export interface IProjects {
  heading: string | null;
  id: string;
  information: {
    title: string | null;
    images: {
      src: string;
      alt: string;
    };
    stacks: { stack: string | null }[];
    link: string | null;
  }[];
}
