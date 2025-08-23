import React from 'react';
import { assets } from '../../assets/assets';

const CommentTableItem = ({ comment }) => {
  const { blog, createdAt, _id, name, content, isApproved } = comment;
  const BlogDate = new Date(createdAt);

  return (
    <tr className="border-y border-gray-300">
      {/* Blog + Name + Comment */}
      <td className="px-6 py-4 min-w-[220px] text-sm sm:text-base whitespace-normal break-words">
        <div className="mb-2">
          <b className="font-medium text-gray-600">Blog:</b>{' '}
          <span className="block text-gray-800">{blog?.title}</span>
        </div>

        <div className="mb-2">
          <b className="font-medium text-gray-600">Name:</b>{' '}
          <span className="block text-gray-800">{name}</span>
        </div>

        <div>
          <b className="font-medium text-gray-600">Comment:</b>{' '}
          <span className="block text-gray-800">{content}</span>
        </div>
      </td>

      {/* Date */}
      <td className="px-6 py-4 max-sm:hidden text-sm text-gray-700">
        {BlogDate.toLocaleDateString()}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {!isApproved ? (
            <img
              src={assets.tick_icon}
              alt="approve"
              className="w-5 hover:scale-110 transition-all cursor-pointer"
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}

          <img
            src={assets.bin_icon}
            alt="delete"
            className="w-5 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
