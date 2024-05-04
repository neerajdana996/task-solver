import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Select from "react-tailwindcss-select";

export default function TaskStatusFilter() {

    const { status } = useLoaderData();

    const [selectedStatus, setSelectedStatus] = useState([{
        label: "In Progress",
        value: "InProgress"
    }]);
    const handleChange = (selectedOption) => {
        setSelectedStatus(selectedOption);
    }
    return (
        <div className="min-w-40">
            <input type="hidden" name="taskStatus" value={selectedStatus?.map((status) => status.value)} />
            <Select
                primaryColor={"indigo"}
                classNames={{
                    list: 'bg-white dark:bg-gray-800',
                }}
                placeholder="Select Status"
                isMultiple
                isClearable
                isSearchable
                value={selectedStatus}
                onChange={handleChange}
                options={status}
            />
        </div>

    )
}
