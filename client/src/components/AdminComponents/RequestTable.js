import React, { useEffect, useMemo, useRef, useState } from "react";
import AdminTableHeader from "./AdminTableHeader";
import AdminTablePagination from "./AdminTablePagination";
import Styles from "./AdminTable.module.css";
import AdminTableRow from "./AdminTableRow";
import { a, useSpring } from "react-spring";
import useGetNewApplications from "hooks/useGetNewAlumniApplications";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import { useAuthContext } from "context/auth/authContext";
import Loader from "components/UI/Loader";
import { useAlertContext } from "context/alert/alertContext";
import NoDataMessage from "./NoDataMessage";
import { filterAlumniData, getAlumniFilters } from "utils/utils";
import ReasonOverlay from "components/UI/ReasonOverlay";
import ErrorDialogue from "components/UI/ErrorDialogue";

const RequestTable = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [tableHeadOnTop] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reasonActive, setReasonActive] = useState(false);
  const [reason, setReason] = useState("");
  const tableHeadRef = useRef(null);

  const props = useSpring({
    from: {
      backgroundColor: "#e2e2e2",
    },
    to: {
      backgroundColor: tableHeadOnTop ? "#bddcf3" : "#e2e2e2",
    },
  });

  const { user } = useAuthContext();
  const { applications, isLoading, error, trigger } = useGetNewApplications();
  const { fetchData: approveAlumni } = useAxiosWithCallback();
  const { fetchData: rejectAlumni } = useAxiosWithCallback();
  const totalPages = Math.ceil(applications?.length / entriesPerPage);


  const [applicationsFiltered, setApplicationsFiltered] = useState([]);
  const [alumni, setAlumni] = useState();

  const filters = useMemo(() => getAlumniFilters(applications), [applications]);

  const onApplyFilter = (filters) => {
    setApplicationsFiltered(filterAlumniData(applications, filters));
  };

  const onSearch = (query) => {
    setApplicationsFiltered(
      applicationsFiltered.filter((alumnus) =>
        (alumnus.user.registerNumber + " " + alumnus.user.name)
          .toLowerCase()
          .includes(query)
      )
    );
  };

  useEffect(() => {
    setApplicationsFiltered(applications);
  }, [applications]);



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

  const adminConfig = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  const onApproveAlumni = async (alumni) => {
    await approveAlumni(
      {
        ...adminConfig,
        method: "patch",
        url: `/api/v1/alumni/approve/${alumni}`,
      },
      (res) => {
        trigger();
      }
    );
  };

  const onRejectAlumni = async (alumni) => {
    setReasonActive(true);
    setAlumni(alumni);
  };

  const onRejectHandler = async () => {
    if (reason !== "") {
      await rejectAlumni(
        {
          ...adminConfig,
          method: "patch",
          url: `/api/v1/alumni/reject/${alumni}`,
          data: {
            reason,
          },
        },
        (res) => {
          trigger();
        }
      );
      setReason("");
    }
    setReasonActive(false);
    setAlumni(null);
  };

  const dataHeaders = [
    { label: "Register Number", key: "user.registerNumber" },
    { label: "Name", key: "user.name" },
    { label: "Department", key: "user.department" },
    { label: "Designation", key: "alumni_data.designation" },
    { label: "Company", key: "alumni_data.organization" },
    { label: "Phone Number", key: "user.phoneNumber" },
    { label: "Email", key: "user.email" },
    { label: "City", key: "user.city" },
    { label: "State", key: "user.state" },
    { label: "Country", key: "user.country" },
    { label: "Graduation Level", key: "user.graduationLevel" },
    { label: "PG College Name", key: "secondaryCollegeName" },
    { label: "Course Name", key: "courseName" },
    { label: "Skills", key: "user.skill" },
  ];

  if (error) return <ErrorDialogue errorMessage={error.message} />;

  return (
    <div>
      {reasonActive && (
        <ReasonOverlay
          reason={reason}
          setReason={setReason}
          setIsShowReject={setReasonActive}
          onRejectHandler={onRejectHandler}
        />
      )}
      <AdminTableHeader
        filters={filters}
        onApplyFilter={onApplyFilter}
        onSearch={onSearch}
        data={applications}
        headers={dataHeaders}
        filename="Alumni requests"
        onSelect={onEntriesPerPageSelectHandler}
        type="New Applications"
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <table className={Styles.table}>
            <a.thead style={props} ref={tableHeadRef}>
              <tr className={Styles.table_row}>
                <th>Regno</th>
                <th>Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Company</th>
                <th>Contact</th>
                <th>Email</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Graduation</th>
                <th>PG College Name</th>
                <th>Course Name</th>
                <th>Skills/Domain</th>
                <div className={Styles.fixed_col}>
                  <th>Actions</th>
                </div>
              </tr>
            </a.thead>

            {applicationsFiltered && applicationsFiltered.length > 0 ? (
              <tbody>
                {applicationsFiltered
                  ?.slice(
                    currentPage * entriesPerPage - entriesPerPage,
                    currentPage * entriesPerPage
                  )
                  .filter((application) => !application.rejected)
                  .map((alumni) => (
                    <AdminTableRow
                      alumni={alumni}
                      type="request-details"
                      approveAlumniHandler={onApproveAlumni}
                      rejectAlumni={onRejectAlumni}
                    />
                  ))}
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
        </>
      )}
    </div>
  );
};

export default RequestTable;
