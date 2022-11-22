import React from "react";
import { Link } from "react-router-dom";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { toggleFalse } from "../../features/user/hasAccountSlice";
import { selectSignIn } from "../../features/user/formSelectorSlice";

function SignIn() {
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className="connectModalTitle">Welcome back.</h1>

      {/* Sign In options */}
      <div className="connectModalOptionsContainer">
        <button
          className="connectModalOptionsButton"
          onClick={() => dispatch(selectSignIn())}
        >
          <EnvelopeIcon className="connectModalOptionsButtonIcon" />{" "}
          <p>Sign in with email</p>
        </button>

        <div className="createOrSignInContainer">
          <p>
            No account?{" "}
            <span className="createOrSignInSpan">
              <button onClick={() => dispatch(toggleFalse())}>
                Create one
              </button>
            </span>
          </p>
        </div>
      </div>

      <div className="my-7">
        <p className="font-light text-[13px]">
          Forgot email or trouble signing in?{" "}
          <span>
            <Link className="underline">Get help</Link>
          </span>
        </p>
      </div>

      <div className="termsAndPolicyContainer">
        <p className="termsAndPolicyPTag">
          Click "Sign in" to agrees to Blog's{" "}
          <span>
            <Link className="termsAndPolicyLink">Terms of Service</Link>
          </span>{" "}
          and acknowledge that Blog's{" "}
          <span>
            <Link className="termsAndPolicyLink">Privacy Policy</Link>
          </span>{" "}
          applies to you
        </p>
      </div>
    </div>
  );
}

export default SignIn;
