import { ScrollArea, TextInput } from "@mantine/core"
import { IconSearch } from "@tabler/icons"
import axios from "axios";
import React, { useEffect, useState } from "react"
import { BACKEND_URL } from "../constants";
import debounce from "../utils/debounce";
import CaseItem from "./CaseItem";

function Search() {

    const [query, setQuery] = useState("")
    const [cases, setCases] = useState<any[]>([])

    const fetchCases = (query: string) => {
        axios.get(`${BACKEND_URL}/case/search?query=${query}`)
            .then((response) => setCases(response.data.hits))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchCases(query)
    }, [query])

    const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value))

    return(
        <div className="search">
            <h2>Legal Case Searcher</h2>
            <TextInput className="search-input" onChange={handleChange} placeholder="start typing here" icon={<IconSearch />} />
            <div className="search-case-list">
                <ScrollArea>
                    {cases.map((caseDetails) => <CaseItem caseDetails={caseDetails} key={caseDetails._id} />)}
                </ScrollArea>
            </div>
        </div>
    )
}

export default Search