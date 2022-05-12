import { Close } from "@mui/icons-material";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Modal,
} from "@mui/material";
import React, { useContext } from "react";
import { MapContext } from "../../context/map/mapContext";
import _ from "lodash";
import CkanDataTable from "../table/ckanDataTable";

const TableDataModal = () => {
    const map = useContext(MapContext);
    return (
        <Modal
            open={map.openTableDataModal}
            onClose={(e) => {
                map.actions.setOpenTableDataModal(false);
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    width: "100vw",
                }}
            >
                <Card sx={{ maxWidth: "90%", maxHeight: "90%" }}>
                    <CardHeader
                        title="Data table"
                        action={
                            <IconButton
                                onClick={(e) => {
                                    map.actions.setOpenTableDataModal(false);
                                }}
                            >
                                <Close />
                            </IconButton>
                        }
                    />
                    <CardContent sx={{width:"100%",height:"100%"}}>
                       <CkanDataTable data={map.tableData} />
                    </CardContent>
                </Card>
            </Box>
        </Modal>
    );
};

export default TableDataModal;
