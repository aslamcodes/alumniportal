import { useAuthContext } from "context/auth/authContext";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import { useGetEventRequests } from "hooks/useGetEventRequests";
import React from "react";

const EventRequestPanel = () => {
  const { user } = useAuthContext();
  const { requests, isLoading, error } = useGetEventRequests();
  const { fetchData: approveAlumni } = useAxiosWithCallback();

  const approveHandler = async (requestId) => {
    const config = {
      url: `/api/v1/events/approve/${requestId}`,
      method: "patch",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    await approveAlumni(config);
  };

  return (
    <div>
      {requests?.map((request) => (
        <div>
          <p>{request.eventName}</p>
          <p>{request.startDate}</p>
          <p>
            Approval Status{" "}
            {request.isApproved ? "✅ Approved" : "🚫 Not Approved"}
          </p>
          {!request.isApproved && (
            <button
              onClick={() => {
                approveHandler(request._id);
              }}
            >
              Approve
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default EventRequestPanel;
