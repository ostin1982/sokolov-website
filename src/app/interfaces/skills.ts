export interface ISkills {
  heading: string | null;
  id: string;
  information: {
    title: string | null;
    description: string | null;
    stacks: { stack: string | null }[];
  }[];
}
