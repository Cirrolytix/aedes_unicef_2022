import { ChevronRight } from "@mui/icons-material";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
    root: {
        backgroundColor: "#474747 !important",
        color: "#fff",
        justifyContent: "space-between",
        "&:hover": {
            backgroundColor: "#684D94 !important",
        },
    },
});

const SelectButton = ({ name, ...props }) => {
    const classes = useStyles();
    return (
        <Button
            {...props}
            classes={classes}
            endIcon={<ChevronRight />}
            fullWidth
            variant="contained"
        >
            {name}
        </Button>
    );
};

export default SelectButton;
