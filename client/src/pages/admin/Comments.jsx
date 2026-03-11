import React, { useEffect, useState } from 'react';
import { comments_data } from '../../assets/assets';
import CommentTableItem from '../../components/admin/CommentTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('Not Approved');

  const { axios } = useAppContext();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get('api/admin/comments');
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Pre-filter comments to handle empty states cleanly
  const filteredComments = comments.filter((comment) => {
    if (filter === 'Approved') return comment.isApproved === true;
    return comment.isApproved === false;
  });

  return (
    <div className="flex-1 w-full min-h-screen p-4 sm:p-6 md:p-10 bg-blue-50/50 box-border overflow-hidden flex flex-col">
      
      {/* Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          Comments
        </h1>

        <div className="flex items-center gap-2 sm:gap-4 bg-white p-1 rounded-full shadow-sm border border-gray-100 self-start sm:self-auto">
          <button
            onClick={() => setFilter('Approved')}
            className={`rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
              filter === 'Approved'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Approved
          </button>

          <button
            onClick={() => setFilter('Not Approved')}
            className={`rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
              filter === 'Not Approved'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto bg-white shadow-sm border border-gray-100 rounded-xl scrollbar-hide flex-1">
        {filteredComments.length === 0 ? (
          <div className="flex items-center justify-center h-40 text-gray-500 font-medium">
            No {filter.toLowerCase()} comments found.
          </div>
        ) : (
          <table className="w-full text-sm text-left text-gray-600 min-w-[600px] whitespace-nowrap">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th scope="col" className="px-4 py-4 md:px-6 font-semibold w-1/2">
                  Blog Title & Comment
                </th>
                <th scope="col" className="px-4 py-4 md:px-6 font-semibold">
                  Date
                </th>
                <th scope="col" className="px-4 py-4 md:px-6 font-semibold text-center w-32">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredComments.map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
      
    </div>
  );
};

export default Comments;