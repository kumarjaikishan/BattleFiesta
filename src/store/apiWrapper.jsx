// apiWrapper.js
import { toast } from 'react-toastify';

const apiWrapper = async (url, method = 'GET', body = null, successAction) => {
    try {
        // dispatch(loaderAction(true));
        const token = localStorage.getItem("token");
        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: body ? JSON.stringify(body) : null,
        };

        const response = await fetch(url, options);
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.msg || 'Something went wrong');
        }

        successAction(responseData);
        return responseData;
    } catch (error) {
        // Log the error for debugging purposes
        console.error("apiWrapper Error:", error);

        // Dispatch an error action if needed
        // Example: dispatch(errorAction(error));
        // dispatch(loaderAction(false));
        // Display a toast notification for the user
        toast.warn(error.message || 'An error occurred', { autoClose: 2300 });

        // Rethrow the error for the calling code to handle if necessary
        throw error;
    } finally {
        // dispatch(loaderAction(false));
    }
};

export default apiWrapper;
