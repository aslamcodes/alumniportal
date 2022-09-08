import Loader from "components/UI/Loader";
import { useAuthContext } from "context/auth/authContext";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import { useGetPostRequests } from "hooks/useGetNewPostRequests";
import React, { useState } from "react";
import AdminTableHeader from "./AdminTableHeader";
import PostRequestTableRow from "./PostRequestTableRow";
import styles from './PostRequestTable.module.css'
import NoDataMessage from "./NoDataMessage";
import AdminTablePagination from "./AdminTablePagination";

const PostRequestTable = () => {
  const { isLoading, error, postRequests } = useGetPostRequests();
  const {
    fetchData: approveRequest,
    isLoading: isApprovalLoading,
    error: approvalError,
  } = useAxiosWithCallback();
  const { user } = useAuthContext();
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = postRequests ? Math.ceil(postRequests.length / entriesPerPage) : 0;

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
  const OnIncreaseHandler = () => {
    if (currentPage > totalPages - 1) return null;
    setCurrentPage(currentPage + 1);
  };

  const onDecreaseHandler = () => {
    if (currentPage < 2) return null;
    setCurrentPage(currentPage - 1);
  };

  const onEntriesPerPageSelectHandler = (value) => {
    setEntriesPerPage(value);
  };

  if (isLoading) return <Loader />;

  return (
    <div className={styles.post_request_container}>
      <AdminTableHeader
        onSelect={onEntriesPerPageSelectHandler}
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
        {postRequests && postRequests.length > 0 ?
          <tbody>
            {postRequests?.slice(
              currentPage * entriesPerPage - entriesPerPage,
              currentPage * entriesPerPage
            ).map((request, index) => {
              return (
                <PostRequestTableRow
                  data={request} key={index} onApproveHandler={onApproveHandler}
                />
              )
            }
            )}
          </tbody> :
          <NoDataMessage />
        }
      </table>
      <AdminTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onIncrease={OnIncreaseHandler}
        onDecrease={onDecreaseHandler}
      />
    </div>
  );
};

export default PostRequestTable;
