import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import _ from "lodash";
import React from "react";

const CkanDataTable = ({ data }) => {
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }} >
            <TableContainer  sx={{ maxHeight: 440 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {data.fields.map((field) => {
                                return (
                                    <TableCell key={field.id}>
                                        {field.id}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.records.map((row) => {
                            return (
                                <TableRow key={row._id}>
                                    {_.values(row).map((col, i) => {
                                        return (
                                            <TableCell key={i}>{col}</TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default CkanDataTable;
