export default function BookingDetailCard({
  source,
  destination,
  time,
  passangerName,
}) {
  return (
    <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-left">
      <p className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white whitespace">
        Passanger: <span className="text-green-500">{[passangerName]}</span>
      </p>
      <p className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
        SRC: <span className="text-green-500">{source}</span>
      </p>
      <p className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
        DEST: <span className="text-green-500">{destination}</span>
      </p>
      <p className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
        TIME:{" "}
        <span className="text-green-500">
          {new Date(time).toLocaleString()}
        </span>
      </p>
    </div>
  );
}
