import { IHeading } from '@/app/interfaces/index';

export default function Heading({ heading }: IHeading) {
  return <h2 className="text-h2">{heading}</h2>;
}
