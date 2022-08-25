import { ScrollArea } from "@mantine/core"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BACKEND_URL } from "../constants"
import ListingTable from "./ListingTable"

function CasePage() {

    const [caseDetails, setCaseDetails] = useState<any>()

    const params = useParams()

    useEffect(() => {
        axios.get(`${BACKEND_URL}/case/${params.hash}`)
            .then((response) => setCaseDetails(response.data.caseDetail))
            .catch((err) => console.log(err))
    }, [params.hash])

    if(caseDetails === undefined) return(<div>Loading...</div>)

    return(
        <ScrollArea>
            <div className="case-page">
                <h2>Case Details</h2>
                <div className="section">
                    <div className="sub-section">
                        <div className="label">Diary Number</div>
                        <div className="data">{caseDetails.diary_number}</div>
                    </div>
                    <div className="sub-section">
                        <div className="label">Category</div>
                        <div className="data">{caseDetails.category}</div>
                    </div>
                </div>
                <div className="section">
                    <div className="sub-section">
                        <div className="label">Status</div>
                        <div className="data">{caseDetails.status}</div>
                    </div>
                    <div className="sub-section">
                        <div className="label">Next Hearing</div>
                        <div className="data">{caseDetails.tentative_date}</div>
                    </div>
                </div>
                <div className="section">
                    <div className="sub-section">
                        <div className="label">Petitioners</div>
                        <div className="data">{caseDetails.petitioner.join(", ")}</div>
                    </div>
                    <div className="sub-section">
                        <div className="label">Respondents</div>
                        <div className="data">{caseDetails.respondents.join(", ")}</div>
                    </div>
                </div>
                <div className="section">
                    <div className="sub-section">
                        <div className="label">Petitioner Advocates</div>
                        <div className="data">{caseDetails.pet_advocate.join(", ")}</div>
                    </div>
                    <div className="sub-section">
                        <div className="label">Respondent Advocates</div>
                        <div className="data">{caseDetails.resp_advocate.join(", ")}</div>
                    </div>
                </div>
                <div className="section">
                    <div className="sub-section">
                        <div className="label">Filing Date</div>
                        <div className="data">{caseDetails.filed_on}</div>
                    </div>
                    <div className="sub-section">
                        <div className="label">Verification Date</div>
                        <div className="data">{caseDetails.verified_on}</div>
                    </div>
                </div>
                <div className="section">
                    <div className="sub-section long">
                        <div className="label">Listing Dates</div>
                        <ListingTable data={JSON.parse(caseDetails.listing_dates)} />
                    </div>
                </div>
            </div>
        </ScrollArea>
    )
}

export default CasePage