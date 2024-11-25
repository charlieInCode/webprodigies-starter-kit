"use client"

import { useAppSelector } from "@/redux/store"
import dayjs from "dayjs"
import { Button } from "../ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"

export default function ResultsTable() {
    const { data } = useAppSelector((state) => state.ParseResultReducer)

    const hasMissingMappingData =
        data?.missingMappingData &&
        Object.keys(data.missingMappingData).length > 0

    if (!data?.results || data.results.length === 0) {
        return (
            <div className="xl:p-12 md:p-6 p-4">
                <p>No results found.</p>
            </div>
        )
    }

    return (
        <div className="xl:p-12 md:p-6 p-4 max-w-screen-md mx-auto">
            <div className="flex justify-between gap-4 items-center">
                <h1 className="font-bold text-2xl">Result</h1>
                <div>
                    <Button>Download</Button>
                </div>
            </div>
            {hasMissingMappingData && (
                <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
                    role="alert"
                >
                    <strong className="font-bold">Missing Mapping Data</strong>
                    <ul className="list-disc list-inside">
                        {Object.keys(data.missingMappingData).map(
                            (key, index) => (
                                <li key={index}>
                                    {key}:{" "}
                                    {data.missingMappingData[key].join(", ")}
                                </li>
                            ),
                        )}
                    </ul>
                </div>
            )}
            <Table className="border shadow rounded-md mt-2.5">
                <TableCaption>A list of your generated report.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">
                            Channel Name
                        </TableHead>
                        <TableHead className="w-[180px]">Branch</TableHead>
                        <TableHead className="w-[180px]">SKU</TableHead>
                        <TableHead className="w-[50px]">Qty</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.results.map((result, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">
                                {result.channel}
                            </TableCell>
                            <TableCell>{result.branch}</TableCell>
                            <TableCell>{result.sku}</TableCell>
                            <TableCell>{result.quantity}</TableCell>
                            <TableCell className="text-right">
                                {dayjs(result.createdAt).format("DD/MM/YYYY")}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
