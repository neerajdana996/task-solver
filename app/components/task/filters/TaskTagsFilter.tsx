import { useState } from "react";
import SelectBox from "../selectBox";

export default function TaskTagsFilter() {
    const tags = [
        {
            label: "All",
            value: "All"
        },
        {
            label: "Javascript",
            value: "javascript"
        },
        {
            label: "React",
            value: "react"
        },
        {
            label: "Node",
            value: "node"
        },
        {
            label: "Python",
            value: "python"
        },
        {
            label: "Java",
            value: "java"
        },
        {
            label: "C#",
            value: "c#"
        },
        {
            label: "C++",
            value: "c++"
        },
        {
            label: "Ruby",
            value: "ruby"
        },
        {
            label: "Angular",
            value: "angular"
        },
        {
            label: "Vue",
            value: "vue"
        },
        {
            label: "HTML",
            value: "html"
        },
        {
            label: "CSS",
            value: "css"
        },
        {
            label: "PHP",
            value: "php"
        },
        {
            label: "Swift",
            value: "swift"
        },
        {
            label: "Kotlin",
            value: "kotlin"
        },
        {
            label: "Go",
            value: "go"
        },
        {
            label: "Rust",
            value: "rust"
        },
        {
            label: "Scala",
            value: "scala"
        },
        {
            label: "Perl",
            value: "perl"
        },
        {
            label: "R",
            value: "r"
        },
        {
            label: "TypeScript",
            value: "typescript"
        },
        {
            label: "Dart",
            value: "dart"
        },
        {
            label: "Lua",
            value: "lua"
        },
        {
            label: "Matlab",
            value: "matlab"
        },
        {
            label: "Objective-C",
            value: "objective-c"
        },
        {
            label: "Pascal",
            value: "pascal"
        },
        {
            label: "Perl",
            value: "perl"
        },
        {
            label: "Shell",
            value: "shell"
        },
        {
            label: "SQL",
            value: "sql"
        },
        {
            label: "VBA",
            value: "vba"
        },
        {
            label: "WebAssembly",
            value: "webassembly"
        },
        {
            label: "Other",
            value: "other"
        }
    ]
    const [selectedStatus, setSelectedStatus] = useState({ label: "All", value: "All" });
    return (
        <div>
            <SelectBox items={tags} selected={selectedStatus} setSelected={setSelectedStatus} />
        </div>

    )
}
