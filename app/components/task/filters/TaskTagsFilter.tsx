import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Select from "react-tailwindcss-select";

export default function TaskTagsFilter() {
    const { tags, appliedFilters } = useLoaderData();
    const [selectedStatus, setSelectedStatus] = useState(appliedFilters?.tagIds.map((tagId) => tags.find((tag) => tag.value === tagId)) || [
        {
            label: "All",
            value: "All"
        }
    ]);
    const handleChange = (selectedOption) => {

        setSelectedStatus(selectedOption);
    };
    const options = [
        { label: "All", value: "All" },
        ...tags
    ];
    return (
        <div className="min-w-40">
            <input type="hidden" name="taskTags" value={selectedStatus?.map((status) => status.value)} />
            <Select
                noOptionsMessage="Select Tags"
                primaryColor={"indigo"}
                placeholder="Select Tags"
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
