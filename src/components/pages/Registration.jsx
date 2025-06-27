import React, { use, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { reload, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { Helmet } from "react-helmet-async";

const Registration = () => {
  const { createUser, signInGoogle } = use(AuthContext);
  const [error, setError] = useState("");
  const [result, setResult] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const formData = new FormData(form);
    const { email, password, ...restData } = Object.fromEntries(
      formData.entries()
    );

    setError("");
    setResult(false);

    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (passwordRegEx.test(password) === false) {
      setError(
        "Must have atleast 6 characters, one lowercase letter and one uppercase letter"
      );
      return;
    }
    try {
      const result = await createUser(email, password);
      if (auth.currentUser) {
        await updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        });
        setResult(true);
        await reload(auth.currentUser); // ✅ reload updated user data
        navigate(location?.state || "/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignInGoogle = () => {
    signInGoogle()
      .then((result) => {
        setResult(true);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (result) {
      toast.success("Successfully Registerd");
    }
  }, [error, result]);

  return (
    <>
      <Helmet>
        <title>Registration | HobbyHub</title>
      </Helmet>
      <div className="flex justify-center items-center">
        <div className="card w-full max-w-sm shrink-0 shadow-2xl py-3 bg-base-200">
          <h2 className="font-semibold text-xl text-center">
            Registration Page
          </h2>
          <form onSubmit={handleSignUp} className="card-body">
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Name"
                required
              />
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
                required
              />
              <label className="label">Photo URL</label>
              <input
                type="text"
                name="photo"
                className="input"
                placeholder="Photo url"
                required
              />
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  className="input"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setVisible(!visible)}
                  className="btn btn-xs absolute top-2 right-7"
                >
                  {visible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button type="submit" className="btn btn-primary mt-4">
                Registration
              </button>
              <p className="mt-2 text-center">
                {error && (
                  <p className="text-red-500 text-sm text-center mt-2">
                    {error}
                  </p>
                )}
                Already Have An Account ?{" "}
                <Link className="text-secondary" to="/login">
                  Login
                </Link>
              </p>
              <button
                onClick={handleSignInGoogle}
                className="btn bg-white text-black border-[#e5e5e5]"
              >
                <FaGoogle />
                Google login
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
