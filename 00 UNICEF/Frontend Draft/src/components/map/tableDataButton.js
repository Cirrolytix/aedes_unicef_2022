import { TableChart } from "@mui/icons-material";
import { Fab } from "@mui/material";
import React, { useContext } from "react";
import { MapContext } from "../../context/map/mapContext";

const TableDataButton = () => {
    const map = useContext(MapContext);
    return (
        <Fab
            color="primary"
            size="small"
            onClick={(e) => {
                map.actions.setOpenTableDataModal(true);
            }}
        >
            <TableChart />
        </Fab>
    );
};

export default TableDataButton;
