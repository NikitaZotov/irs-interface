import React from "react";
import { useStateValue } from "../../hooks/StateProvider";
import { DocumentPageText } from "./styled";

function DocumentPage() {
    const [{ snippet }, dispatch] = useStateValue();

    return (
        <DocumentPageText>
            {snippet && snippet.document}
        </DocumentPageText>
    );
}

export default DocumentPage;
