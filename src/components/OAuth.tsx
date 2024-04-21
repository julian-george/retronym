import React, { useCallback, useEffect, useState } from "react";
import { camelCase, isNull, isUndefined } from "lodash";
import { Sites } from "../types";
import { useUser } from "../context/userContext";
import { getAccessCodes } from "../requests";

const REDIRECT_URI = process.env.URL + "/oauth"; // link to OAuthRedirectPage

// separate function to ensure it's the same for all sites
const getState = (site: string, userId: string, redirect: string) => {
  const secret = process.env[`${site.toUpperCase()}_SECRET`];
  return JSON.stringify({ redirect, site, userId, secret });
};

const getURL = (site: Sites, userId: string, redirect: string) => {
  switch (site) {
    case Sites.twitter:
      return (
        "https://twitter.com/i/oauth2/authorize?response_type=code&code_challenge=challenge&code_challenge_method=plain" +
        ("&client_id=" + process.env.TWITTER_CLIENT_ID) +
        ("&state=" + getState(redirect, site, userId)) +
        ("&redirect_uri=" + REDIRECT_URI) +
        ("&scope=" +
          encodeURI("tweet.read users.read follows.read follows.write")) // TODO customize scopes
      );
    case Sites.reddit:
      return (
        "https://www.reddit.com/api/v1/authorize?response_type=code&duration=permanent" +
        ("&client_id=" + process.env.REDDIT_CLIENT_ID) +
        ("&state=" + getState(redirect, site, userId)) +
        ("&redirect_uri=" + REDIRECT_URI) +
        ("&scope=" + encodeURI("scopes here"))
      );
    case Sites.youtube:
      return (
        "https://accounts.google.com/o/oauth2/v2/auth?response_type=code" +
        ("&client_id=" + process.env.YOUTUBE_CLIENT_ID) +
        ("&state=" + getState(redirect, site, userId)) +
        ("&redirect_uri=" + REDIRECT_URI) +
        ("&scope=" + encodeURI("scopes here"))
      );
  }
};

interface OAuthBoxProps {
  site: Sites | string;
  parent?: string; // this is so OAuthRedirectPage knows where to redirect after oath is complete
  disabled?: boolean;
  implemented?: boolean;
}

const OAuthBox: React.FC<OAuthBoxProps> = ({
  site,
  parent,
  disabled = true,
  implemented = true,
}) => {
  const user = useUser().user;

  // redirect user to the oauth page
  const redirectUser = useCallback(() => {
    if (isNull(user)) return;
    if (isUndefined(parent)) return;

    window.location.href = getURL(site as Sites, user?.id, parent);
  }, [user, site]);

  return (
    <div
      className={disabled ? "bg-gray" : `bg-${site.toLowerCase()}-color`}
      onClick={redirectUser}
    >
      {implemented
        ? disabled
          ? `${camelCase(site)} connected`
          : `Connect to ${camelCase(site)}`
        : `${camelCase(site)} coming soon`}
    </div>
  );
};

const OAuth: React.FC<{ parent: string }> = ({ parent }) => {
  const [codes, setCodes] = useState<Record<string, boolean>>({});

  // get code information
  useEffect(() => {
    getAccessCodes().then((data) => {
      setCodes(data);
    });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      {Object.keys(Sites).map((site) => (
        <OAuthBox
          key={site}
          site={site}
          parent={parent}
          disabled={codes[site]}
        />
      ))}

      {/* coming soon :) */}
      <OAuthBox site="instagram" implemented={false} />
      <OAuthBox site="tiktok" implemented={false} />
    </div>
  );
};

export default OAuth;
