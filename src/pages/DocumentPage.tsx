import React from "react";
import "./SearchPage.css";
import { useStateValue } from "../hooks/StateProvider";

function DocumentPage() {
    const [{ snippet }, dispatch] = useStateValue();

    return (
        <p className="documentPage__resultSnippet">
            {snippet && snippet.document}
        </p>
    );
}

export default DocumentPage;
