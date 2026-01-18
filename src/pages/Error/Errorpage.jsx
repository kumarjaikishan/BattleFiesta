import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { header } from "../../store/login";
import { Button } from "@mui/material";

export const Errorpage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const log = useSelector((state) => state.login);

    useEffect(() => {
        if (!log.islogin) {
            navigate("/login");
            return;
        }
        dispatch(header("Not Found"));
    }, [log.islogin, navigate, dispatch]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-2">
            <div className="w-full max-w-xl bg-white rounded-xl p-5 sm:p-8 text-center">

                {/* IMAGE */}
                <div className="flex justify-center mb-4">
                    <img
                        src="https://res.cloudinary.com/dusxlxlvm/image/upload/v1720767933/accusoft/assets/404_page_1_kjlifa.svg"
                        alt="404 image"
                        className=" w-[70vw] lg:w-[28vw]"
                    />
                </div>

                {/* TEXT */}
                <p className="text-sm sm:text-base text-gray-600 mb-6">
                    Sorry, the page you are looking for does not exist.
                    If you believe there's an issue, feel free to report it and we’ll look into it.
                </p>

                {/* ACTION BUTTONS */}
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button
                        variant="contained"
                        onClick={() => navigate("/")}
                    >
                        Go Home
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={() => navigate("/contact")}
                    >
                        Report Problem
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => navigate(-1)}
                    >
                        Return Back
                    </Button>
                </div>
            </div>
        </div>
    );
};
