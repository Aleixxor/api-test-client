import { ArrowPathIcon } from "@heroicons/react/24/outline";

interface ITestButton {
  isLoading: boolean;
  onClick: () => void;
}

export default function TestButton({ isLoading, onClick }: ITestButton) {
  return (
    <button
      disabled={isLoading}
      className="rounded p-2 px-4 text-white bg-slate-600 flex gap-1 place-items-center disabled:bg-slate-400"
      onClick={onClick}
    >
      Run
      <ArrowPathIcon
        className={`${isLoading && "animate-spin"} w-5`}
      ></ArrowPathIcon>
    </button>
  );
}
