export const useCustomStyles = () => {
    // const primaryColor = useSelector((state) => state.user.primaryColor) || "#115e59";

    return {
        headCells: {
            style: {
                backgroundColor: "#115e59",
                fontWeight: "bold",
                fontSize: "14px",
                color: "white",
                justifyContent: "flex-start",
                paddingLeft: "8px",
                paddingRight: "0px",
            },
        },
        headRow: {
            style: {
                borderBottom: "2px solid #ccc",
            },
        },
        rows: {
            style: {
                minHeight: "45px",
                borderBottom: "1px solid #eee",
            },
        },
        cells: {
            style: {
                justifyContent: "flex-start",
                paddingLeft: "8px",
                paddingRight: "0px",
            },
        },
    };
};