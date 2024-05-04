import { useState } from "react";
import SelectBox from "../selectBox";

export default function TaskStatusFilter() {
    const status = [{
        label: "All",
        value: "All"
    },
    {
        label: "In Progress",
        value: "InProgress"
    },
    {
        label: "Completed",
        value: "Completed"
    },
    {
        label: "Not Started",
        value: "NotStarted"

    }]
    const [selectedStatus, setSelectedStatus] = useState({ label: "All", value: "All" });
    return (
        <div>
            <SelectBox items={status} selected={selectedStatus} setSelected={setSelectedStatus} />
        </div>

    )
}
