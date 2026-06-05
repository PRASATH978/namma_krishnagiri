
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Issues() {
  const [issues, setIssues] = useState([]);
  const [comments, setComments] = useState({});
  const [openComments, setOpenComments] = useState({});

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/issues/"
      );

      setIssues(response.data);
    } catch (error) {
      console.log(error);
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

      if (
        !commentData?.name ||
        !commentData?.comment
      ) {
        alert("Please fill all fields");
        return;
      }

      await axios.post(
        "http://127.0.0.1:8000/api/comment/",
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
        `http://127.0.0.1:8000/api/vote/${id}/`
      );

      loadIssues();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-2xl mx-auto py-8 px-4">

        <h1 className="text-3xl font-bold text-center mb-8 text-green-700">
          Namma Krishnagiri Feed
        </h1>

        {issues.map((issue) => (
          <div
            key={issue.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
          >
            {/* Header */}
            <div className="flex items-center p-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 flex items-center justify-center text-white font-bold text-lg">
                {issue.name?.charAt(0)?.toUpperCase()}
              </div>

              <div className="ml-3">
                <h3 className="font-semibold text-lg">
                  {issue.name}
                </h3>

                <p className="text-sm text-gray-500">
                  📍 {issue.village}
                </p>
              </div>
            </div>

            {/* Image */}
            {issue.image && (
              <img
                src={`http://127.0.0.1:8000${issue.image}`}
                alt="Issue"
                className="w-full h-[500px] object-cover"
              />
            )}

            {/* Content */}
            <div className="p-4">

              {/* Like Button */}
              <div className="flex items-center gap-3 mb-3">

                <button
                  onClick={() => voteIssue(issue.id)}
                  className="text-3xl hover:scale-125 transition duration-200"
                >
                  ❤️
                </button>

                <span className="font-semibold">
                  {issue.votes} Supports
                </span>

              </div>

              {/* Category */}
              <h2 className="font-bold text-xl mb-2">
                #{issue.category}
              </h2>

              {/* Problem */}
              <p className="text-gray-700 mb-2">
                <span className="font-bold">
                  Problem:
                </span>{" "}
                {issue.problem}
              </p>

              {/* Solution */}
              {issue.solution && (
                <p className="text-green-700 mb-3">
                  <span className="font-bold">
                    Suggested Solution:
                  </span>{" "}
                  {issue.solution}
                </p>
              )}


              {/* Comments Section */}
              <div className="border-t pt-4">
                <button
                  type="button"
                  onClick={() => toggleComments(issue.id)}
                  className="text-blue-600 font-semibold mb-3 hover:text-blue-800"
                >
                  {openComments[issue.id] ? "Hide comments" : "Show comments"}
                </button>

                {openComments[issue.id] && (
                  <>
                    <div className="space-y-2 mb-4">
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
                        className="w-full border rounded-full px-4 py-2"
                      />

                      <div className="flex gap-2">
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
                          className="flex-1 border rounded-full px-4 py-2"
                        />

                        <button
                          type="button"
                          onClick={() => addComment(issue.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-5 rounded-full"
                        >
                          Post
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {issue.comments?.length > 0 ? (
                        issue.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="bg-gray-100 rounded-xl p-3"
                          >
                            <p className="font-semibold text-sm">
                              👤 {comment.name}
                            </p>

                            <p className="text-gray-700">
                              {comment.comment}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400">
                          No comments yet
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Issues;