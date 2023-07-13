import { useCallback, useState } from "react";

const LandingPage = () => {
  const [signInButtonClicked, setSignInButtonClicked] = useState(false);
  const [signUpButtonClicked, setSignUpButtonClicked] = useState(false);

  const handleSignInButton = useCallback(() => {
    console.log("signInButton clicked");
    setSignInButtonClicked(!signInButtonClicked);
  }, [signInButtonClicked]);

  const handleSignUpButton = useCallback(() => {
    console.log("signUpButton clicked");
    setSignUpButtonClicked(!signUpButtonClicked);
  }, [signUpButtonClicked]);

  return (
    <div className="lPContainer">
      <div className="getStartedCard">
        <div className="cardBanner">
          <h2>Get Started</h2>
        </div>
        <button className="signInButton" onClick={handleSignInButton}>
          Sign In
        </button>
        <button className="signUpButton" onClick={handleSignUpButton}>
          Sign Up
        </button>
      </div>
      <div className="helloWorldCard">
        <div className="cardBanner2">
          <h2>Hello World</h2>
        </div>
        <p>
          Welcome to Flash Card, a quick and easy way to create and save notes.
          New to the website? Get started with the sign-up button for a quick
          account creation that will grant you access to your own personal
          repository.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
