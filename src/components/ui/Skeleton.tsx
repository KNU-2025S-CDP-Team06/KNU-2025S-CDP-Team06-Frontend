const Skeleton = ({ height = 10 }: { height?: number }) => (
  <div
    style={{ height: `${height / 4}rem` }}
    className="rounded-md bg-neutral-300 animate-pulse"
  ></div>
);
export default Skeleton;
