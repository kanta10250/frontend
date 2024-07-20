import { ReactNode } from 'react';

type Props = {
  image: ReactNode;
  title: string;
  content: string;
};

export default function Card(props: Props) {
  return (
    <div className="h-full w-full p-5">
      <div className="rounded-xl bg-white">
        <div className="flex h-fit w-full justify-center">{props.image}</div>
        <div className="flex w-full flex-col items-center justify-center pt-5">
          <h3 className="text-center text-lg font-bold text-gray-800">
            {props.title}
          </h3>
          <p className="mt-1 text-center text-gray-500">{props.content}</p>
        </div>
      </div>
    </div>
  );
}
