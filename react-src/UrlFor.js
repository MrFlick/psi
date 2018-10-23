var UrlFor = {
    termPage: term_id => {
        return `/term/${term_id}`
    },
    classPage: class_id => {
        return `/class/${class_id}`
    },
    studentPage: person_id => {
        return `/student/${person_id}`
    }
}

export default UrlFor