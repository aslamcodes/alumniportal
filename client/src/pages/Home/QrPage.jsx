import React, { useEffect, useState } from "react";
import ProfileModal from "components/ForumComponents/ProfileModal";

import { useSearchParams } from "react-router-dom";
function QrPage() {
  const [profileActive, setProfileActive] = useState(true);
  const [userId, setUserId] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const userIdFromQuery = searchParams.get("user");
    if (userIdFromQuery) {
      setUserId(userIdFromQuery);
      searchParams.delete("user");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);
  return (
    profileActive && (
      <ProfileModal
        userId={userId}
        handleClose={() => setProfileActive(false)}
      />
    )
  );
}

export default QrPage;
