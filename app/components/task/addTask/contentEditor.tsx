import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";


export default function ContentBodyEditor({
    label,
    name,
    type = "text",
    value,
    placeholder,
    onValueChange,
    required,
    ...props
}: {
    label: string;
    name: string;
    type?: string;
    value: any;
    placeholder?: string;
    onValueChange: any;
    required?: boolean;
    [key: string]: any;
}) {
    const titleRef: any = useRef(null);
    const [data, setdata] = useState(value);

    const MediumStoryConfig = {
        menubar: false,
        toolbar: false,
        plugins:
            "advlist autolink lists link image media table  charmap  anchor pagebreak quickbars codesample",

        branding: false,
        icons: "default",
        quickbars_selection_toolbar: `bold italic | link image quicktable | h1 h2 h3 | codesample| preview | blockquote | alignleft aligncenter alignright alignjustify | bullist numlist`,
        quickbars_image_toolbar:
            "alignleft aligncenter alignright | preview | rotateleft rotateright | imageoptions",
        quickbars_insert_toolbar:
            "preview | codesample | quickimage | media | table  | hr ",

    };

    return (
        <div
            id="contentBody"
            className={`
            w-full h-full
        `}
        >
            <input type="hidden" name={name} value={data} />
            <Editor
                id="contentBodyEditor"
                ref={titleRef}
                tinymceScriptSrc={"/tinymce/tinymce.min.js"}
                onInit={(evt, editor) => (titleRef.current = editor)}
                onChange={(e) => {
                    console.log("on change", titleRef.current.getContent());
                }}
                onEditorChange={(e) => {
                    setdata(titleRef.current.getContent());
                }}
                initialValue={value}
                init={{
                    ...MediumStoryConfig,
                    selector: "#contentBodyEditor" as any,
                }}
            />
        </div>
    );
}
