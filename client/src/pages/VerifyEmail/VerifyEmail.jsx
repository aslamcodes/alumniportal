import ErrorDialogue from "components/UI/ErrorDialogue";
import Spinner from "components/UI/Spinner";
import { useAuthContext } from "context/auth/authContext";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./VerifyEmail.module.css";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchData, isLoading, error } = useAxiosWithCallback();
  const { user } = useAuthContext();
  useEffect(() => {
    const tokenFromQuery = searchParams.get("token");

    if (tokenFromQuery) {
      setToken(tokenFromQuery);
      searchParams.delete("token");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const config = {
      url: "/api/v1/users/verify-email",
      method: "patch",
      data: {
        token,
        userId: user?._id,
      },
    };
    user && fetchData(config, () => {});
  }, [fetchData, token, user]);

  if (isLoading)
    return (
      <div className={styles.container}>
        <Spinner />
      </div>
    );

  if (error)
    return (
      <div className={styles.container}>
        <ErrorDialogue errorMessage={error.response.data.message} />
      </div>
    );

  return (
    <div className={styles.container}>
      Your Email has been successfully verified
    </div>
  );
};

export default VerifyEmail;
