import React from "react";

const roomDetailsPage = async ({ params }) => {
  const { id } = await params;

  return (
    <div>
      <p>Room Details: {id}</p>
    </div>
  );
};

export default roomDetailsPage;
