import Loader from "components/UI/Loader";
import { useAuthContext } from "context/auth/authContext";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import { useGetPostRequests } from "hooks/useGetNewPostRequests";
import React, { useState } from "react";
import AdminTableHeader from "./AdminTableHeader";
import PostRequestTableRow from "./PostRequestTableRow";
import styles from './PostRequestTable.module.css'

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
    <div className={styles.post_request_container}>
      <AdminTableHeader
        type="Post Requests"

      />

      <table id={styles.post_table}>
        <thead>
          <tr>
            <th>Regno</th>
            <th>Name</th>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postRequests.map((request, index) => {
            return (

              <PostRequestTableRow
                data={request} key={index} onApproveHandler={onApproveHandler}
              />


            )
          }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PostRequestTable;
