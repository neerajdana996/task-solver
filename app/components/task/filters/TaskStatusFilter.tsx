import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import SelectBox from "../selectBox";

export default function TaskStatusFilter() {

    const { status } = useLoaderData();

    const [selectedStatus, setSelectedStatus] = useState({ label: "All", value: "All" });
    return (
        <div>
            <SelectBox items={status} selected={selectedStatus} setSelected={setSelectedStatus} />
        </div>

    )
}
