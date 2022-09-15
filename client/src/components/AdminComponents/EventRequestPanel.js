import ReasonOverlay from "components/UI/ReasonOverlay";
import { useAuthContext } from "context/auth/authContext";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import { useGetEventRequests } from "hooks/useGetEventRequests";
import React, { useState } from "react";
import AdminTableHeader from "./AdminTableHeader";
import AdminTablePagination from "./AdminTablePagination";
import styles from "./EventRequestPanel.module.css";
import EventRequestRow from "./EventRequestRow";
import NoDataMessage from "./NoDataMessage";

const EventRequestPanel = () => {
  const { user } = useAuthContext();
  const { requests, isLoading, error } = useGetEventRequests();
  const { fetchData: eventAction } = useAxiosWithCallback();
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [reasonActive, setReasonActive] = useState(false);
  const [reason, setReason] = useState("");
  const totalPages = requests ? Math.ceil(requests.length / entriesPerPage) : 0;

  const approveHandler = async (requestId) => {
    const config = {
      url: `/api/v1/events/approve/${requestId}`,
      method: "patch",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    await eventAction(config);
  };

  const rejectHandler = async (requestId) => {
    setReasonActive(true);

    if (reason !== "") {
      const rejectionConfig = {
        url: `/api/v1/events/reject/${requestId}`,
        method: "patch",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        data: {
          reason
        },
      };
      await eventAction(rejectionConfig);
    }

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

  return (
    <div className={styles.event_request_container}>
      {reasonActive &&
        <ReasonOverlay reason={reason} setReason={setReason} setIsShowReject={setReasonActive} />
      }
      <AdminTableHeader
        onSelect={onEntriesPerPageSelectHandler}
        type="Event Requests"
      />

      <table id={styles.event_table}>
        <thead>
          <tr>
            <th>Regno</th>
            <th>Name</th>
            <th>Title</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        {requests && requests.length > 0 ? (
          <tbody>
            {requests
              ?.slice(
                currentPage * entriesPerPage - entriesPerPage,
                currentPage * entriesPerPage
              )
              .map((request, index) => {
                return (
                  <EventRequestRow
                    data={request}
                    key={index}
                    onApproveHandler={approveHandler}
                    onRejectHandler={rejectHandler}
                  />
                );
              })}
          </tbody>
        ) : (
          <NoDataMessage />
        )}
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

export default EventRequestPanel;
