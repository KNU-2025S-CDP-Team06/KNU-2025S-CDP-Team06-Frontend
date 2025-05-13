const Skeleton = ({ height = 10 }: { height?: number }) => (
  <div
    style={{ height: `${height / 16}rem` }}
    className="w-full rounded-md bg-neutral-200 animate-pulse"
  ></div>
);
export default Skeleton;
