var UrlFor = {
    termPage: term_id => {
        return `/term/${term_id}`
    },
    classPage: class_id => {
        return `/class/${class_id}`
    }
}

export default UrlFor