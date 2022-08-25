import { Card, createStyles, ScrollArea } from "@mantine/core"
import { Calendar } from "@mantine/dates"
import axios from "axios"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { BACKEND_URL } from "../constants"

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
    const navigate = useNavigate()

    const handleClick = () => {
        const userData = localStorage.getItem('userData')
        if(userData  && (JSON.parse(userData).categoryAccess.includes(caseDetails.category) || JSON.parse(userData).categoryAccess.includes("All categories"))) {
            navigate(`/search/${caseDetails.hash}`)
        }
        else toast.error("Sorry. You don't have access to this case.")
    }

    return(
        <Card style={{boxShadow: '4px 6px 8px #00000010'}} withBorder radius="md" className="case-item" onClick={handleClick}>
            <div className={cx(classes.id)}>#{caseDetails.diary_number}</div>
            <div className={cx(classes.title)}>{caseDetails.petitioner[0]}</div>
            <div>{caseDetails.category}</div>
        </Card>
    )
}

function UpcomingItem({upcomingDetails, onClick}: {upcomingDetails: {date: string, count: number}, onClick: React.MouseEventHandler<HTMLDivElement>}) {
    return(
        <Card style={{boxShadow: '2px 3px 8px #00000009'}} withBorder radius="md" className="upcoming-item" onClick={onClick}>
            <span>{upcomingDetails.count}</span> hearing(s) on {upcomingDetails.date}
        </Card>
    )
}

function Schedule() {
    const [date, setDate] = useState<Date | null>(new Date())
    const [cases, setCases] = useState<any[]>([])
    const [upcoming, setUpcoming] = useState<any[]>([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/case/upcoming`)
            .then((response) => {
                setUpcoming(response.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/case?date=${moment(date).format("DD-MM-YYYY")}`)
            .then((response) => {
                setCases(response.data.cases)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [date])

    return(
        <div className="schedule">
            <div className="calendar-wrapper">
                <Card style={{boxShadow: '4px 6px 8px #00000008'}} withBorder radius="md" className="calendar-card">
                    <Calendar
                        className="calendar"
                        value={date}
                        onChange={setDate}
                        minDate={new Date()}
                        styles={(theme) => ({
                            day: {fontSize: theme.fontSizes.lg, height: 60, width: 70}
                        })}
                    />
                </Card>
                <div className="upcoming-list">
                    <h2>Hearings in the next 7 days</h2>
                    <ScrollArea>
                        {upcoming.map((upcomingDate) => <UpcomingItem upcomingDetails={upcomingDate} key={upcomingDate.date} onClick={() => setDate(moment(upcomingDate.date, "DD-MM-YYYY").toDate())}/>)}
                    </ScrollArea>
                </div>
            </div>
            <div className="case-list">
                <h2>Hearings on: {moment(date).format("DD-MM-YYYY")}</h2>
                <ScrollArea>
                    {cases.map((caseDetail) => <CaseItem caseDetails={caseDetail} key={caseDetail._id} />)}
                </ScrollArea>
            </div>    
        </div>
    )
}

export default Schedule