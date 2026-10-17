import { IStack } from 'app/interfaces';

export default function Stack({ stack }: IStack) {
  return (
    <div className="py-0.5 px-3 bg-white-20 border border-white-40">
      <span className="text-base">{stack}</span>
    </div>
  );
}
