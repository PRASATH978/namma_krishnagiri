import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Issues() {
  const [issues, setIssues] = useState([]);
  const [comments, setComments] = useState({});
  const [openComments, setOpenComments] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "https://namma-krishnagiri.onrender.com/api/issues/"
      );

      setIssues(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentChange = (issueId, field, value) => {
    setComments({
      ...comments,
      [issueId]: {
        ...comments[issueId],
        [field]: value,
      },
    });
  };

  const toggleComments = (issueId) => {
    setOpenComments((prev) => ({
      ...prev,
      [issueId]: !prev[issueId],
    }));
  };

  const addComment = async (issueId) => {
    try {
      const commentData = comments[issueId];

      if (!commentData?.name || !commentData?.comment) {
        alert("Please fill all fields");
        return;
      }

      await axios.post(
        "https://namma-krishnagiri.onrender.com/api/comment/",
        {
          issue: issueId,
          name: commentData.name,
          comment: commentData.comment,
        }
      );

      alert("Comment Added Successfully");

      setComments({
        ...comments,
        [issueId]: {
          name: "",
          comment: "",
        },
      });

      loadIssues();
    } catch (error) {
      console.log(error);
      alert("Failed to add comment");
    }
  };

  const voteIssue = async (id) => {
    try {
      await axios.post(
        `https://namma-krishnagiri.onrender.com/api/vote/${id}/`
      );

      loadIssues();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto py-4 sm:py-8 px-3 sm:px-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-green-700">
          🌿 Namma Krishnagiri Feed
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-green-600"></div>
          </div>
        ) : (
          issues.map((issue) => (
            <div
              key={issue.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6 hover:shadow-2xl transition duration-300"
            >
              {/* Header */}
              <div className="flex items-center p-4 sm:p-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                  {issue.name?.charAt(0)?.toUpperCase()}
                </div>

                <div className="ml-3">
                  <h3 className="font-semibold text-base sm:text-lg">
                    {issue.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-500">
                    📍 {issue.village}
                  </p>
                </div>
              </div>

              {/* Image */}
              {issue.image && (
                <img
                  src={`https://namma-krishnagiri.onrender.com${issue.image}`}
                  alt="Issue"
                  className="w-full h-64 sm:h-80 md:h-[450px] object-cover"
                />
              )}

              {/* Content */}
              <div className="p-4 sm:p-5">
                {/* Vote Section */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => voteIssue(issue.id)}
                    className="flex items-center gap-2 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full transition"
                  >
                    <span className="text-2xl">❤️</span>
                    <span className="font-semibold">
                      {issue.votes}
                    </span>
                  </button>

                  <span className="text-sm text-gray-500">
                    {issue.comments?.length || 0} Comments
                  </span>
                </div>

                {/* Category */}
                <div className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold mb-3">
                  #{issue.category}
                </div>

                {/* Problem */}
                <div className="mb-3">
                  <p className="font-bold text-gray-800 mb-1">
                    Problem:
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    {issue.problem}
                  </p>
                </div>

                {/* Solution */}
                {issue.solution && (
                  <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-lg mb-4">
                    <p className="font-semibold text-green-700">
                      Suggested Solution
                    </p>

                    <p className="text-green-600">
                      {issue.solution}
                    </p>
                  </div>
                )}

                {/* Comments */}
                <div className="border-t pt-4">
                  <button
                    type="button"
                    onClick={() => toggleComments(issue.id)}
                    className="font-semibold text-blue-600 hover:text-blue-800 mb-4"
                  >
                    {openComments[issue.id]
                      ? "🔼 Hide Comments"
                      : "🔽 Show Comments"}
                  </button>

                  {openComments[issue.id] && (
                    <>
                      {/* Comment Form */}
                      <div className="space-y-3 mb-5">
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={comments[issue.id]?.name || ""}
                          onChange={(e) =>
                            handleCommentChange(
                              issue.id,
                              "name",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            placeholder="Add a comment..."
                            value={comments[issue.id]?.comment || ""}
                            onChange={(e) =>
                              handleCommentChange(
                                issue.id,
                                "comment",
                                e.target.value
                              )
                            }
                            className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                          />

                          <button
                            type="button"
                            onClick={() => addComment(issue.id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-full w-full sm:w-auto transition"
                          >
                            Post
                          </button>
                        </div>
                      </div>

                      {/* Comment List */}
                      <div className="space-y-3">
                        {issue.comments?.length > 0 ? (
                          issue.comments.map((comment) => (
                            <div
                              key={comment.id}
                              className="bg-gray-50 border rounded-2xl p-3"
                            >
                              <p className="font-semibold text-sm text-gray-800">
                                👤 {comment.name}
                              </p>

                              <p className="text-gray-700 mt-1">
                                {comment.comment}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-4 text-gray-400">
                            No comments yet
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Issues;