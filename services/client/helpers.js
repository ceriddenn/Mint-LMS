import supabase from "./supabase"

const fetchUserCourses = async (userId) => {
    const user = supabase.auth.session()
    let courseObj;
    await supabase.from("courses").select("*").match({instructor: userId}).then(res => {
        courseObj = res.data[0]
    })
    return courseObj;
}
const getCourseDataFromId = async (courseId) => {
    let courseObj;
    await supabase.from("courses").select("*").eq("courseId", courseId).then(res => {
        courseObj = res.data[0]
    })
    return courseObj;
}
export {fetchUserCourses, getCourseDataFromId}