import Loader from "components/UI/Loader";
import { useAuthContext } from "context/auth/authContext";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import { useGetPostRequests } from "hooks/useGetNewPostRequests";
import React from "react";

const PostRequestTable = () => {
  const { isLoading, error, postRequests } = useGetPostRequests();
  const {
    fetchData: approveRequest,
    isLoading: isApprovalLoading,
    error: approvalError,
  } = useAxiosWithCallback();
  const { user } = useAuthContext();

  const onApproveHandler = async (requestId) => {
    const approvalConfig = {
      url: `/api/v1/forum/approve-post/${requestId}`,
      method: "patch",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    await approveRequest(approvalConfig);
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      {postRequests.map((request, index) => (
        <>
          <p>{index + 1}</p>
          <p>{request.postData.post.title}</p>
          <p>{request.postData.post.desc}</p>
          <p>
            Approval Status{" "}
            <strong>
              {request.postData.isApproved
                ? `Approved by ${request.approvedBy.name}`
                : "Not Yet Approved"}
            </strong>
          </p>
          <p>
            Created by <strong>{request.user.name}</strong> Register Number{" "}
            <strong>{request.user.registerNumber}</strong>
          </p>
          {!request.postData.isApproved && (
            <button
              onClick={() => {
                onApproveHandler(request._id);
              }}
            >
              Approve
            </button>
          )}
        </>
      ))}
    </div>
  );
};

export default PostRequestTable;
