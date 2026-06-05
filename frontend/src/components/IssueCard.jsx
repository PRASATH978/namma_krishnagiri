export default function IssueCard({ issue }) {
  return (
    <div className="bg-white shadow rounded-xl p-5 mb-5">

      <h2 className="text-xl font-bold">
        {issue.category}
      </h2>

      <p className="mt-3">
        {issue.problem}
      </p>

      <p className="text-gray-500 mt-2">
        📍 {issue.village}
      </p>

      <div className="flex gap-4 mt-4">

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          👍 {issue.votes}
        </button>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          💬 Comments
        </button>

      </div>
    </div>
  );
}