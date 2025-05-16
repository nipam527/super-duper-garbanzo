import React from 'react';

const TestCard = ({ name, feedback }) => {
  return (
    <div className="bg-black/80 backdrop-blur-md text-white p-6 rounded-lg mb-6 max-w-md mx-auto" style={{ boxShadow: '0 4px 20px rgba(255, 0, 0, 0.2)' }}>
      <h3 className="text-xl font-semibold text-red-500" style={{ textShadow: '0 0 10px rgba(255, 0, 0, 0.5)' }}>{name}</h3>
      <p className="text-gray-300 mt-2">{feedback}</p>
    </div>
  );
};

export default TestCard;
