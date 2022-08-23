import { Card } from "@mantine/core"
import { Calendar } from "@mantine/dates"
import { useState } from "react"

function Schedule() {
    const [date, setDate] = useState<Date | null>(new Date())

    return(
        <div>
            <Card withBorder radius="md" className="calendar">
                <Calendar
                    value={date}
                    onChange={setDate}
                    styles={(theme) => ({
                        day: {fontSize: theme.fontSizes.lg, height: 60, width: 70}
                    })}
                />
            </Card>
        </div>
    )
}

export default Schedule