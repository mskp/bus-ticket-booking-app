export default function FeedbackCard({ name, img }) {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-2">
      <div className="flex flex-col items-center">
        <img
          className="w-24 mb-3 rounded-full shadow-lg"
          src={img}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400 text-justify">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          eaque nihil asperiores commodi iure consequatur facere ab nulla
          quaerat necessitatibus?
        </span>
      </div>
    </div>
  );
}
