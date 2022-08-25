import { Card, createStyles, ScrollArea, TextInput } from "@mantine/core"
import { IconSearch } from "@tabler/icons"
import axios from "axios";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import debounce from "../utils/debounce";

const useStyles = createStyles((theme) => ({
    id: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]
    },
    title: {
        fontSize: '1.3rem',
        fontWeight: 600
    }
}))

function CaseItem({caseDetails}: {caseDetails: any}) {

    const {classes, cx} = useStyles();
    const navigate = useNavigate();

    return(
        <Card withBorder radius="md" className="case-item" onClick={() => navigate(caseDetails.hash)}>
            <div className={cx(classes.id)}>#{caseDetails.diary_number}</div>
            <div className={cx(classes.title)}>{caseDetails.petitioner[0]}</div>
            <div>{caseDetails.category}</div>
        </Card>
    )
}

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