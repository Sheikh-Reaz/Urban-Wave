import React from 'react';

const ReviewCard = ({ review }) => {
    const { userName, ratings, review: comment, user_photoURL, date } = review;

    return (
        <div className="card w-72 bg-white shadow-xl rounded-2xl p-6 flex flex-col justify-between">
            {/* Header: Avatar and Name */}
            <div className="flex items-center gap-4 mb-4">
                <div className="avatar">
                    <div className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user_photoURL} alt={userName} />
                    </div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-gray-900">{userName}</h4>
                    <p className="text-yellow-500 font-medium">{ratings} ⭐</p>
                </div>
            </div>

            {/* Review Text */}
            <p className="text-gray-700 text-sm mb-4 flex-grow">{comment}</p>

            {/* Date */}
            <p className="text-gray-400 text-xs text-right">{new Date(date).toLocaleDateString()}</p>
        </div>
    );
};

export default ReviewCard;
