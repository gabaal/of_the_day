export default function Skeleton({ width = "w-full", height = "h-6" }) {
  return (
    <div
      className={`bg-gray-700 ${width} ${height} animate-pulse rounded`}
    ></div>
  );
}
