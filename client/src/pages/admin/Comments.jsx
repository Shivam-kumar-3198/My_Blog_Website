import React, { useEffect, useState } from 'react';
import { comments_data } from '../../assets/assets';
import CommentTableItem from '../../components/admin/CommentTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('Not Approved');

  const {axios} = useAppContext();

  

  const fetchComments = async () => {
    try {
      const { data } = await axios.get('api/admin/comments')
      data.success ? setComments(data.comments) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="min-h-screen w-full bg-blue-50/50 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-5 sm:px-16 pt-5 sm:pt-12">
        <h1 className="text-xl font-semibold">Comments</h1>

        <div className="flex gap-4">
          <button
            onClick={() => setFilter('Approved')}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === 'Approved' ? 'text-primary font-medium' : 'text-gray-700'
            }`}
          >
            Approved
          </button>

          <button
            onClick={() => setFilter('Not Approved')}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === 'Not Approved' ? 'text-primary font-medium' : 'text-gray-700'
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 px-5 sm:px-16 mt-5">
        <div className="relative w-full overflow-x-auto bg-white shadow rounded-lg scrollbar-hide">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-sm text-gray-600 border-b">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  Blog title & comment
                </th>
                <th scope="col" className="px-6 py-3 max-sm:hidden text-left">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 max-sm:hidden text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {comments
                .filter((comment) => {
                  if (filter === 'Approved') return comment.isApproved === true;
                  return comment.isApproved === false;
                })
                .map((comment, index) => (
                  <CommentTableItem
                    key={comment._id}
                    comment={comment}
                    index={index + 1}
                    fetchComments={fetchComments}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Comments;
