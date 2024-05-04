import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Select from "react-tailwindcss-select";

export default function TaskTagsFilter() {
    const { tags } = useLoaderData();
    const [selectedStatus, setSelectedStatus] = useState({ label: "All", value: "All" });
    const handleChange = (selectedOption) => {
        setSelectedStatus(selectedOption);
    };
    const options = [
        { label: "All", value: "All" },
        ...tags
    ];
    return (
        <div>
            <Select
                primaryColor={"indigo"}
                isMultiple
                isClearable
                isSearchable
                value={selectedStatus}
                onChange={handleChange}
                options={options}
            />
        </div>

    )
}
