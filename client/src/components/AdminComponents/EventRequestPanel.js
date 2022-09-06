import { useAuthContext } from "context/auth/authContext";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import { useGetEventRequests } from "hooks/useGetEventRequests";
import React from "react";
import AdminTableHeader from "./AdminTableHeader";
import styles from "./EventRequestPanel.module.css";
import EventRequestRow from "./EventRequestRow";
import NoDataMessage from "./NoDataMessage";

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
    <div className={styles.event_request_container}>
      <AdminTableHeader
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
        {requests && requests.length > 0 ?
          <tbody>
            {requests?.map((request, index) => {
              return (
                <EventRequestRow
                  data={request} key={index} onApproveHandler={approveHandler}
                />
              )
            }
            )}
          </tbody>
          :
          <NoDataMessage />
        }
      </table>
    </div>

  );
};

export default EventRequestPanel;
