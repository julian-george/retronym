import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { setToken } from "../requests";

/**
 * oauth pages redirect here, with stuff in the params.
 * forward the params to the backend
 */
function OAuthRedirectPage() {
  const [searchParams, _setSearchParams] = useSearchParams();

  useEffect(() => {
    const data: { [key: string]: string } = { code: "", state: "", error: "" };
    Array.from(searchParams.entries()).forEach((entry) => {
      data[entry[0]] = entry[1];
    });
    setToken(data);
  }, [searchParams]);

  return null;
}

export default OAuthRedirectPage;
