import { Card, createStyles, ScrollArea, TextInput } from "@mantine/core"
import { IconSearch } from "@tabler/icons"
import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../constants";

export const debounce = (callback: Function, wait = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    console.log("2")

    return function debouncer(this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback.apply(this, args), wait);
    };
};

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

    return(
        <Card withBorder radius="md" className="case-item">
            <div className={cx(classes.id)}>#{caseDetails.diary_number}</div>
            <div className={cx(classes.title)}>{caseDetails.petitioners[0]}</div>
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

    return(
        <div className="search">
            <h2>Legal Case Searcher</h2>
            <TextInput className="search-input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="start typing here" icon={<IconSearch />} />
            <div className="search-case-list">
                <ScrollArea>
                    {cases.map((caseDetails) => <CaseItem caseDetails={caseDetails} key={caseDetails._id} />)}
                </ScrollArea>
            </div>
        </div>
    )
}

export default Search