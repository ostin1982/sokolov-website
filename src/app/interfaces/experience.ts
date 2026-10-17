export interface IExperience {
  heading: string | null;
  id: string;
  information: {
    time: string | null;
    company: string | null;
    position: string | null;
    stacks: { stack: string | null }[];
  }[];
}
