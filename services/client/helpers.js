import supabase from "./supabase"

const fetchUserCourses = async (userId) => {
    const user = supabase.auth.session()
    let coursesObj = []
    await supabase.from("courses").select("*").match({instructor: userId}).then(res => {
        res.data.map(course => {
            coursesObj = [...coursesObj, course]
        })
    })
    return coursesObj;
}
const getCourseDataFromId = async (courseId) => {
    let courseObj;
    await supabase.from("courses").select("*").eq("courseId", courseId).then(res => {
        courseObj = res.data[0]
    })
    return courseObj;
}
const isUserTeacher = async (userId) => {
    let isTeacher;
    await supabase.from("users").select("*").eq("userId", userId).then(res => {
        isTeacher = res.data[0].isTeacher
    })
    return isTeacher;
}
export {fetchUserCourses, getCourseDataFromId, isUserTeacher}