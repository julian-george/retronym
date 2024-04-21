import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setAccessCode } from "../requests";
import { isNull } from "lodash";
import Modal from "../components/Modal";

/**
 * oauth pages redirect here, with stuff in the params.
 * forward the params to the backend
 */
function OAuthRedirectPage() {
  const navigate = useNavigate();
  const [searchParams, _setSearchParams] = useSearchParams();

  const [errorRedirect, setErrorRedirect] = useState<string | null>(null);

  useEffect(() => {
    const data: { [key: string]: string } = {};
    Array.from(searchParams.entries()).forEach((entry) => {
      data[entry[0]] = entry[1];
    });

    // reconstruct state
    const stateObject = JSON.parse(data.state);

    setAccessCode({ ...data, ...stateObject }).then(({ success, message }) => {
      // if setaccesscode fails, set error (which will be shown in a modal)
      if (!success) {
        setErrorRedirect(stateObject.redirect);
        return;
      }

      // otherwise just go back
      navigate(`/${stateObject.redirect.toLowerCase()}`);
    });
  }, [searchParams, navigate]);

  return (
    <Modal
      isOpen={!isNull(errorRedirect)}
      closeModal={() => navigate(`/${errorRedirect?.toLowerCase()}`)}
    >
      Could not connect. Please try again
    </Modal>
  );
}

export default OAuthRedirectPage;
