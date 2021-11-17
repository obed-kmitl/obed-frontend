import { useEffect, useState } from "react"

const catagories = [
    {
        id: 1,
        catagory: "Homework",
        weight: 20
    },
    {
        id: 2,
        catagory: "Assignment",
        weight: 20
    },
    {
        id: 3,
        catagory: "Examination",
        weight: 50
    },
    {
        id: 4,
        catagory: "Attendance",
        weight: 5
    },
    {
        id: 5,
        catagory: "Quiz",
        weight: 5
    },
]

const activities = [
    {
        id: 1,
        title: "Homework #1",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        catagory_id: 1,
        type: "Individual",
        sub_activity: "Single",
        total_score: 10,
    },
    {
        id: 2,
        title: "Homework #2",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        catagory_id: 1,
        type: "Group",
        sub_activity: "Multiple",
        total_score: 10,
    },
    {
        id: 3,
        title: "Assignment #1",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        catagory_id: 2,
        type: "Group",
        sub_activity: "Single",
        total_score: 20,
    },
    {
        id: 4,
        title: "Quiz #1",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        catagory_id: 5,
        type: "Individual",
        sub_activity: "Multiple",
        total_score: 10,
    },
    {
        id: 5,
        title: "Final Exam",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        catagory_id: 3,
        type: "Individual",
        sub_activity: "Multiple",
        total_score: 40,
    },
    {
        id: 6,
        title: "Adttendance",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        catagory_id: 4,
        type: "Individual",
        sub_activity: "Single",
        total_score: 100,
    }
]

const archrive_activities = [
    {
        id: 1,
        title: "Homework #4",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        catagory_id: 1,
        type: "Individual",
        sub_activity: "Single",
        total_score: 10,
    },
    {
        id: 2,
        title: "Homework #5",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        catagory_id: 1,
        type: "Individual",
        sub_activity: "Multiple",
        total_score: 10,
    },
    {
        id: 3,
        title: "Assignment #7",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
        catagory_id: 2,
        type: "Group",
        sub_activity: "Single",
        total_score: 20,
    },

]

const google_activities = [
    {
        id: 1,
        title: "Homework #10",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",

    },
    {
        id: 2,
        title: "Homework #11",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",

    },
    {
        id: 3,
        title: "Assignment #12",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minima iusto nihil laborum maxime enim consequatur, cumque ex mollitia ratione!",
    },

]

export const useActivity = () => {
    const [catagory, setCatagory] = useState(catagories)
    const [activity, setActivity] = useState(activities)
    const [archriveActivity, setArchriveActivity] = useState(archrive_activities)
    const [googleActivity, setGoogleActivity] = useState(google_activities)

    const [filteredActivity, setFilteredActivity] = useState()
    const [filteredArchriveActivity, setFilteredArchriveActivity] = useState()

    const [archriveFilterOption, setarchriveFilterOption] = useState(["All", "All", "All"]) // catagory,group,type
    const [filterOption, setFilterOption] = useState(["All", "All"]) // group,type

    function changeGroup(value, archrive = false) {
        if (archrive) {
            let newFilter = [...archriveFilterOption]
            newFilter[0] = value
            setarchriveFilterOption(newFilter)
        } else {
            let newFilter = [...filterOption]
            newFilter[0] = value
            setFilterOption(newFilter)
        }
    }

    function changeType(value, archrive = false) {
        if (archrive) {
            let newFilter = [...archriveFilterOption]
            newFilter[1] = value
            setarchriveFilterOption(newFilter)
        } else {
            let newFilter = [...filterOption]
            newFilter[1] = value
            setFilterOption(newFilter)
        }
    }

    function changeCatagory(value) {
        let newFilter = [...archriveFilterOption]
        newFilter[2] = value
        setarchriveFilterOption(newFilter)
    }

    useEffect(() => {
        setFilteredActivity(
            activity.filter((act) => {
                if (filterOption[0] === "All") {
                    return act
                } else {
                    return act.type === filterOption[0]
                }
            }).filter((act) => {
                if (filterOption[1] === "All") {
                    return act
                } else {
                    return act.sub_activity === filterOption[1]
                }
            })
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterOption])


    useEffect(() => {
        setFilteredArchriveActivity(
            archriveActivity.filter((act) => {
                if (archriveFilterOption[0] === "All") {
                    return act
                } else {
                    return act.type === archriveFilterOption[0]
                }
            }).filter((act) => {
                if (archriveFilterOption[1] === "All") {
                    return act
                } else {
                    return act.sub_activity === archriveFilterOption[1]
                }
            }).filter((act) => {
                if (archriveFilterOption[2] === "All") {
                    return act
                } else {
                    return act.catagory_id === archriveFilterOption[2]
                }
            })
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [archriveFilterOption])

    useEffect(() => {
        setFilteredActivity(activity);
        setFilteredArchriveActivity(archriveActivity);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activity])

    return { catagory, filteredActivity, filteredArchriveActivity, googleActivity, changeGroup, changeType, changeCatagory }
}
